import {IsString} from "class-validator";

/**
 * Class ElementsDto
 *
 * @author Olivier Maréchal <o.marechal@icloud.com>
 */
export class ElementsDto {
    @IsString()
    name: string;
}