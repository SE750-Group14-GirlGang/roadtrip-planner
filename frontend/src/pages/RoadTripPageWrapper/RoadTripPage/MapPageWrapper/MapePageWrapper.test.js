import { shallow } from 'enzyme';

import MapPageWrapper from './MapPageWrapper';

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

it('renders a MapPage component when not loading', () => {
  const wrapper = shallow(<MapPageWrapper />);
  expect(wrapper).toContainExactlyOneMatchingElement('MapPage');
});
