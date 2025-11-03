import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.AWS_REGION || process.env.S3_REGION || "auto";

const s3Config = {
	endpoint: process.env.AWS_URL_ENDPOINT,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
	region,
	forcePathStyle: true, // 👈 important!
};

export const s3 = new S3Client(s3Config);
export default s3;
