import * as emergencydetails from '../emergencydetails';
import * as roadtrips from '../roadtrips';
import * as EmergencyDetailsAll from '../../models/EmergencyDetails';
import { EmergencyDetails } from '../../models/EmergencyDetails';

jest.mock('../../models/EmergencyDetails');
jest.mock('../../models/RoadTrip');
jest.mock('../roadtrips');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getAllEmergencyDetails', () => {
  it('returns all the emergency details of the given roadtrip', async () => {
    jest
      .spyOn(roadtrips, 'getRoadTrip')
      .mockImplementation(() => Promise.resolve({ emergencyDetails: ['details 1', 'details 2'] }));

    const result = await emergencydetails.getAllEmergencyDetails(1);
    expect(result).toStrictEqual(['details 1', 'details 2']);
  });
});

describe('createEmergencyDetailsForUser', () => {
  it('creates emergency details object in database', async () => {
    const roadTrip = { emergencyDetails: [432], save: jest.fn() };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));

    const emergencyDetails = { name: 'Denise' };
    await emergencydetails.createEmergencyDetailsForUser(1, 2, emergencyDetails);

    expect(EmergencyDetails).toHaveBeenCalledTimes(1);
    expect(EmergencyDetails).toHaveBeenCalledWith(emergencyDetails);
  });

  it('saves new emergency details object id in roadtrips emergency details array', async () => {
    const roadTrip = { emergencyDetails: [432], save: jest.fn() };
    jest.spyOn(roadtrips, 'getRoadTrip').mockImplementation(() => Promise.resolve(roadTrip));
    const spy = jest.spyOn(EmergencyDetailsAll, 'EmergencyDetails').mockImplementation((emergencyDetails) => {
      return {
        _id: 123,
        name: emergencyDetails.name,
        save: jest.fn(),
      };
    });

    const result = await emergencydetails.createEmergencyDetailsForUser(1, 2, { name: 'Denise' });

    expect(result.name).toBe('Denise');
    expect(roadTrip.emergencyDetails).toStrictEqual([432, 123]);
  });
});
