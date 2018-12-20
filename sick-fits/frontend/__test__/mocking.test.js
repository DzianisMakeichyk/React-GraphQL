function Person(name, foods) {
    this.name = name;
    this.foods = foods;
}

Person.prototype.fetchFavFoods = function () {
    return new Promise((resolve, reject) => {
        // Simulate an API
        setTimeout(() => resolve(this.foods), 2000)
    });
};

describe('mocking learning', () => {
    it('mocks a reg function', () => {
        const fetchDos = jest.fn();
        fetchDos();
        expect(fetchDos).toHaveBeenCalled();
    });

    it('can create a person', async () => {
        const me = new Person('Dzianis', ['pizza', 'burger']);
        const favFoods = await me.fetchFavFoods();
        // mock the favFoods function
        me.fetchFavFoods = jest.fn().mockResolvedValue(['pizza', 'ramen']);
        expect(me.name).toBe('Dzianis');
        expect(favFoods).toContain('pizza');
    });
});
