const config: Record<string, any> = {
    /** Value for the Access-Control-Allow-Headers header. */
    allowedHeaders: "*",

    /** Whether to allow credentials in CORS requests. */
    credentials: false,

    /** Headers exposed to the browser. */
    exposedHeaders: [],

    /** Cache duration in seconds for preflight responses. */
    maxAge: 86400,

    /** Value for the Access-Control-Allow-Methods header. */
    methods: "*",

    /** Value for the Access-Control-Allow-Origin header. */
    origin: "*"
};

export default config;
