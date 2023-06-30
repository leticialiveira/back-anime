import { IsNotEmpty } from "class-validator";

export class CreatePostVideoBody{
    @IsNotEmpty()
    comment: String;
    @IsNotEmpty()
    authorId: String;
}