import { Controller, UseGuards, Post, UsePipes, ValidationPipe, Body, Get, Param, Query, Patch, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BetsService } from './bets.service';
import { CreateBetDto } from './dto/create-bet.dto';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
import { Bet } from './bet.entity';
import { GetBetsFilterDto } from './dto/get-bets-filter.dto';
import { BetStatus } from './bet-status.enum';
import { BetStatusValidationPipe } from './bet-status-validation.pipe';

@Controller('bets')
@UseGuards(AuthGuard())
export class BetsController {
    constructor(private betsService: BetsService) {}

    @Get()
    getBets(@GetUser() user: User, @Query(ValidationPipe) filterDto: GetBetsFilterDto): Promise<Bet[]> {
        return this.betsService.getBets(user, filterDto)
    }

    @Get('/:id')
    getBetById(@Param('id') id: number) {
        return this.betsService.getBetById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createBet(@Body() createBetDto: CreateBetDto, @GetUser() submitter: User): Promise<Bet> {
        return this.betsService.createBet(createBetDto, submitter)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id', ParseIntPipe) id: number, @Body('status', BetStatusValidationPipe) status: BetStatus): Promise<Bet> {
        return this.betsService.updateBetStatus(id, status);
    }

}
