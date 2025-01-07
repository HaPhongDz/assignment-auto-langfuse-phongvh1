import { Page, Locator, expect } from '@playwright/test';
import logger from '../utils/Logger';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Navigate URL
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // Find and click element
    async clickElement(locator: Locator) {
        await locator.click();
    }

    // Fill text to element
    async fillInput(locator: Locator, text: string) {
        await locator.fill(text);
    }

    // Wait for element to be visibled
    async waitForElement(locator: Locator, timeout: number = 5000) {
        await expect(locator).toBeVisible({ timeout });
    }

    // Verify Page header
    async verifyPageTitle(expectedTitle: string) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

    // Get all text content of elements
    async getAllTextContents(element: Locator): Promise<string[]> {
        logger.info(`Retrieving all text content from elements`);
        return await element.allTextContents();
    }

    // Get text content of a single element
    async getElementText(element: Locator): Promise<string> {
        await element.waitFor({ state: 'visible' });
        return (await element.textContent())?.trim() || '';
    }

    // Get element by 
    async getElementByLabel(region: string): Promise<Locator> {
        return await this.page.getByLabel(region).getByText(region);
    }
    
    async selectOptionFromDropDown(dropdown: Locator, option: string): Promise<void> {
        logger.info(`Selecting option from dropdown, option: ${option}`);
        const optionLocator = dropdown.filter({ hasText: option });
        await optionLocator.click();
    }
}
