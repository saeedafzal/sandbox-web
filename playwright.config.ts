import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:5173";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? "dot" : "list",

    use: { baseURL },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] }
        },
        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] }
        },
        // {
        //     name: "webkit",
        //     use: { ...devices["Desktop Safari"] }
        // }
    ],

    webServer: {
        command: "npm start",
        url: baseURL,
        reuseExistingServer: !process.env.CI
    }
});
