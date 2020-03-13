import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RegistrationCommand} from "../command/registration.command";
import {Users} from "../../domain/entities/users";
import * as bcrypt from 'bcrypt';
import {BadRequestException} from "@nestjs/common";
import {UsersRepositoryInterface} from "../../domain/repository/users.repository.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "../../infra/repository/users.repository";

/**
 * Class RegistrationHandler
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@CommandHandler(RegistrationCommand)
export class RegistrationHandler implements ICommandHandler<RegistrationCommand>
{
    /**
     * @param usersRepository: UsersRepositoryInterface
     */
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepositoryInterface
    ) {}

    /**
     * @param command: RegistrationCommand
     *
     * @return Promise<Users>
     */
    async execute(command: RegistrationCommand)
    {
        console.log(this.usersRepository);
        const emailInUse = await this.usersRepository.findByEmail(command.email);
        if (emailInUse) {
            throw new BadRequestException('Email déjà utilisé');
        }

        const user = new Users();
        user.email = command.email;
        user.password = await bcrypt.hash(command.password, 10);

        return await this.usersRepository.save(user);
    }
}