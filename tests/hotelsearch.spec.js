import { test, expect } from '@playwright/test';
import { HotelSearch } from '../pages/hotelsearchPage';
import { LoginPage } from '../pages/loginPage';
import {HotelSelect} from '../pages/hotelselectPage';

test.beforeEach(async ({ page }) => {
    await page.goto('http://adactinhotelapp.com/');
    const loginpage = new LoginPage(page);
    await loginpage.login('thobekani', '254500');
});

test.describe('search hotel', () => {
    test.skip('TC - 102 To verify whether the check-out date field accepts a later date than check-in date.', async ({ page }) => {
        const searchhotel = new HotelSearch(page);
        const errormessage = 'Check-In Date shall be before than Check-Out Date';

        await searchhotel.selectLocation('Sydney');
        await searchhotel.selectHotels('Hotel Creek');
        await searchhotel.selectRoomtype('Standard');
        await searchhotel.selectNumberOfRooms(1);
        await searchhotel.enterCheckInDate(7);
        await searchhotel.enterCheckOutDate(5)
        await searchhotel.clickSearchButton();

        await expect(searchhotel.checkInError).toHaveText(errormessage);
    });

    test.skip('TC - 103 To check if error is date field is in the pass.', async ({ page }) => {
        const searchhotel = new HotelSearch(page);
        const errormessage = 'Check-In Date should be either Today or Later Date';

        await searchhotel.selectLocation('Sydney');
        await searchhotel.selectHotels('Hotel Creek');
        await searchhotel.selectRoomtype('Standard');

        await searchhotel.selectNumberOfRooms(1);
        await searchhotel.enterCheckInDate(-5);
        await searchhotel.enterCheckOutDate(-3)

        await searchhotel.clickSearchButton();
        await expect(searchhotel.checkInError).toHaveText(errormessage);
    });

    test.skip('TC - 104 To verify whether locations in Select Hotel page are displayed according to the location selected in Search Hotel.', async ({ page }) => {
        const searchhotel = new HotelSearch(page);
        const location = 'Sydney';
        const hotelselect = new HotelSelect(page); //new SelectHotel(page);
        //const errormessage = 'Check-In Date should be either Today or Later Date';

        await searchhotel.selectLocation(location);
        await searchhotel.selectHotels('Hotel Creek');
        await searchhotel.selectRoomtype('Standard');

        await searchhotel.selectNumberOfRooms(1);
        await searchhotel.enterCheckInDate();
        await searchhotel.enterCheckOutDate(1)
        await searchhotel.selectAdultsPerRoom(1);
        
        await searchhotel.clickSearchButton();
        let value;
        value = await hotelselect.location.inputValue();
        //value = await page.locator('//td/strong[contains(text(),"Location")]//following::input[4]').inputValue();//await sh.location.textContent();

        if(value == location){
            console.log(value);
        }else{
            test.fail();           
        }
    });

    test('TC - 105 To verify date and Check Out date are being displayed in Select Hotel Page according to the dates selected in search Hotel.', async ({ page }) => {
        let arrivaldate, departuredate;
        const searchhotel = new HotelSearch(page);
        const location = 'Sydney';
        const ArrivalDate = searchhotel.getDate();
        const DepartureDate = searchhotel.getDate(1);
        const hotelselect = new HotelSelect(page); 

        await searchhotel.selectLocation(location);
        await searchhotel.selectHotels('Hotel Creek');
        await searchhotel.selectRoomtype('Standard');

        await searchhotel.selectNumberOfRooms(1);
        await searchhotel.enterCheckInDate();
        await searchhotel.enterCheckOutDate(1)
        await searchhotel.selectAdultsPerRoom(1);
        
        await searchhotel.clickSearchButton();
        
        departuredate = await hotelselect.departuredate.inputValue();
        arrivaldate = await hotelselect.ArrivalDate.inputValue();

        if(arrivaldate == ArrivalDate && departuredate == DepartureDate){
            console.log(value);
        }else{
            test.fail();           
        }
    });

});