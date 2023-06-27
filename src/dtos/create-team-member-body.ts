import { IsNotEmpty, Length } from "class-validator";

export class CreateTeamMemberBody {
    @IsNotEmpty()
    //diz que é obrigatorio digitar o valor de name 
    @Length(5,100)
    name: string;
    @IsNotEmpty(
        {
            message:'esqueceu da function, bobinho!'
        }
    )
        // message: 'pode passar o valor da mensagem de erro',
    // }
    function: string;
    //diz que é obrigatorio digitar o valor de function
}