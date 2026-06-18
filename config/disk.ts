import App from "@bejibun/app";
import DiskDriverEnum from "@bejibun/core/enums/DiskDriverEnum";

const config: Record<string, any> = {
    default: env("FILESYSTEM_DISK", "local"),

    disks: {
        local: {
            driver: DiskDriverEnum.Local,
            root: App.Path.storagePath("app")
        },

        public: {
            driver: DiskDriverEnum.Local,
            root: App.Path.storagePath("app/public"),
            url: `${env(APP_URL)}/storage/public`
        },

        s3: {
            driver: DiskDriverEnum.S3,
            endpoint: env("S3_ENDPOINT"),
            region: env("S3_REGION"),
            bucket: env("S3_BUCKET"),
            access_key_id: env("S3_ACCESS_KEY_ID"),
            secret_access_key: env("S3_SECRET_ACCESS_KEY"),
            url: ""
        }
    }
};

export default config;