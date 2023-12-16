import AWS from "aws-sdk";
import dotenv from "dotenv";
import crypto from "crypto";
import { promisify } from 'util';

dotenv.config();

const randomBytes = promisify(crypto.randomBytes);


const region = process.env.AWS_BUCKET_REGION ?? "ap-south-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? "AKIAQBBC3WOGNS34OAPN";
const secretKeyId = process.env.AWS_SECRET_ACCESS_KEY_ID ?? "lryqYImr1dtJH3DrbwcI1CzrbH6N8oZ30saLENXy";
const bucketName = "tilli-demo";
process.env.AWS_BUCKET_NAME ?? "tilli-demo";


AWS.config.update({
    region,
    accessKeyId,
    secretKeyId,
    AWS_SDK_LOAD_CONFIG: 1
    // signatureVersion: "v4",
})
const s3 = new AWS.S3();


const generateSignedUrl = async () => {
    const bytes = await randomBytes(16);
    const imageName = bytes.toString('hex');

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 300,
    }
    try {
        console.log(`\n\n\n\n AWS Config details: Region:  ${region},\nAccess Key Id: ${accessKeyId},\nSecret Key Id: ${secretKeyId},\nBucket Name: ${bucketName}`);
        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        return signedUrl;
    } catch (error) {
        console.log("\n\nErorr: \n\n", error, "\n\n");
        return {
            message: "Error in generateSignedUrl function",
            error
        };
    }
}

export default generateSignedUrl;
