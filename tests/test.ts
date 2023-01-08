import { expect, test } from '@playwright/test';

test('page has expected ZON title', async ({ page }) => {
	await page.goto('/');
	expect(page.getByTitle('ZEIT ONLINE')).toBeDefined;
});
