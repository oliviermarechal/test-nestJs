/**
 * Interface TodosRepository
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
import {Customers} from "../entities/customers.entity";

export interface CustomersRepositoryInterface
{
    /**
     * @param customers
     *
     * @return Promise
     */
    save(customers: Customers): Promise<Customers>

    /**
     * @param id
     *
     * @return Promise
     */
    findOne(id: string): Promise<Customers>
}