import { BetStatus } from "../bet-status.enum";
import { IsOptional, IsIn, IsNotEmpty } from "class-validator";

export class GetBetsFilterDto {

    @IsOptional()
    @IsIn([BetStatus.ACCEPTED, BetStatus.COMPLETED, BetStatus.CANCELLED, BetStatus.PENDING])
    status: BetStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}