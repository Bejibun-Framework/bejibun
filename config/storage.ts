import App from "@bejibun/app";
import StorageDiskDriverEnum from "@bejibun/storage/enums/StorageDiskDriverEnum";

const config: Record<string, any> = {
    default: env("FILESYSTEM_DISK", "local"),

    disks: {
        local: {
            driver: StorageDiskDriverEnum.Local,
            root: App.Path.storagePath("app")
        },

        public: {
            driver: StorageDiskDriverEnum.Local,
            root: App.Path.storagePath("app/public"),
            url: `${env(APP_URL)}/storage/public`
        },

        s3: {
            driver: StorageDiskDriverEnum.S3,
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