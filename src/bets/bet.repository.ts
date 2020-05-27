import { EntityRepository, Repository } from "typeorm";
import { Bet } from "./bet.entity";
import { CreateBetDto } from "./dto/create-bet.dto";
import { User } from "src/auth/user.entity";
import { GetBetsFilterDto } from "./dto/get-bets-filter.dto";

@EntityRepository(Bet)
export class BetRepository extends Repository<Bet> {

    async createBet(createBetDto: CreateBetDto, submitter: User, opponent: User): Promise<Bet>{
        const { description, amount, title } = createBetDto;
        const bet = new Bet();
        bet.submitter = submitter;
        bet.title = title;
        bet.description = description;
        bet.amount = amount;
        bet.opponent = opponent;
        bet.status = 'PENDING'
        bet.createdAt = new Date();
        //below will change when odds are introduced
        bet.submitterToWin = amount;
        bet.opponentToWin = amount;

        await bet.save();
        delete bet.submitter;
        delete bet.opponent;

        return bet;


    }

    async getBets (user: User, filterDto: GetBetsFilterDto): Promise<Bet[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('bet');
        query.where('bet.submitter = :submitter', { submitter: user.id });

        if (status) {
            query.andWhere('bet.status = :status', { status })
        }

        if (search) {
            query.andWhere('(bet.description LIKE :search OR bet.title LIKE :search)', {search: `%${search}%`});
        }
        const bets = await query.getMany();
        return bets;

    }
    
}