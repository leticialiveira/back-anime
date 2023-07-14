import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class EditUserBody {
    @IsNotEmpty()
    id: string
    user: string;
    email: string;
    @IsPhoneNumber("BR")
    phone: string;
    password: string;
}