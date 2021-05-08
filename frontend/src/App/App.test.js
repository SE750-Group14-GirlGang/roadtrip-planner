import { shallow } from 'enzyme';

import App from './App';

it('renders a switch components', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toContainExactlyOneMatchingElement('Switch');
});

it('renders three protected routes', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toContainMatchingElements(3, 'ProtectedRoute');
});
