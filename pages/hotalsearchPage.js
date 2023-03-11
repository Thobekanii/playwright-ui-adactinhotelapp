exports.HotelSearch = class HotelSearch {

    constructor(page) {
        this.locationList = page.locator('//select[@id="location"]');
        this.hotelsList = page.locator('//select[@id="hotels"]');
        this.roomTypes = page.locator('//select[@id="room_type"]');
        this.numberOfRooms = page.locator('room_nos');
        this.checkInDate = page.locator('datepick_in');
        this.checkOutDate = page.locator('datepick_out');
        this.adultPerRoom = page.locator('adult_room');
        this.childrenPerRoom = page.locator('child_room');

        this.searchButtom = page.locator('Submit');
        this.resetButton = page.locator('Reset');
    }
    async selectLocation(location) {
        await this.locationList.selectOption({label: location});
    }

    async selectHotels(hotel) {
        await this.hotelsList.selectOption({label: hotel});
    }

    async selectRoomtype(roomtype) {
        await this.roomTypes.selectOption({label: roomtype});
    }
}