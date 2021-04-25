import { EmergencyDetails } from "./models/EmergencyDetails.js";
import { Itinerary } from "./models/Itinerary.js";
import { Map } from "./models/Map.js";
import { PackedItems } from "./models/PackedItems.js";
import { PackingList } from "./models/PackingList.js";
import { RoadTrip } from "./models/RoadTrip.js";
import { Spotify } from "./models/Spotify.js";
import { User } from "./models/User.js";

export default async function resetDatabase() {
    await EmergencyDetails.syncIndexes();
    await Itinerary.syncIndexes();
    await Map.syncIndexes();
    await PackedItems.syncIndexes();
    await PackingList.syncIndexes();
    await RoadTrip.syncIndexes();
    await Spotify.syncIndexes();
    await User.syncIndexes();
}

