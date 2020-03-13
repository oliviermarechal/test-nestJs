import {IsNotEmpty, IsString} from "class-validator";

/**
 * Class CustomersDto
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class CustomersDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    phoneNumber?: string;

    @IsString()
    siret?: string;
}