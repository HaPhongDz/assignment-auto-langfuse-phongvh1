import { test as base, Page, BrowserContext } from '@playwright/test';
import credentials from '../test-data/credentials.json';
import { LoginPageAction } from '../actions/LoginPageAction';
import { DashboardPageAction } from '../actions/DashboardPageAction';
import * as fs from 'fs';
import { stepLogger as logger } from '../utils/Logger';

type MyFixtures = {
    loggedInPage: Page;
    dashboardPageAction: DashboardPageAction;
    context: BrowserContext;
};

export const test = base.extend<MyFixtures>({
    context: async ({ browser }, use, testInfo) => {
        const storageStatePath = 'auth/storageState.json';
        const forceLogin = testInfo.project.metadata.forceLogin || false;
        let context: BrowserContext;

        if (fs.existsSync(storageStatePath) && !forceLogin) {
            // Create a new browser context with the storage state
            context = await browser.newContext({ storageState: storageStatePath });
        } else {
            // Create a new browser context
            context = await browser.newContext();
            // Create a new page within the context
            const page = await context.newPage();

            // Create a new instance of the LoginPage and perform login
            const loginPage = new LoginPageAction(page);
            await loginPage.navigateToLoginPage();
            await loginPage.login(credentials.email, credentials.password);
            await loginPage.verifyLoginSuccesful();

            // Save storage state to file
            await context.storageState({ path: storageStatePath });
        }

        await use(context);

        // Close the browser context after use
        await context.close();
    },

    loggedInPage: async ({ context }, use) => {
        // Create a new page within the context
        const page = await context.newPage();
        await use(page);
    },

    dashboardPageAction: async ({ loggedInPage }, use) => {
        const dashboardPageAction = new DashboardPageAction(loggedInPage);
        logger.info('Navigating to the dashboard page');
        await dashboardPageAction.navigateToDashboard();
        await use(dashboardPageAction);
    },
});

export { expect } from '@playwright/test';