"use client";

import React, { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { ImageIcon, UploadCloud, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { urlConstructor } from "@/app/hooks/constructor-url";

/**
 * FileUploader contract preserved:
 *  - onFileAccepted({ key, previewUrl, fileName, file })
 *  - onFileRemoved()
 *  - uploadedFile: { key, previewUrl, fileName, file? }
 *  - FileType: "image" | "video"
 */

export function FileUploader({
	onFileAccepted,
	onFileRemoved,
	onUploadStart,
	uploadedFile,
	FileType,
	onFileReplace,
}) {
	const [fileState, setFileState] = useState({
		error: false,
		file: null,
		id: null,
		uploading: false,
		progress: 0,
		objectURL: null,
	});
	// Restore file state from uploadedFile prop (uploadedFile.key may already be a full URL)
	useEffect(() => {
		if (uploadedFile) {
			setFileState({
				error: false,
				file: uploadedFile.file || null,
				id: uploadedFile.key || null, // may be a full URL or just the key
				uploading: false,
				progress: 100,
				objectURL:
					uploadedFile.previewUrl || uploadedFile.objectURL || null,
			});
		}
	}, [uploadedFile]);

	// Revoke objectURL when component unmounts or file changes
	useEffect(() => {
		return () => {
			if (
				fileState.objectURL &&
				fileState.objectURL.startsWith("blob:")
			) {
				URL.revokeObjectURL(fileState.objectURL);
			}
		};
	}, [fileState.objectURL]);

	async function handleRemoveFile() {
		if (fileState.isDeleting) return;

		try {
			// Only delete from S3 if we have a valid key and it's not the original uploaded file
			// Note: uploadedFile?.key may be a full URL in your DB, so only attempt deletion when we have a raw key
			const currentId = fileState.id;
			if (currentId && currentId !== uploadedFile?.key) {
				// If currentId looks like a full URL, we should NOT attempt server delete using it
				if (
					!currentId.startsWith("http://") &&
					!currentId.startsWith("https://")
				) {
					await fetch("/api/s3/delete", {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ key: currentId }),
					});
				}
			}

			if (
				fileState.objectURL &&
				fileState.objectURL.startsWith("blob:")
			) {
				URL.revokeObjectURL(fileState.objectURL);
			}

			setFileState({
				error: false,
				file: null,
				id: null,
				uploading: false,
				progress: 0,
				objectURL: null,
			});
			onFileRemoved?.();
			toast.success("File removed successfully");
		} catch (error) {
			setFileState((prev) => ({ ...prev, error: true }));
			toast.error("Failed to remove file");
		}
	}

	const uploadFile = useCallback(
		async (file) => {
			setFileState((s) => ({
				...s,
				uploading: true,
				progress: 0,
				error: false,
			}));
			onUploadStart?.();

			let presignUrl, key;
			try {
				const res = await fetch("/api/s3/upload", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						fileName: file.name,
						contentType: file.type,
						size: file.size,
						isImage: file.type.startsWith("image/"),
						isVideo: file.type.startsWith("video/"),
					}),
				});
				const data = await res.json();
				if (!res.ok)
					throw new Error(data.error || "Failed to get upload URL");

                presignUrl = data.url;

                key = data.key;
				setFileState((s) => ({ ...s, id: urlConstructor(key) }));
			} catch (err) {
				toast.error(err.message || "Failed to get upload URL");
				setFileState((s) => ({ ...s, uploading: false, error: true }));
				return;
			}

			try {
				await new Promise((resolve, reject) => {
					const xhr = new XMLHttpRequest();
					xhr.open("PUT", presignUrl);
					xhr.setRequestHeader("Content-Type", file.type);

					xhr.upload.onprogress = (e) => {
						if (e.lengthComputable) {
							const pct = Math.round((e.loaded / e.total) * 100);
							setFileState((s) => ({ ...s, progress: pct }));
						}
					};
					xhr.onload = () => {
						if (xhr.status >= 200 && xhr.status < 300) {
							toast.success("Upload successful");
							resolve();
						} else {
							reject(new Error("Upload failed"));
						}	
					};
					xhr.onerror = () => reject(new Error("Upload failed"));
					xhr.send(file);
				});
            } catch (err) {
				toast.error(err.message || "Upload failed");
				console.log(err)
				setFileState((s) => ({ ...s, error: true }));
			} finally {
				setFileState((s) => ({ ...s, uploading: false }));
			}
		},
		[onUploadStart]
	);

	const onDrop = useCallback(
		(acceptedFiles) => {
			if (!acceptedFiles.length) return;
			const file = acceptedFiles[0];
			const objectURL = URL.createObjectURL(file);

			// If there's an existing uploaded file from props, notify parent to delete it (best effort)
			if (uploadedFile?.key) {
				let keyToDelete = uploadedFile.key;
				if (
					uploadedFile.key.startsWith("http://") ||
					uploadedFile.key.startsWith("https://")
				) {
					const urlParts = uploadedFile.key.split("/");
					keyToDelete = urlParts[urlParts.length - 1];
				}
				onFileReplace?.(keyToDelete);
			}

			// If there's a current file being uploaded, remove it (best effort)
			if (fileState.id && fileState.id !== uploadedFile?.key) {
				handleRemoveFile();
			}

			setFileState({
				error: false,
				file,
				id: uuidv4(),
				uploading: false,
				progress: 0,
				objectURL,
			});

			uploadFile(file);
		},
		[uploadFile, fileState.id, uploadedFile?.key, onFileReplace]
	);

	// When upload completes (progress === 100 and not uploading), notify parent with actual key/preview
	useEffect(() => {
		// If id is a 'key' and upload finished, build expected preview url to pass back:
		if (
			fileState.id &&
			!fileState.uploading &&
			!fileState.error &&
			fileState.progress === 100
		) {
			onFileAccepted?.({
				key: fileState.id,
				previewUrl: fileState.objectURL,
				fileName: fileState.file?.name,
				file: fileState.file,
			});
		}
		// Note: when component mounts with uploadedFile (from DB), onFileAccepted is not re-emitted.
	}, [
		fileState.id,
		fileState.uploading,
		fileState.error,
		fileState.progress,
		onFileAccepted,
		fileState.objectURL,
		fileState.file,
	]);

	const MAX_SIZE =
		FileType === "image" ? 5 * 1024 * 1024 : 1000 * 1024 * 1024;
	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			onDrop,
			accept: { "image/*": [], "video/*": [] },
			multiple: false,
			maxFiles: 1,
			maxSize: MAX_SIZE,
			onDropRejected: (fileRejections) => {
				fileRejections.forEach(({ errors, file }) =>
					errors.forEach((err) => {
						if (err.code === "file-too-large") {
							toast.error(
								`"${file.name}" is too large. Max size is 5MB.`
							);
						} else if (err.code === "file-invalid-type") {
							toast.error(
								`"${file.name}" is not a supported image type.`
							);
						} else if (err.code === "too-many-files") {
							toast.error(
								"Only one file can be uploaded at a time."
							);
						} else {
							toast.error(
								`"${file.name}" could not be uploaded: ${err.message}`
							);
						}
					})
				);
			},
        });

	// Build preview URL correctly based on what we have:
	const getPreviewUrl = () => {
		// 1) If user just dropped a local file and we have an objectURL, prefer that (temporary preview)
		if (fileState.objectURL) return fileState.objectURL;

		// 2) If fileState.id exists and looks like a full URL, return it
		if (
			fileState.id &&
			(fileState.id.startsWith("http://") ||
				fileState.id.startsWith("https://"))
		) {
			return fileState.id;
		}

		// 3) If uploadedFile has a previewUrl (coming from DB), use it (handles the case where DB already stores full URL)
		if (uploadedFile?.previewUrl) return uploadedFile.previewUrl;

		// 4) If uploadedFile.key looks like a full URL, return it
		if (
			uploadedFile?.key &&
			(uploadedFile.key.startsWith("http://") ||
				uploadedFile.key.startsWith("https://"))
		) {
			return uploadedFile.key;
		}

		// 5) Otherwise we might have a raw key (e.g. '6435b1a0-...png'), build URL via endpoint/bucket
		const key = fileState.id || uploadedFile?.key;
		if (!key) return null;
		return key;
	};

	const isValidUrl = (url) => {
		if (!url) return false;
		try {
			new URL(url);
			return true;
		} catch {
			return false;
		}
	};

	const previewUrl = getPreviewUrl();
    const inDev = process.env.NODE_ENV !== "production";

	return (
		<Card
			{...getRootProps()}
			className={cn(
				"flex flex-col items-center justify-center gap-4 p-4 border-2 border-dashed transition-colors cursor-pointer w-full",
				isDragActive
					? "bg-muted border-green-500"
					: "bg-background border-muted",
				isDragReject && "border-red-500"
			)}
		>
			<input {...getInputProps()} />
			<div className="flex flex-col items-center gap-2">
				{isDragActive ? (
					<>
						<UploadCloud className="w-8 h-8 text-primary" />
						<p className="font-medium text-primary">
							Drop the{" "}
							{FileType === "video" ? "video" : "thumbnail"} here…
						</p>
					</>
				) : (
					<>
						{fileState.file || uploadedFile ? (
							<div />
						) : (
							<>
								<ImageIcon className="w-8 h-8 text-muted-foreground" />
								<p className="text-muted-foreground">
									Drag & drop a{" "}
									{FileType === "video"
										? "video"
										: "thumbnail image"}{" "}
									here, or click to select one
								</p>
							</>
						)}
					</>
				)}
			</div>

			{(fileState.file || uploadedFile) && (
				<div className="w-full">
					<div className="preview-image">
						{FileType === "video" ? (
							<>
								{previewUrl && isValidUrl(previewUrl) ? (
									// Use native <video> for preview (works in dev/prod)
									<video
										src={previewUrl}
										controls
										preload="metadata"
										crossOrigin="anonymous"
										onError={() =>
											toast.error(
												"Failed to load video preview"
											)
										}
										className="w-full object-cover h-[200px]"
									/>
								) : (
									<div className="w-full object-cover h-[300px] bg-gray-100 flex items-center justify-center">
										<p className="text-gray-500">
											{!previewUrl
												? "No video available"
												: "Invalid video URL"}
										</p>
										{previewUrl &&
											!isValidUrl(previewUrl) && (
												<p className="text-xs text-red-500 mt-2">
													URL: {previewUrl}
												</p>
											)}
									</div>
								)}
							</>
						) : (
							// Image preview: use next/image in production for optimizations, plain <img> in dev to avoid hostname config errors
							<>
								{previewUrl && isValidUrl(previewUrl) ? (
									inDev ? (
										<img
											src={previewUrl}
											alt="preview image"
											className="w-full object-cover h-[300px]"
										/>
									) : (
										<Image
											src={previewUrl}
											width={400}
											height={300}
											alt="preview image"
											className="w-full object-cover h-[300px]"
										/>
									)
								) : (
									<div className="w-full object-cover h-[300px] bg-gray-100 flex items-center justify-center">
										<p className="text-gray-500">
											{!previewUrl
												? "No image available"
												: "Invalid image URL"}
										</p>
										{previewUrl &&
											!isValidUrl(previewUrl) && (
												<p className="text-xs text-red-500 mt-2">
													URL: {previewUrl}
												</p>
											)}
									</div>
								)}
							</>
						)}
					</div>

					<div className="flex items-center justify-between">
						<span className="truncate">
							{fileState.file?.name || uploadedFile?.fileName}
						</span>
						<Button
							type="button"
							size="icon"
							variant="ghost"
							onClick={(e) => {
								e.stopPropagation();
								handleRemoveFile();
							}}
						>
							<XCircle className="w-4 h-4 text-destructive" />
						</Button>
					</div>

					{fileState.uploading && (
						<div className="mt-2">
							<Progress value={fileState.progress} />
							<span className="ml-2 text-sm">{`${fileState.progress}%`}</span>
						</div>
					)}
				</div>
			)}
		</Card>
	);
}
