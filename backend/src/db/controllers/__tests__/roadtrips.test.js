import * as roadtrips from '../roadtrips';
import { __RewireAPI__ as roadtripsRewireApi } from '../roadtrips';
import * as users from '../users';
import { RoadTrip } from '../../models/RoadTrip';

jest.mock('../../models/RoadTrip');
jest.mock('../users');

beforeEach(() => {
  jest.clearAllMocks();
  __rewire_reset_all__();
});

describe('createRoadTrip', () => {
  it('calls the RoadTrip constructor and creates bidirectional relationship', async () => {
    const spy = jest.spyOn(users, 'addRoadTripOrganising');

    await roadtrips.createRoadTrip({ name: 'my trip' }, '1');
    expect(RoadTrip).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('isUserOrganiser', () => {
  it('returns false if the user is not an organiser', async () => {
    roadtripsRewireApi.__Rewire__('getRoadTrip', () => Promise.resolve({ organiser: 1234 }));
    const result = await roadtrips.isUserOrganiser(1, 4321);
    expect(result).toBe(false);
  });

  it('returns true if the user is an organiser', async () => {
    roadtripsRewireApi.__Rewire__('getRoadTrip', () => Promise.resolve({ organiser: 1234 }));
    const result = await roadtrips.isUserOrganiser(1, 1234);
    expect(result).toBe(true);
  });
});

describe('getAttendees', () => {
  it('returns the attendees of a roadtrip', async () => {
    roadtripsRewireApi.__Rewire__('getRoadTrip', () => Promise.resolve({ attendees: [1234, 2345] }));
    const result = await roadtrips.getAttendees(1);
    expect(result).toStrictEqual([1234, 2345]);
  });
});

describe('getOrganiser', () => {
  it('returns the organiser of a roadtrip', async () => {
    roadtripsRewireApi.__Rewire__('getRoadTrip', () => Promise.resolve({ organiser: 1234 }));
    const result = await roadtrips.getOrganiser(1);
    expect(result).toBe(1234);
  });
});

describe('addAttendee', () => {
  it('adds a new attendee that is not already in the list of attendees', async () => {
    roadtripsRewireApi.__Rewire__('getRoadTrip', () => Promise.resolve({ attendees: [1234, 4321], save: jest.fn() }));
    const result = await roadtrips.addAttendee(1, 6789);
    expect(result.attendees).toStrictEqual([1234, 4321, 6789]);
  });

  it('does not add an attendee when they are already in the list of attendees', async () => {
    roadtripsRewireApi.__Rewire__('getRoadTrip', () =>
      Promise.resolve({ attendees: [1234, 2345, 4321], save: jest.fn() })
    );
    const result = await roadtrips.addAttendee(1, 1234);
    expect(result.attendees).toStrictEqual([1234, 2345, 4321]);
  });
});
