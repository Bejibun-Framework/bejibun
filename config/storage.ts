import App from "@bejibun/app";
import StorageDiskDriverEnum from "@bejibun/storage/enums/StorageDiskDriverEnum";

const config: Record<string, any> = {
    /** The default disk used when no disk is specified. */
    default: env("FILESYSTEM_DISK", "local"),

    /** The collection of named storage disks. */
    disks: {
        /** Local disk using the application storage path as its root. */
        local: {
            driver: StorageDiskDriverEnum.Local,
            root: App.Path.storagePath("app")
        },

        /** Publicly accessible local disk rooted at the public storage path. */
        public: {
            driver: StorageDiskDriverEnum.Local,
            root: App.Path.storagePath("app/public"),
            url: `${env("APP_URL")}/storage/public`
        },

        /** S3-compatible disk configured via S3 environment variables. */
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
