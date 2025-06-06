import { test, expect, Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.routeWebSocket("ws://*/stream", () => {});
    await page.goto("/");

    // Wait for chat view
    await expect(page.locator(".chat-history")).toBeAttached();
    await page.getByRole("button", { name: "Set Name" }).click();
});
