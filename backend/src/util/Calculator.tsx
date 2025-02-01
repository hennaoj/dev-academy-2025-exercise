import { Electricitydata } from "../entity/ElectricityEntry";


type Pair = [Date, number];
export type DailyInfo = {
    date: Date,
    consumption?: number,
    production?: number,
    average?: number,
    consecutivenegatives?: number
};

export function calculateDailyInfromation(data: Electricitydata[]) {
    const consumption = calcConsumptionPerDay(data);
    const production = calcProductionPerDay(data);
    const averagePrice = calcAveragePricePerDay(data);
    const consecutiveHours = calcConsecutiveNegativeHoursPerDay(data);

    const list: Array<DailyInfo> = []
    const dates: Array<Date> = []

    for (var val of consumption) {
        list.push({date:val[0], consumption:parseFloat(val[1].toFixed(1))})
        dates.push(val[0])
    }

    for (var prod of production) {
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
        };
    };

    for (var ave of averagePrice) {
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
        };
    };

    for (var cons of consecutiveHours) {
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
        };
    };

    list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    console.log(list);
    return list;
}

function isInArray(array: Array<Date>, value: Date) {
    return array.findIndex(item => {return new Date(item).getTime() === new Date(value).getTime()});
}

function calcConsumptionPerDay(data: Electricitydata[]) {
    var list: Array<Pair> = [];
    for (var val of data) {
        var previousEntryDate = new Date().getTime();
        var currentEntryDate = new Date(val.date);
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
        }
        if ((list.length === 0 || previousEntryDate !== currentEntryDate.getTime()) && val.consumptionamount) {
            list.push([currentEntryDate, val.consumptionamount/1000000])
        } else if (list.length > 0 && val.consumptionamount) {
            list[list.length - 1][1] = list[list.length - 1][1] + val.consumptionamount/1000000;
        };
    };
    return list;
};

function calcProductionPerDay(data: Electricitydata[]) {
    var list: Array<Pair> = [];
    for (var val of data) {
        var previousEntryDate = new Date().getTime();
        var currentEntryDate = new Date(val.date);
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
        }
        if ((list.length === 0 || previousEntryDate !== currentEntryDate.getTime()) && val.productionamount) {
            list.push([currentEntryDate, val.productionamount/1000])
        } else if (list.length > 0 && val.productionamount) {
            list[list.length - 1][1] = list[list.length - 1][1] + val.productionamount/1000
        };
    };
    return list;
}

function calcAveragePricePerDay(data: Electricitydata[]) {
    var list: Array<Pair> = [];
    for (var val of data) {
        var previousEntryDate = new Date().getTime();
        var currentEntryDate = new Date(val.date);
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
        }
        if ((list.length === 0 || previousEntryDate !== currentEntryDate.getTime()) && val.hourlyprice) {
            list.push([currentEntryDate, val.hourlyprice/1])
        } else if (list.length > 0 && val.hourlyprice) {
            list[list.length - 1][1] = (list[list.length - 1][1] + val.hourlyprice/1) / 2
        };
    };
    return list;
}

function calcConsecutiveNegativeHoursPerDay(data: Electricitydata[]) {
    var checker: Array<Pair> = [];
    var prevNegative = false;
    for (var val of data) {
        if (val.hourlyprice && val.hourlyprice < 0) {
            var previousEntryDate = new Date().getTime();
            var currentEntryDate = new Date(val.date);
            if (checker.length > 0) {
                previousEntryDate = new Date(checker[checker.length - 1][0]).getTime();
            }
            if (checker.length === 0 || previousEntryDate !== currentEntryDate.getTime()) {
                checker.push([currentEntryDate, 1])
            } else if (prevNegative && previousEntryDate === currentEntryDate.getTime()) {
                checker[checker.length - 1][1] = checker[checker.length - 1][1] + 1
            } else {
                checker.push([currentEntryDate, 1])
            }
            prevNegative = true;
        } else {
            prevNegative = false;
        };
    };

    var list = [];
    for (var item of checker) {
        var previousEntryDate = new Date().getTime();
        var currentEntryDate = new Date(item[0]);
        var previousMax = 0;
        if (list.length > 0) {
            previousEntryDate = new Date(list[list.length - 1][0]).getTime();
        }
        if (list.length === 0 || previousEntryDate !== currentEntryDate.getTime()) {
            list.push(item);
            previousMax = item[1];
        } else if (previousEntryDate === currentEntryDate.getTime() && item[1] < previousMax) {
            list[list.length - 1] = item;
            previousMax = item[1];
        }
    };
    return list;
};
