import { UserRepository } from '../src/models/user';
import { groupRepository } from '../src/models/group';

jest.mock('../src/models/group');

let userRepository;

const testUser = {
    'login': 'adm_user',
    'password': 'password123',
    'age': 22
};

const testGroup = {
    'id': 'group_id',
    'name': 'group_name',
    'permissions': ['READ', 'WRITE']
};

beforeEach(() => {
    userRepository = new UserRepository();
});

test('creates initial user', () => {
    expect(userRepository._users.size).toBe(1);
});

test('creates new user', () => {
    userRepository.createUser(testUser);

    expect(userRepository._users.size).toBe(2);
});

test('gets user by id', () => {
    const createdUser = userRepository.createUser(testUser);

    const user = userRepository.getUserById(createdUser.id);

    expect(user.id).toBe(createdUser.id);
});

test('gets user by login', () => {
    const createdUser = userRepository.createUser(testUser);

    const user = userRepository.getUserByLogin(createdUser.login);

    expect(user.id).toBe(createdUser.id);
});

test('updates user', () => {
    const createdUser = userRepository.createUser(testUser);
    const newLogin = 'new_login';

    userRepository.updateUser(createdUser.id, {'login': newLogin});

    const user = userRepository.getUserById(createdUser.id);
    expect(user.login).toBe(newLogin);
});

test('gets auto suggest users by login', () => {
    userRepository.createUser(testUser);

    let autoSuggestUsers = userRepository.getAutoSuggestUsers('adm', 10);

    expect(autoSuggestUsers.length).toBe(2);
    autoSuggestUsers.forEach(autoSuggestUser => {
        expect(autoSuggestUser.login).toContain('adm');
    });
});

test('gets auto suggest users by login with sorting', () => {
    userRepository.createUser(testUser);

    let autoSuggestUsers = userRepository.getAutoSuggestUsers('adm', 10);

    expect(autoSuggestUsers.length).toBe(2);
    expect(autoSuggestUsers[0].login < autoSuggestUsers[1].login).toBeTruthy();
});

test('gets auto suggest users by login with limit', () => {
    userRepository.createUser(testUser);

    let autoSuggestUsers = userRepository.getAutoSuggestUsers('adm', 1);

    expect(autoSuggestUsers.length).toBe(1);
});

test('removes user', () => {
    const createdUser = userRepository.createUser(testUser);

    userRepository.removeUser(createdUser.id);

    expect(() => {
        userRepository.getUserById(createdUser.id);
    }).toThrow();
});

test('gets user group', () => {
    groupRepository.getGroupById.mockReturnValue(testGroup);

    let userGroup = userRepository.getUserGroup(testGroup.id);

    expect(groupRepository.getGroupById).toHaveBeenCalledWith(testGroup.id);
    expect(userGroup).toEqual(testGroup);
});
