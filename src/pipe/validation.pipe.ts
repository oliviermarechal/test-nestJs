import {ArgumentMetadata, BadRequestException, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            let errorMessage = "";
            errors.map(error => {
                for (const [key, value] of Object.entries(error.constraints)) {
                    errorMessage += value;
                }
            });

            throw new BadRequestException(errorMessage);
        }

        return object;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];

        return !types.includes(metatype);
    }
}
