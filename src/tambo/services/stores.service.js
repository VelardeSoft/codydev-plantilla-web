import { BaseServices } from "../../shared/BaseServices.js";
import Store from "../model/store.js";
import Customer from "../model/customer.js";

export default class StoreService {
    static async getStores() {
        const response = await BaseServices.http.get("/stores");
        return response.data.map(storeData => new Store(storeData));
    }

    static async getCustomers() {
        const response = await BaseServices.http.get("/customers");
        return response.data.map(customerData => new Customer(customerData));
    }
    static async createStore(data) {
        const response = await BaseServices.http.post('/stores', data);
        return new Store(response.data);
    }

}