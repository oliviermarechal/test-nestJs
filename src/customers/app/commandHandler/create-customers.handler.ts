import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateCustomersCommand} from "../command/create-customers.command";
import {CustomersRepositoryInterface} from "../../domain/repository/customers.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {CustomersRepository} from "../../infra/repository/customers.repository";
import {Customers} from "../../domain/entities/customers.entity";
import {UsersRepository} from "../../../users/infra/repository/users.repository";
import {UsersRepositoryInterface} from "../../../users/domain/repository/users.repository.interface";

/**
 * class CreateCustomersHandler
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@CommandHandler(CreateCustomersCommand)
export class CreateCustomersHandler implements ICommandHandler<CreateCustomersCommand>
{
    /**
     * @param customersRepository: CustomersRepositoryInterface
     * @param usersRepository: UsersRepositoryInterface
     */
    constructor(
        @InjectRepository(CustomersRepository)
        private readonly customersRepository: CustomersRepositoryInterface,
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepositoryInterface
    ) {}

    async execute(command: CreateCustomersCommand): Promise<Customers>
    {
        const customers = new Customers();
        customers.name = command.name;
        customers.email = command.email;
        customers.siret = command.siret;
        customers.phoneNumber = command.phoneNumber;
        customers.user = await this.usersRepository.findOne(command.userId);

        return await this.customersRepository.save(customers);
    }
}