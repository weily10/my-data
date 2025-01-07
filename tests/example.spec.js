// @ts-check
import { test, expect } from '@playwright/test';

test('should display homepage', async ({page})=>{
  await page.goto('http://localhost:5173/')
  await expect(page).toHaveTitle(/My App/i);
})

