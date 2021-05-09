import { shallow } from 'enzyme';

import PackingListPage from './PackingListPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '12345',
  }),
}));

jest.mock('../../../../hooks/useGet', () => ({
  ...jest.requireActual('../../../../hooks/useGet'),
  __esModule: true,
  default: () => ({
    response: {
      data: {},
    },
    loading: false,
    refetch: () => {},
  }),
}));

it('renders an PackingList component', () => {
  const wrapper = shallow(<PackingListPage />);
  expect(wrapper).toContainExactlyOneMatchingElement('PackingList');
});
