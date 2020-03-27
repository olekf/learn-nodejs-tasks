import { v4 as uuidv4 } from 'uuid';
import { logger } from '../config/winston';

class UserRepository {
    constructor() {
        this._users = new Map();

        const defaultPassword = uuidv4();
        this.createUser({
            login: 'admin',
            password: defaultPassword,
            age: 130
        });

        logger.info(`Use admin password: ${defaultPassword}`);
    }

    getUserById(userId) {
        const existingUser = Object.assign({}, this._users.get(userId));
        if (!existingUser.id || existingUser.isDeleted) {
            const error = Error(`User with id ${userId} not found or deleted`);
            error.status = 404;
            throw error;
        }
        return existingUser;
    }

    createUser(user) {
        const userWithId = Object.assign({}, user, { id: uuidv4() });
        this._users.set(userWithId.id, userWithId);
        return userWithId;
    }

    updateUser(userId, newUserDetails) {
        const existingUser = this.getUserById(userId);
        const updatedUser = Object.assign(existingUser, newUserDetails, { id: userId });
        this._users.set(userId, updatedUser);
        return updatedUser;
    }

    getUserByLogin(login) {
        return this.getAllUsers()
            .find(user => user.login === login && !user.isDeleted);
    }

    getAutoSuggestUsers(loginSubstring, limit) {
        return this.getAllUsers()
            .filter(user => !user.isDeleted)
            .sort((user1, user2) => user1.login > user2.login)
            .filter(user => user.login.includes(loginSubstring))
            .slice(0, limit);
    }

    removeUser(userId) {
        const existingUser = this.getUserById(userId);
        const removedUser = Object.assign(existingUser, { isDeleted: true });
        this._users.set(userId, removedUser);
    }

    getAllUsers() {
        return Array.from(this._users.values(), user => Object.assign({}, user));
    }
}

export const userRepository = new UserRepository();
