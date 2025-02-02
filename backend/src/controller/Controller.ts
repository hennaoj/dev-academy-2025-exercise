import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Electricitydata } from "../entity/ElectricityEntry"
import { calculateDailyInfromation } from "../util/Calculator"

export class DataController {

    private EntryRepository = AppDataSource.getRepository(Electricitydata);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.EntryRepository.find();
    }

    async dailyInfo(req: Request, res: Response, next: NextFunction) {
        var dailyInfo = [];
        await this.EntryRepository.find().then(res => {
            const entries = res;
            dailyInfo = calculateDailyInfromation(entries);
        })
        return dailyInfo;
    }

    async dayData(request: Request, response: Response, next: NextFunction) {
        return this.EntryRepository.find({
            where: {
                date: request.params.date + 'T00:00:00.000Z'
            },
        })
    }
}
