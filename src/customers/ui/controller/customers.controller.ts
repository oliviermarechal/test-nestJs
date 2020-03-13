import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../../../auth/infra/jwt-auth.guard";
import {UserDecorator} from "../../../users/infra/decorator/users.decorator";
import {UserAuthenticatedInterface} from "../../../auth/domain/user-authenticated.interface";
import {ValidationPipe} from "../../../pipe/validation.pipe";
import {CustomersDto} from "../dto/customers.dto";
import {Customers} from "../../domain/entities/customers.entity";
import {CommandBus} from "@nestjs/cqrs";
import {CreateCustomersCommand} from "../../app/command/create-customers.command";

/**
 * Class CustomersController
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
@Controller('customers')
export class CustomersController
{
    constructor(
        private readonly commandBus: CommandBus,
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(
        @UserDecorator() user: UserAuthenticatedInterface,
        @Body(new ValidationPipe()) customersDto: CustomersDto
    ): Promise<Customers> {
        const command = new CreateCustomersCommand(
            customersDto.name,
            customersDto.email,
            user.id,
            customersDto.siret,
            customersDto.phoneNumber
        );

        return await this.commandBus.execute(command);
    }
}
