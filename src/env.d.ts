declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * Segment API token for authentication
     */
    SEGMENT_API_TOKEN: string;
    /**
     * Environment to run the script in
     */
    ENV: "dev" | "prod";
  }
}
