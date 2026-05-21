export declare const env: Readonly<{
    NODE_ENV: "development" | "test" | "production";
    PORT: number;
    DATABASE_URL: string;
    MONGO_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: number;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ADMIN_ACCESS_SECRET: string;
    JWT_ADMIN_REFRESH_SECRET: string;
    JWT_EXPIRE: string;
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
    FRONTEND_URL: string;
    CORS_ORIGIN: string;
    GEMINI_API_KEY: string;
} & import("envalid").CleanedEnvAccessors>;
