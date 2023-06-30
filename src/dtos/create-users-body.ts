import { IsNotEmpty, Length } from "class-validator";


export class CreateUsersBody {
    @IsNotEmpty({
        message:'esse campo é obrigatorio'
    })
    @Length(4,15)
    user: string;
    @IsNotEmpty({
        message:'esse campo é obrigatorio'
    })
    @Length(4,30)
    email: string;

    @IsNotEmpty({
        message: 'esse campo é obrigatorio'
    })
    // @Length(9,13)
    phone: number;
    @IsNotEmpty({
        message:'esse campo é obrigatorio'
    })
    @Length(4,10)
    password: string;
}