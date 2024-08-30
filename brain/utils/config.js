require('dotenv').config({ path: '' });
if (!process.env.NODE_ENV) require('dotenv').config({ path: '../../.env' });

console.log("process.env.NODE_ENV", process.env.NODE_ENV)
console.log("process.env.PORT", process.env.PORT)
console.log("DB_USER", process.env.DB_USER)

module.exports = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_SV: process.env.DB_SV,
    DB_NAME: process.env.DB_NAME,
    DB_TYPE: process.env.DB_TYPE,
    // S3_BUCKET_FOLDER_PRODUCT: process.env.S3_BUCKET_FOLDER_PRODUCT,
    // S3_BUCKET_FOLDER_CLIENT: process.env.S3_BUCKET_FOLDER_CLIENT,
    // S3_BUCKET_FOLDER_SUPPLER: process.env.S3_BUCKET_FOLDER_SUPPLER,
    // S3_BUCKET_SECTOR: process.env.S3_BUCKET_SECTOR,
    // SMTP_HOST: process.env.SMTP_HOST,
    // SMTP_EMAIL: process.env.SMTP_EMAIL,
    // SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
    EXPIRE_TOKEN: process.env.EXPIRE_TOKEN,
    // JWT_PERMISSIONS_SECRET: process.env.JWT_PERMISSIONS_SECRET,
    // S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    // S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    // S3_BUCKET_REGION: process.env.S3_BUCKET_REGION,
    // S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    // GMAIL_EMAIL: process.env.GMAIL_EMAIL,
    // GMAIL_PASS: process.env.GMAIL_PASS,
    // SMTP_HOST: process.env.SMTP_HOST,
    // SMTP_POST: process.env.SMTP_POST,
    // BASE_URL: process.env.BASE_URL,
    NODE_ENV: process.env.NODE_ENV,
}
