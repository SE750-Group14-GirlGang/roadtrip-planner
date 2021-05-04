import * as emergencydetails from '../emergencydetails';
import * as roadtrips from '../roadtrips';
import * as EmergencyDetails from '../../models/EmergencyDetails';
import * as RoadTrip from '../../models/RoadTrip';

jest.mock('../../models/EmergencyDetails');
jest.mock('../../models/RoadTrip');
jest.mock('../roadtrips');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getEmergencyDetails', () => {
  it('returns the emergency details of the given roadtrip', async () => {
    jest
      .spyOn(roadtrips, 'getRoadTrip')
      .mockImplementation(() => Promise.resolve({ emergencyDetails: ['details 1', 'details 2'] }));

    const result = await emergencydetails.getEmergencyDetails(1);
    expect(result).toStrictEqual(['details 1', 'details 2']);
  });
});

describe('createEmergencyDetails', () => {
  it('create emergency details object in database and saves in the emergencyDetails array roadtrip', async () => {
    const roadTrip = { emergencyDetails: [432], save: () => {} };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));
    const spy = jest.spyOn(EmergencyDetails, 'EmergencyDetails').mockImplementation((emergencyDetails) => {
      return {
        _id: 123,
        name: emergencyDetails.name,
        save: () => {},
      };
    });

    const result = await emergencydetails.createEmergencyDetails(1, { name: 'Denise' });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.name).toBe('Denise');
    expect(roadTrip.emergencyDetails).toStrictEqual([432, 123]);
  });
});
