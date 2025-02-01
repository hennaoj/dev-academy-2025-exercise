import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Electricitydata } from "../entity/ElectricityEntry"
import { calculateDailyInfromation } from "../util/Calculator"

export class DataController {

    private entryRepository = AppDataSource.getRepository(Electricitydata)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.entryRepository.find()
    }

    dailyInfo(req: Request, res: Response, next: NextFunction) {
        this.entryRepository.find().then(res => {
            const entries = res;
            const dailyInfo = calculateDailyInfromation(entries);
            console.log(dailyInfo);
            return dailyInfo;
        })
    }

    async dayData(request: Request, response: Response, next: NextFunction) {
        console.log(request.date);
        return this.entryRepository.find({
            where: {
                date: request.params.date + 'T00:00:00.000Z'
            },
        })
    }
}