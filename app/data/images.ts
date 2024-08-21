import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto';

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_KEY!
    },
})

const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxSize = 1024 * 1024 * 5;

export async function getSignedURL(type: string, size: number, checksum: string, user_id: string) {

    const generateFilename = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: generateFilename(),
        ContentLength: size,
        ContentType: type,
        ChecksumSHA256: checksum,
        Metadata: {
            userId: user_id
        }
    })

    const signedUrl = await getSignedUrl(s3, putObjectCommand, { expiresIn: 60 })
    return signedUrl;
}

const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashIndex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join("")
    return hashIndex;
}

export async function uploadImagesToS3(images: File[], user_id: string) {

    const filesAndUrls = await Promise.all(images.map(async image => {
        const url = await getSignedURL(image.type, image.size, await computeSHA256(image), user_id)
        return { image, url }
    }))
    await Promise.all(filesAndUrls.map(async ({ image, url }) => {
        await fetch(url, {
            method: 'PUT',
            body: image,
            headers: {
                "Content-Type": image.type
            }
        })
    }))

}
