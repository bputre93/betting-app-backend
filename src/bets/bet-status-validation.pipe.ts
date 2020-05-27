import { PipeTransform, BadRequestException } from "@nestjs/common";
import { BetStatus } from "./bet-status.enum";

export class BetStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        BetStatus.ACCEPTED,
        BetStatus.COMPLETED,
        BetStatus.CANCELLED
    ];

    transform(value: any) {
        value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
        throw new BadRequestException(`"${value}" is an invalid status`)
    }

    return value
}

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}