import { v4 as uuidv4 } from 'uuid';

export class GroupRepository {
    constructor() {
        this._groups = [];
    }

    createGroup(group) {
        const groupWithId = Object.assign({}, group, { id: uuidv4() });
        this._groups.push(groupWithId);
        return groupWithId;
    }

    getGroupById(id) {
        const foundGroup = this._groups.find(group => id === group.id);
        return Object.assign({}, foundGroup);
    }

    getAllGroups() {
        return Array.from(this._groups, group => Object.assign({}, group));
    }
}

export const groupRepository = new GroupRepository();
