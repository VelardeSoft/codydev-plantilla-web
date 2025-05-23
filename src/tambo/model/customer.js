export default class Customer {
    constructor({ id, firstName, lastName, storeId, products, amount, payedAt }) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.storeId = storeId;
        this.products = products;
        this.amount = amount;
        this.payedAt = payedAt ? new Date(payedAt) : null;
    }
}
