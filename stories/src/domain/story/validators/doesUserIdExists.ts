import { Injectable } from "@nestjs/common";
import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from "class-validator";
import { UserService } from "../services/user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class doesUserIdExists implements ValidatorConstraintInterface {
    constructor(private readonly userService:UserService){}
    
    public async validate(userId: string): Promise<boolean> {
       return this.userService.doesUserExist(userId)
    }
    defaultMessage(): string{
        return 'userId must exist in database'
    };
}

export const ExistingUserId = (options?: ValidationOptions) => {
    return (obj: Object, propName: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: propName,
            options,
            constraints: [],
            validator: doesUserIdExists,
        });
    };
};
