# Test info

- Name: Login Flow >> should login with valid credentials
- Location: /home/dianafrial/github/zero-login/tests/e2e/login.spec.ts:4:3

# Error details

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="email"]')

    at /home/dianafrial/github/zero-login/tests/e2e/login.spec.ts:8:16
```

# Page snapshot

```yaml
- button "Open Tanstack query devtools":
  - img
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | test.describe('Login Flow', () => {
   4 |   test('should login with valid credentials', async ({ page }) => {
   5 |     await page.goto('/login'); // adjust path if needed
   6 |
   7 |     // Fill the login form
>  8 |     await page.fill('input[name="email"]', 'dian@example.com');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
   9 |     await page.fill('input[name="password"]', 'Password123!');
  10 |
  11 |     // Click the login button
  12 |     await page.click('button[type="submit"]');
  13 |
  14 |     // Wait for navigation or dashboard element
  15 |     await page.waitForURL('/dashboard'); // adjust path if needed
  16 |
  17 |     // Expect dashboard or logout button to appear
  18 |     await expect(page.getByText('Dashboard')).toBeVisible();
  19 |   });
  20 | });
  21 |
```