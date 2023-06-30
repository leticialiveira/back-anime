import { IsNotEmpty } from "class-validator";

export class CreateAnimeBody{
    @IsNotEmpty()
    img: string;
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    category: string;
    @IsNotEmpty()
    genero: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    userId: string;
}