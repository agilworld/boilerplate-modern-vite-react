import { expect, test } from '@playwright/test';

test.describe('Login Flow', () => {
  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login'); // adjust path if needed

    // Fill the login form
    await page.fill('input[name="email"]', 'dian@example.com');
    await page.fill('input[name="password"]', 'Password123!');

    // Click the login button
    await page.click('button[type="submit"]');

    // Wait for navigation or dashboard element
    await page.waitForURL('/dashboard'); // adjust path if needed

    // Expect dashboard or logout button to appear
    await expect(page.getByText('Dashboard')).toBeVisible();
  });
});
