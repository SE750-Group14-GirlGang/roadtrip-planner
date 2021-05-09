import { shallow } from 'enzyme';

import SpotifyPlaylistPage from './SpotifyPlaylistPage';

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

it('renders an SpotifyPlaylistWrapper component', () => {
  const wrapper = shallow(<SpotifyPlaylistPage />);
  expect(wrapper).toContainExactlyOneMatchingElement('SpotifyPlaylistWrapper');
});
