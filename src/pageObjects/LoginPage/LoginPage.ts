import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
    usernameField: Locator;
    passwordField: Locator;
    regionDropdown: Locator;
    loginButton: Locator;
    regionValue: Locator;
    dashboardheader: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameField = this.page.locator('//input[@name="email"]');
        this.passwordField = this.page.locator('//input[@name="password"]');
        this.regionDropdown = this.page.getByRole('combobox');
        this.loginButton = this.page.getByTestId('submit-email-password-sign-in-form');
        this.dashboardheader = this.page.getByRole('heading', { name: 'Dashboard' });
    }

    // Getter for region option
    private getRegionOption(region: string): Locator {
        return this.page.getByLabel(region).getByText(region);
    }

    // Navigate to Login Page
    // async navigateToLoginPage() {
    //     await this.page.goto('https://cloud.langfuse.com/auth/sign-in?targetPath=%2Fproject%2Fclkpwwm0m000gmm094odg11gi');
    // }

    // // Perform login
    // async login(region: string, email: string, password: string) {
    //     // Select region dropdown
    //     await this.clickElement(this.regionDropdown);
    //     await this.page.getByLabel(region).getByText(region).click();

    //     // Fill in email field
    //     await this.fillInput(this.usernameField, email);
    //     // Fill in password field
    //     await this.fillInput(this.passwordField, password);
    //     // Submit login form
    //     await this.clickElement(this.loginButton);
    // }

    // // Verify Dashboard loaded
    // async verifyLoginSuccesful() {
    //     const dashboardHeader = this.page.getByRole('heading', { name: 'Dashboard' });
    //     await dashboardHeader.waitFor(); // Wait until the element is loaded
    //     return dashboardHeader.isVisible();
    // }
}
