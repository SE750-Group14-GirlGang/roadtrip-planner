import { shallow } from 'enzyme';

import ItineraryPage from './ItineraryPage';

it('renders an ItineraryWrapper component', () => {
  const wrapper = shallow(<ItineraryPage />);
  expect(wrapper).toContainExactlyOneMatchingElement('ItineraryWrapper');
});
