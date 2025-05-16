import { test, expect } from "@playwright/test";

test("should display loading view on page load", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Sandbox - Particle Chat");
    await expect(page.getByRole("img")).toBeVisible();
});

test("should display chat view on websocket connect", async ({ page }) => {
    await page.routeWebSocket("ws://*/stream", () => {});

    await page.goto("/");

    await expect(page).toHaveTitle("Sandbox - Particle Chat");

    // Check nav/editor/sidebar are visible
    await expect(page.getByRole("navigation")).toBeVisible();
    await expect(page.locator("div[contenteditable]")).toHaveAttribute("contenteditable", "false");
    await expect(page.getByRole("button", { name: "Send" })).toBeDisabled();
    await expect(page.getByRole("list")).toBeAttached();
});

test("should render user list on websocket payload", async ({ page }) => {
    const users = ["person1", "person2", "person3"];

    await page.routeWebSocket("ws://*/stream", ws => {
        ws.send(JSON.stringify({ type: "initial", users }));
    });

    await page.goto("/");

    await expect(page.getByRole("list")).toBeAttached();
    await expect(page.getByRole("listitem")).toHaveText(users);
});

test("should render message bubble on websocket payload", async ({ page }) => {
    const message = {
        type: "message",
        sender: "hello",
        message: "This is a message.",
        timestamp: 1746998380134
    };

    await page.routeWebSocket("ws://*/stream", ws => {
        ws.send(JSON.stringify(message));
    });

    await page.goto("/");

    await expect(page.locator(".chat-history")).toBeAttached();

    // Check bubble element
    const bubble = page.locator(".bubble");
    await expect(bubble).toBeVisible();

    await expect(bubble.locator(".avatar")).toHaveText("H");
    await expect(bubble.getByText("hello", { exact: true })).toBeVisible();
    await expect(bubble.getByRole("time")).toHaveText("10:19 PM");
    await expect(bubble.getByText("This is a message.", { exact: true })).toBeVisible();
});
