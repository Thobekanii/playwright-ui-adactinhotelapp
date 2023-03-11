import { test, expect } from '@playwright/test';
import { HotelSearch } from '../pages/hotalsearchPage';
import { LoginPage } from '../pages/loginPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://adactinhotelapp.com/');
    const loginpage = new LoginPage(page);
    await loginpage.login('thobekani', '254500');
});

test.describe('search hotel', () => {
    test('TC - 102 To verify whether the check-out date field accepts a later date than check-in date.', async ({ page }) => {
        const searchhotel = new HotelSearch(page);
        await searchhotel.selectLocation('Sydney');
        await searchhotel.selectHotels('Hotel Creek');
        await searchhotel.selectRoomtype('Standard');
        await expect(loginpage.logoutLink, 'User should login to the applicati on.').toBeVisible();
    });
});