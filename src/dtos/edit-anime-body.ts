import { IsNotEmpty } from "class-validator";

export class EditAnimeBody {
    @IsNotEmpty()
    id: string
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