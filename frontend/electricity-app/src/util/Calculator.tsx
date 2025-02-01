import { DailyInfo } from "../data/DailyInfo";
import { ElectricityEntry } from "../data/ElectricityEntry";

type Pair = [Date, number];

export function calculateDailyInfromation(data: ElectricityEntry[]) {
    const consumption = calcConsumptionPerDay(data);
    const production = calcProductionPerDay(data);
    const averagePrice = calcAveragePricePerDay(data);
    const consecutiveHours = calcConsecutiveNegativeHoursPerDay(data);

    const list: Array<DailyInfo> = []
    const dates: Array<Date> = []

    for (const val of consumption) {
        list.push({date:val[0], consumption:parseFloat(val[1].toFixed(1))})
        dates.push(val[0])
    }

    for (const prod of production) {
        const index = isInArray(dates, prod[0])
        if (index !== -1) {
            const newEntry = {
                date: list[index].date,
                consumption: list[index].consumption,
                production: parseFloat(prod[1].toFixed(2))
            }
            list[index] = newEntry
        } else {
            list.push({date:prod[0], production:parseFloat(prod[1].toFixed(2))});
            dates.push(prod[0]);
        }
    }

    for (const ave of averagePrice) {
        const index = isInArray(dates, ave[0])
        if (index !== -1) {
            const newEntry = {
                date: list[index].date,
                consumption: list[index].consumption,
                production: list[index].production,
                average: parseFloat(ave[1].toFixed(2))
            }
            list[index] = newEntry
        } else {
            list.push({date:ave[0], average:parseFloat(ave[1].toFixed(2))});
            dates.push(ave[0]);
        }
    }

    for (const cons of consecutiveHours) {
        const index = isInArray(dates, cons[0])
        if (index !== -1) {
            const newEntry = {
                date: list[index].date,
                consumption: list[index].consumption,
                production: list[index].production,
                average: list[index].average,
                consecutivenegatives:cons[1]
            }
            list[index] = newEntry
        } else {
            list.push({date:cons[0], consecutivenegatives:cons[1]});
            dates.push(cons[0]);
        }
    }

    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return list;
}

function isInArray(array: Array<Date>, value: Date) {
    return array.findIndex(item => {return new Date(item).getTime() === new Date(value).getTime()});
}

function calcConsumptionPerDay(data: ElectricityEntry[]) {
    const list: Array<Pair> = [];
    for (const val of data) {
        let previousEntryDate = new Date().getTime();
        let currentEntryDate = new Date().getTime();
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
            currentEntryDate = new Date(val.date).getTime();
        }
        if ((list.length === 0 || previousEntryDate !== currentEntryDate) && val.consumptionamount) {
            list.push([val.date, val.consumptionamount/1000000])
        } else if (list.length > 0 && val.consumptionamount) {
            list[list.length - 1][1] = list[list.length - 1][1] + val.consumptionamount/1000000;
        }
    }
    return list;
}

function calcProductionPerDay(data: ElectricityEntry[]) {
    const list: Array<Pair> = [];
    for (const val of data) {
        let previousEntryDate = new Date().getTime();
        let currentEntryDate = new Date().getTime();
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
            currentEntryDate = new Date(val.date).getTime();
        }
        if ((list.length === 0 || previousEntryDate !== currentEntryDate) && val.productionamount) {
            list.push([val.date, val.productionamount/1000])
        } else if (list.length > 0 && val.productionamount) {
            list[list.length - 1][1] = list[list.length - 1][1] + val.productionamount/1000
        }
    }
    return list;
}

function calcAveragePricePerDay(data: ElectricityEntry[]) {
    const list: Array<Pair> = [];
    for (const val of data) {
        let previousEntryDate = new Date().getTime();
        let currentEntryDate = new Date().getTime();
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
            currentEntryDate = new Date(val.date).getTime();
        }
        if ((list.length === 0 || previousEntryDate !== currentEntryDate) && val.hourlyprice) {
            list.push([val.date, val.hourlyprice/1])
        } else if (list.length > 0 && val.hourlyprice) {
            list[list.length - 1][1] = (list[list.length - 1][1] + val.hourlyprice/1) / 2
        }
    }
    return list;
}

function calcConsecutiveNegativeHoursPerDay(data: ElectricityEntry[]) {
    const checker: Array<Pair> = [];
    let prevNegative = false;
    for (const val of data) {
        if (val.hourlyprice && val.hourlyprice < 0) {
            let previousEntryDate = new Date().getTime();
            const currentEntryDate = new Date(val.date).getTime();
            if (checker.length > 0) {
                previousEntryDate = new Date(checker[checker.length - 1][0]).getTime();
            }
            if (checker.length === 0 || previousEntryDate !== currentEntryDate) {
                checker.push([val.date, 1])
            } else if (prevNegative && previousEntryDate === currentEntryDate) {
                checker[checker.length - 1][1] = checker[checker.length - 1][1] + 1
            } else {
                checker.push([val.date, 1])
            }
            prevNegative = true;
        } else {
            prevNegative = false;
        }
    }

    const list = [];
    for (const item of checker) {
        let previousEntryDate = new Date().getTime();
        const currentEntryDate = new Date(item[0]).getTime();
        let previousMax = 0;
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
        }
        if (list.length === 0 || previousEntryDate !== currentEntryDate) {
            list.push(item);
            previousMax = item[1];
        } else if (previousEntryDate === currentEntryDate && item[1] < previousMax) {
            list[list.length - 1] = item;
            previousMax = item[1];
        }
    }
    return list;
}
