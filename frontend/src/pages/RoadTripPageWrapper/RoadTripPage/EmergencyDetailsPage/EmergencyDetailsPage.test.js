import { shallow } from 'enzyme';

import EmergencyDetailsPage from './EmergencyDetailsPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({
    id: '12345',
  }),
}));

jest.mock('../../../../hooks/useGet', () => ({
  ...jest.requireActual('../../../../hooks/useGet'), // use actual for all non-hook parts
  __esModule: true,
  default: () => ({
    response: {
      data: {},
    },
    loading: false,
    refetch: () => {},
  }),
}));

it('renders an EmergencyDetails component', () => {
  const wrapper = shallow(<EmergencyDetailsPage />);
  expect(wrapper).toContainExactlyOneMatchingElement('EmergencyDetails');
});
