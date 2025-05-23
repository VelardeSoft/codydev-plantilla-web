export default class Store {
    constructor({ id, name, description, address, schedule, openedAt }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.schedule = schedule; // array de strings
        this.openedAt = new Date(openedAt);
    }
}
