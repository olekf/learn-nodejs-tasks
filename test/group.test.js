import { GroupRepository } from '../src/models/group';

let groupRepository;

const testGroup = {
    'name': 'group_name',
    'permissions': ['READ', 'WRITE']
};

beforeEach(() => {
    groupRepository = new GroupRepository();
});

describe('group CRUD', () => {
    test('creates group', () => {
        groupRepository.createGroup(testGroup);

        expect(groupRepository._groups.length).toBe(1);
    });

    test('gets group by id', () => {
        const createdGroup = groupRepository.createGroup(testGroup);

        const group = groupRepository.getGroupById(createdGroup.id);

        expect(group.id).toBe(createdGroup.id);
    });

    test('gets all groups', () => {
        groupRepository.createGroup(testGroup);
        groupRepository.createGroup(testGroup);

        const groups = groupRepository.getAllGroups();

        expect(groups.length).toBe(2);
    });
});
