import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BetRepository } from './bet.repository';
import { CreateBetDto } from './dto/create-bet.dto';
import { UserRepository } from 'src/auth/user.repository';
import { Bet } from './bet.entity';
import { User } from 'src/auth/user.entity';
import { GetBetsFilterDto } from './dto/get-bets-filter.dto';
import { BetStatus } from './bet-status.enum';

@Injectable()
export class BetsService {
    constructor(
        @InjectRepository(BetRepository)
        private betRepository: BetRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async createBet(createBetDto: CreateBetDto, submitter: User): Promise<Bet> {
        const opponent = await this.userRepository.findOne(createBetDto.opponent);

        return await this.betRepository.createBet(createBetDto, submitter, opponent);
    }

    //need to ensure authed user matches bet user
    async getBets(user: User, filterDto: GetBetsFilterDto): Promise<Bet[]> {
        return await this.betRepository.getBets(user, filterDto)
    }

    async getBetById(id: number): Promise<Bet> {
        const found = this.betRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Bet with id:${id} not found`)
        }

        delete (await found).opponent
        delete (await found).submitter

        return found;
    }

    async updateBetStatus(id: number, status: BetStatus): Promise<Bet> {
        const bet = await this.getBetById(id);
        bet.status = status;
        switch(status) {
            case 'ACCEPTED':
                bet.acceptedAt = new Date()
                break;
            case 'COMPLETED':
                bet.completedAt = new Date()
                break;
            case 'CANCELLED':
                bet.cancelledAt = new Date()
                break;
        }
        await bet.save();
        return bet;
    }
}
