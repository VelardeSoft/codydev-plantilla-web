import { BaseServices } from "../../shared/BaseServices.js";
import Customer from "../model/customer.js";

export default class CustomerService {
    static async getCustomers() {
        const response = await BaseServices.http.get("/customers");
        return response.data.map(customerData => new Customer(customerData));
    }

    static async updatePayment(customerId, payedAt) {
        // Patch o Put para actualizar solo payedAt
        const response = await BaseServices.http.patch(`/customers/${customerId}`, { payedAt });
        return new Customer(response.data);
    }
}
