import * as maps from '../maps';
import { Map } from '../../models/Map';
import * as MapAll from '../../models/Map';
import * as roadtrips from '../roadtrips';

jest.mock('../../models/Map');
jest.mock('../../models/RoadTrip');
jest.mock('../roadtrips');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getMap', () => {
  it('returns the map of the given roadtrip', async () => {
    jest
      .spyOn(roadtrips, 'getRoadTrip')
      .mockImplementation(() => Promise.resolve({ map: { primaryDestination: '123 avenue' } }));

    const result = await maps.getMap(1);
    expect(result).toStrictEqual({ primaryDestination: '123 avenue' });
  });
});

describe('createMap', () => {
  it('creates map object in database', async () => {
    const roadTrip = { map: 1, save: jest.fn() };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));

    const newMap = { primaryDestination: '50 street' };
    await maps.createMap(1, newMap);

    expect(Map).toHaveBeenCalledTimes(1);
    expect(Map).toHaveBeenCalledWith(newMap);
  });

  it('saves new map object id as the map for the roadtrip', async () => {
    const roadTrip = { map: 1, save: jest.fn() };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));
    jest.spyOn(MapAll, 'Map').mockImplementation((map) => {
      return {
        _id: 2,
        primaryDestination: map.primaryDestination,
        save: jest.fn(),
      };
    });

    const result = await maps.createMap(1, { primaryDestination: '50 street' });

    expect(result.primaryDestination).toBe('50 street');
    expect(roadTrip.map).toBe(2);
  });
});
