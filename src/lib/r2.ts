import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function getPresignedPutUrl(key: string, contentType: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        ContentType: contentType,
    });
    return await getSignedUrl(r2, command, { expiresIn: 600 }); // 10 mins
}

export async function getPresignedGetUrl(key: string) {
    const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
    });
    return await getSignedUrl(r2, command, { expiresIn: 3600 }); // 1 hour
}
