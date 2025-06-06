import { test, expect, Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    await page.routeWebSocket("ws://*/stream", () => {});
    await page.goto("/");

    // Wait for chat view
    await expect(page.locator(".chat-history")).toBeAttached();
    await page.getByRole("button", { name: "Set Name" }).click();
});

test("should hide dialog when pressing cancel", async ({ page }) => {
    const dialog = await page.getByRole("dialog")
    expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: "Cancel" }).click();
    expect(dialog).not.toBeVisible();
});

// TODO: No token - don't even send request

[
    { data: { status: 400, body: "Nickname hoo-hah is already taken." }, expected: "Nickname hoo-hah is already taken." },
    { data: { status: 500, body: "Unexpected error." }, expected: "Unexpected error." }
].forEach(({ data, expected }) => {
    test(`should display alert on ${data.status} response`, async ({ page }) => {
        await page.route("**/nickname", route => route.fulfill(data));
        await fillInNicknameDialog(page, "hoo-hah");
        await expect(page.locator(".alert")).toHaveText(expected);
    });
});

test("should be able to set a valid nickname", async ({ page }) => {
    await page.route("**/nickname", route => route.fulfill({ status: 200 }));
    const dialog = await fillInNicknameDialog(page, "hoo-hah");
    await expect(dialog).not.toBeVisible();
    await expect(page.getByRole("button", { name: "hoo-hah" })).toBeVisible();
});

/**
 * Helper method to fill in the nickname form in the dialog.
 */
async function fillInNicknameDialog(page: Page, nickname: string): Promise<Locator> {
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();

    await dialog.getByRole("textbox").fill(nickname);
    await dialog.getByRole("button", { name: "Set Name" }).click();

    return dialog;
}
