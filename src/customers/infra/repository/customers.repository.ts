import {EntityRepository, Repository} from "typeorm";
import {Customers} from "../../domain/entities/customers.entity";
import {CustomersRepositoryInterface} from "../../domain/repository/customers.repository.interface";

@EntityRepository(Customers)
export class CustomersRepository extends Repository<Customers> implements CustomersRepositoryInterface
{
}