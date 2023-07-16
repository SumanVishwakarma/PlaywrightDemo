// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
    await page.goto('/hours/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
    await page.goto('/hours/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Hours' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});
