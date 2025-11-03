"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import { Progress } from "@/components/ui/progress";
import {
	ChevronRight,
	ChevronLeft,
	User,
	Globe,
	BookOpen,
	Target,
	Check,
} from "lucide-react";
import { useRouter } from "next/navigation";



export default function Onboarding() {
	const navigate = useRouter();
	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 9;

	const [formData, setFormData] = useState({
		// Step 1
		fullName: "",

		// Step 2
		mainReason: "", // e.g. improve heart health, get active...
		mainReasonOther: "",

		// Step 3 - Health
		healthConditions: [], // array of strings
		medications: "",
		healthOther: "",

		// Step 4 - Program Preferences
		programPreference: "",
		programPreferenceOther: "",

		// Step 5 - Sessions per week
		sessionsPerWeek: "",
		sessionsPerWeekOther: "",

		// Step 6 - Community interest
		communityInterest: "", // Yes/No/Maybe

		// Step 7 - Quarterly Zoom
		zoomInterest: "", // Yes/No

		// Step 8 - Data sharing consent
		dataShareConsent: "", // Yes/No/Maybe

		// Step 9 - Support text
		supportNeeds: "",

		// Keep other existing contact fields (optional)
		email: "",
		phone: "",
		country: "",
		currency: "",
	});

	const updateFormData = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const toggleArrayValue = (field, value) => {
		setFormData((prev) => {
			const arr = Array.isArray(prev[field]) ? prev[field] : [];
			if (arr.includes(value)) {
				return { ...prev, [field]: arr.filter((a) => a !== value) };
			}
			return { ...prev, [field]: [...arr, value] };
		});
	};


	// Step validation logic
	const isStepFilled = () => {
		switch (currentStep) {
			case 1:
				return formData.fullName.trim() !== "";
			case 2:
				return formData.mainReason.trim() !== "" && (formData.mainReason !== "Other" || formData.mainReasonOther.trim() !== "");
			case 3:
				return true; // Add more validation as needed
			case 4:
				return true;
			case 5:
				return true;
			case 6:
				return true;
			case 7:
				return true;
			case 8:
				return true;
			case 9:
				return true;
			default:
				return true;
		}
	};

	const handleNext = () => {
		if (currentStep < totalSteps && isStepFilled()) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handlePrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		}
	};


	// Save onboarding info to DB
	const saveOnboarding = async (data) => {
		try {
			await fetch("/api/onboarding", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
		} catch (err) {
			// handle error (show toast, etc)
		}
	};

	const handleComplete = async () => {
		await saveOnboarding({ ...formData, incomplete: false });
		navigate.push("/");
	};

	const handleSkip = async () => {
		await saveOnboarding({ incomplete: true });
		navigate.push("/");
	};

	const healthOptions = [
		"Heart condition",
		"High blood pressure",
		"Diabetes",
		"Joint pain or mobility issues",
		"None of the above",
	];

	const programOptions = [
		"Exercise plans, video and picture illustrations",
		"Live online sessions (when made available)",
		"Mix of the above",
		"Other",
	];

	const reasonOptions = [
		"Improve heart health",
		"Get active",
		"Post-recovery support",
		"Stay accountable",
		"Other",
	];

	const sessionsOptions = [
		"1 session a week",
		"2 sessions a week",
		"3 sessions a week",
		"4 sessions a week",
		"5 sessions a week",
		"Not sure",
		"Other",
	];

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<User className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								Welcome! What's your full name?
							</h2>
							<p className="text-muted-foreground mt-2">
								
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="fullName">Full Name</Label>
							<Input
								id="fullName"
								placeholder="e.g., John Doe"
								value={formData.fullName}
								onChange={(e) =>
									updateFormData("fullName", e.target.value)
								}
							/>
						</div>
					</motion.div>
				);

			case 2:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Target className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								What's your main reason for being interested in ThrivBeat?
							</h2>
							<p className="text-muted-foreground mt-2">
								Choose one or pick Other to specify
							</p>
						</div>

						<div className="space-y-2">
							<RadioGroup
								value={formData.mainReason}
								onValueChange={(value) =>
									updateFormData("mainReason", value)
								}
							>
								<div className="grid grid-cols-1 gap-3">
									{reasonOptions.map((opt) => (
										<div
											key={opt}
											className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5"
										>
											<RadioGroupItem
												value={opt}
												id={`reason-${opt}`}
												className="mt-1"
											/>
											<Label
												htmlFor={`reason-${opt}`}
												className="cursor-pointer flex-1"
											>
												{opt}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>

							{formData.mainReason === "Other" && (
								<div className="space-y-2">
									<Label htmlFor="mainReasonOther">Other reason</Label>
									<Input
										id="mainReasonOther"
										placeholder="Tell us your main reason"
										value={formData.mainReasonOther}
										onChange={(e) =>
											updateFormData(
												"mainReasonOther",
												e.target.value
											)
										}
									/>
								</div>
							)}
						</div>
					</motion.div>
				);

			case 3:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Target className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								Health information
							</h2>
							<p className="text-muted-foreground mt-2">
								Do you currently have or have had any of the following?
							</p>
						</div>

						<div className="space-y-2">
							<div className="grid grid-cols-1 gap-2">
								{healthOptions.map((opt) => (
									<div
										key={opt}
										className="flex items-center space-x-2 p-3 rounded-lg border"
									>
										<Checkbox
											checked={formData.healthConditions.includes(
												opt
											)}
											onCheckedChange={(checked) =>
												toggleArrayValue(
													"healthConditions",
													opt
												)
											}
											id={`health-${opt}`}
										/>
										<Label
											htmlFor={`health-${opt}`}
											className="cursor-pointer"
										>
											{opt}
										</Label>
									</div>
								))}
							</div>

							<div className="space-y-2">
								<Label htmlFor="medications">
									List the medications you're on (if any)
								</Label>
								<Textarea
									id="medications"
									placeholder="Medication name - dose - frequency"
									value={formData.medications}
									onChange={(e) =>
										updateFormData("medications", e.target.value)
									}
									rows={3}
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="healthOther">Other (please specify)</Label>
								<Input
									id="healthOther"
									placeholder="Any other conditions not listed"
									value={formData.healthOther}
									onChange={(e) =>
										updateFormData("healthOther", e.target.value)
									}
								/>
							</div>
						</div>
					</motion.div>
				);

			case 4:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<BookOpen className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								Program Preferences
							</h2>
							<p className="text-muted-foreground mt-2">
								Choose the program format you prefer
							</p>
						</div>

						<div className="space-y-2">
							<RadioGroup
								value={formData.programPreference}
								onValueChange={(value) =>
									updateFormData("programPreference", value)
								}
							>
								<div className="grid grid-cols-1 gap-3">
									{programOptions.map((opt) => (
										<div
											key={opt}
											className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5"
										>
											<RadioGroupItem
												value={opt}
												id={`prog-${opt}`}
												className="mt-1"
											/>
											<Label
												htmlFor={`prog-${opt}`}
												className="cursor-pointer flex-1"
											>
												{opt}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>

							{formData.programPreference === "Other" && (
								<div className="space-y-2">
									<Label htmlFor="programPreferenceOther">
										Other preference
									</Label>
									<Input
										id="programPreferenceOther"
										placeholder="Describe other preference"
										value={formData.programPreferenceOther}
										onChange={(e) =>
											updateFormData(
												"programPreferenceOther",
												e.target.value
											)
										}
									/>
								</div>
							)}
						</div>
					</motion.div>
				);

			case 5:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Check className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								How many times per week could you realistically commit?
							</h2>
							<p className="text-muted-foreground mt-2">
								Select one option Other provide details
							</p>
						</div>

						<div className="space-y-2">
							<RadioGroup
								value={formData.sessionsPerWeek}
								onValueChange={(value) =>
									updateFormData("sessionsPerWeek", value)
								}
							>
								<div className="grid grid-cols-1 gap-3">
									{sessionsOptions.map((opt) => (
										<div
											key={opt}
											className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5"
										>
											<RadioGroupItem
												value={opt}
												id={`sess-${opt}`}
												className="mt-1"
											/>
											<Label
												htmlFor={`sess-${opt}`}
												className="cursor-pointer flex-1"
											>
												{opt}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>

							{formData.sessionsPerWeek === "Other" && (
								<div className="space-y-2">
									<Label htmlFor="sessionsPerWeekOther">
										Please specify
									</Label>
									<Input
										id="sessionsPerWeekOther"
										placeholder="e.g., 2-3 short sessions"
										value={formData.sessionsPerWeekOther}
										onChange={(e) =>
											updateFormData(
												"sessionsPerWeekOther",
												e.target.value
											)
										}
									/>
								</div>
							)}
						</div>
					</motion.div>
				);

			case 6:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Globe className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								Would you be interested in joining a supportive online community?
							</h2>
							<p className="text-muted-foreground mt-2">
								(chat group or forum)
							</p>
						</div>

						<div className="space-y-2">
							<RadioGroup
								value={formData.communityInterest}
								onValueChange={(value) =>
									updateFormData("communityInterest", value)
								}
							>
								<div className="grid grid-cols-1 gap-3">
									{["Yes", "No", "Maybe"].map((opt) => (
										<div
											key={opt}
											className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5"
										>
											<RadioGroupItem
												value={opt}
												id={`comm-${opt}`}
												className="mt-1"
											/>
											<Label
												htmlFor={`comm-${opt}`}
												className="cursor-pointer flex-1"
											>
												{opt}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>
						</div>
					</motion.div>
				);

			case 7:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<User className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								Quarterly "Heart to Heart" Zoom sessions
							</h2>
							<p className="text-muted-foreground mt-2">
								Would you be open to joining a quarterly Zoom session to share progress or ask questions?
							</p>
						</div>

						<div className="space-y-2">
							<RadioGroup
								value={formData.zoomInterest}
								onValueChange={(value) =>
									updateFormData("zoomInterest", value)
								}
							>
								<div className="grid grid-cols-1 gap-3">
									{["Yes", "No"].map((opt) => (
										<div
											key={opt}
											className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5"
										>
											<RadioGroupItem
												value={opt}
												id={`zoom-${opt}`}
												className="mt-1"
											/>
											<Label
												htmlFor={`zoom-${opt}`}
												className="cursor-pointer flex-1"
											>
												{opt}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>
						</div>
					</motion.div>
				);

			case 8:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Check className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								Data & Feedback Consent
							</h2>
							<p className="text-muted-foreground mt-2">
								Would you be willing to share feedback and allow us to collect your data to measure program impact?
							</p>
						</div>

						<div className="space-y-2">
							<RadioGroup
								value={formData.dataShareConsent}
								onValueChange={(value) =>
									updateFormData("dataShareConsent", value)
								}
							>
								<div className="grid grid-cols-1 gap-3">
									{["Yes", "No", "Maybe"].map((opt) => (
										<div
											key={opt}
											className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5"
										>
											<RadioGroupItem
												value={opt}
												id={`data-${opt}`}
												className="mt-1"
											/>
											<Label
												htmlFor={`data-${opt}`}
												className="cursor-pointer flex-1"
											>
												{opt}
											</Label>
										</div>
									))}
								</div>
							</RadioGroup>
							<p className="text-sm text-muted-foreground mt-2">
								We only use anonymized/consented data for service improvement and evidence-based reporting.
							</p>
						</div>
					</motion.div>
				);

			case 9:
				return (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						className="space-y-6"
					>
						<div className="text-center mb-8">
							<div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
								<Check className="w-8 h-8 text-primary" />
							</div>
							<h2 className="text-2xl font-bold text-foreground">
								What would make you feel most supported?
							</h2>
							<p className="text-muted-foreground mt-2">
								Tell us what would help you the most in your cardiac exercise journey
							</p>
						</div>

						<div className="space-y-2">
							<Label htmlFor="supportNeeds">
								What would make you feel most supported?
							</Label>
							<Textarea
								id="supportNeeds"
								placeholder="e.g., weekly check-ins, simpler exercises, more videos, tailored plans..."
								value={formData.supportNeeds}
								onChange={(e) =>
									updateFormData("supportNeeds", e.target.value)
								}
								rows={5}
							/>
						</div>
					</motion.div>
				);

			default:
				return null;
		}
	};

	return (
		<div className="min-h-screen bg-background">
			<div className="container max-w-2xl mx-auto px-4 py-8">
				{/* Progress Bar */}
				<div className="mb-8">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-lg font-semibold text-foreground">
							Getting Started
						</h1>
						<button
							onClick={handleSkip}
							className="text-sm text-muted-foreground hover:text-foreground transition-colors"
						>
							Skip for now
						</button>
					</div>
					<Progress
						value={(currentStep / totalSteps) * 100}
						className="h-2"
					/>
					<p className="text-sm text-muted-foreground mt-2">
						Step {currentStep} of {totalSteps}
					</p>
				</div>

				{/* Form Content */}
				<div className="bg-card rounded-lg shadow-sm border p-6 md:p-8">
					<AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

					{/* Navigation Buttons */}
					<div className="flex justify-between mt-8">
						<Button
							variant="outline"
							onClick={handlePrevious}
							disabled={currentStep === 1}
							className="flex items-center gap-2"
						>
							<ChevronLeft className="w-4 h-4" />
							Previous
						</Button>

						{currentStep === totalSteps ? (
							<Button
								onClick={handleComplete}
								className="flex items-center gap-2"
								disabled={!isStepFilled()}
							>
								Complete Setup
								<Check className="w-4 h-4" />
							</Button>
						) : (
							<Button
								onClick={handleNext}
								className="flex items-center gap-2"
								disabled={!isStepFilled()}
							>
								Next
								<ChevronRight className="w-4 h-4" />
							</Button>
						)}
					</div>

				</div>
			</div>
		</div>
	);
}
