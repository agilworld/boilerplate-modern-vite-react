import { expect, test } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test('should hide left panel correctly', async ({ page }) => {
    await page.goto('/');
    const header = await page.locator('#leftPanel');
    await expect(header).toBeHidden();
  });
});
