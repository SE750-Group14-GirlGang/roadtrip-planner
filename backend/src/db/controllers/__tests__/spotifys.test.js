import * as spotifys from '../spotifys';
import { Spotify } from '../../models/Spotify';
import * as SpotifyAll from '../../models/Spotify';
import * as roadtrips from '../roadtrips';

jest.mock('../../models/Spotify');
jest.mock('../../models/RoadTrip');
jest.mock('../roadtrips');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getSpotify', () => {
  it('returns the spotify of the given roadtrip', async () => {
    jest
      .spyOn(roadtrips, 'getRoadTrip')
      .mockImplementation(() => Promise.resolve({ spotify: { playlistId: 'abc123' } }));

    const result = await spotifys.getSpotify(1);
    expect(result).toStrictEqual({ playlistId: 'abc123' });
  });
});

describe('createSpotify', () => {
  it('creates spotify object in database', async () => {
    const roadTrip = { spotify: 1, save: jest.fn() };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));

    const newSpotify = { playlistId: 'def456' };
    await spotifys.createSpotify(1, newSpotify);

    expect(Spotify).toHaveBeenCalledTimes(1);
    expect(Spotify).toHaveBeenCalledWith(newSpotify);
  });

  it('saves new spotify object id as the spotify for the roadtrip', async () => {
    const roadTrip = { spotify: 1, save: jest.fn() };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));
    jest.spyOn(SpotifyAll, 'Spotify').mockImplementation((spotify) => {
      return {
        _id: 2,
        playlistId: spotify.playlistId,
        save: jest.fn(),
      };
    });

    const result = await spotifys.createSpotify(1, { playlistId: 'def456' });

    expect(result.playlistId).toBe('def456');
    expect(roadTrip.spotify).toBe(2);
  });
});
