import { User } from '../models/User';


export async function createUser(user) {
    const dbUser = new User(user);
    await dbUser.save();

    return dbUser;
}

export async function getUserByEmail(email) {
    return await User.findOne({ "email": email})
}


