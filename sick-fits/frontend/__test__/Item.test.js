import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

const fakeItem = {
    id: 'ABC123',
    title: 'A Cool Item',
    price: 5000,
    description: 'This item is really cool!',
    image: 'dog.jpg',
    largeImage: 'largedog.jpg',
};

describe('<Item />', () => {
    it('renders and matches the snapshot', () => {
        const wrapper = shallow(<ItemComponent item={fakeItem} />);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
    // it('renders and displays properly', () => {
    //     const wrapper = shallow(<ItemComponent item={fakeItem} />);
    //     const PriceTag = wrapper.find('PriceTag');
    //     const img = wrapper.find('img');
    //
    //     expect(PriceTag.children().text()).toBe('$50');
    //     expect(img.props().src).toBe(fakeItem.image);
    // });
    //
    // it('renders and displays properly', () => {
    //     const wrapper = shallow(<ItemComponent item={fakeItem} />);
    //     const buttonList = wrapper.find('.buttonList');
    //     expect(buttonList.children()).toHaveLength(3);
    //     expect(buttonList.find('Link')).toHaveLength(1);
    //     expect(buttonList.find('Link')).toBeTruthy();
    // });
});
