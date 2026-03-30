import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/user.entity';
import { GetEstimateDto } from './dto/get-estimate.dto';

@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private repo: Repository<Report>) { }
    
    createEstimate({make,model,mileage,lat,lng,year }: GetEstimateDto) {
        return this.repo.createQueryBuilder()
            .select('AVG(price)','price')
            .select("*")
            .where("make=:make", { make })
            .andWhere("model=:model", { model })
            .andWhere("lat-:lat BETWEEN -5 AND 5", { lat })
            .andWhere("lng-:lng BETWEEN -5 AND 5", { lng })
            .andWhere("year-:year BETWEEN -3 AND 3", { year })
            .orderBy("ABS(mileage-:mileage)", "DESC")
            .setParameters({ mileage })
            .limit(3)
            .getRawOne();
    }

    create(report:CreateReportDto,user:User) {
        const rep = this.repo.create(report);
        rep.user = user;
        return this.repo.save(rep);
    }

    async changeApproval(id: string, approved: boolean) {
        const report = await this.repo.findOne({
            where: {
            id:parseInt(id)
            }
        })
        
        if (!report) {
            throw new NotFoundException('report not found');
        }
        report.approved = approved;
        return this.repo.save(report);
    }
}
