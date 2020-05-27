import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class CreateBetDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    opponent: number;
}