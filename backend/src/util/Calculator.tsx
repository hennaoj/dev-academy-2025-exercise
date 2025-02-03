import { Electricitydata } from "../entity/ElectricityEntry";

type Pair = [Date, number];
export type DailyInfo = {
    date: Date,
    consumption?: number,
    production?: number,
    average?: number,
    consecutivenegatives?: number
};

/**
 * Takes in hourly electricity information and calculates the sums of electricity
 * consumption and production, average electricity price of the day and maximum
 * consecutive negative price hours of the day.
 * @param data Array of Electricitydata
 * @returns Array of DailyInfo
*/
export function calculateDailyInfromation(data: Electricitydata[]) {
    data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    var dailyList: Array<DailyInfo> = [];
    const dates: Array<Date> = [];
    for (var value of data) {
        var previousEntryDate = new Date().getTime();
        var currentEntryDate = new Date(value.date);
        if (dailyList.length > 0) {
            previousEntryDate = new Date(dailyList[dailyList.length - 1].date).getTime();
        }

        if ((dailyList.length === 0 || previousEntryDate !== currentEntryDate.getTime())) {
            dailyList.push({
                date:currentEntryDate,
                consumption:value.consumptionamount/1000000,
                production:value.productionamount/1000,
                average:Number(value.hourlyprice)
            })
            dates.push(currentEntryDate);
        } else {
            const updatedInfo = {
                date: dailyList[dailyList.length - 1].date,
                consumption: dailyList[dailyList.length - 1].consumption +
                    value.consumptionamount/1000000,
                production: dailyList[dailyList.length - 1].production + value.productionamount/1000,
                average: (dailyList[dailyList.length - 1].average + Number(value.hourlyprice))/2,
            }
            dailyList[dailyList.length - 1] = updatedInfo;
        };
    };

    const consecutiveHours = calcConsecutiveNegativeHoursPerDay(data);
    for (var item of consecutiveHours) {
        const index = getDateIndex(dates, item[0])
        if (index !== -1) {
            const newEntry = {
                date: dailyList[index].date,
                consumption: dailyList[index].consumption,
                production: dailyList[index].production,
                average: dailyList[index].average,
                consecutivenegatives:item[1]
            }
            dailyList[index] = newEntry;
        };
    };
    return dailyList;
}

function getDateIndex(array: Array<Date>, value: Date) {
    return array.findIndex(item => {
        return new Date(item).getTime() === new Date(value).getTime();
    });
}

/**
 * Calculates the maximum amount of consecutive negative price hours per day.
 * sorted by that value.
 * @param data Array of Electricitydata
 * @returns Array of [Date, number] pairs where number is the max amount of consecutive
 * negative price hours for the respective date.
 */
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
                checker.push([currentEntryDate, 1]);
            } else if (prevNegative && previousEntryDate === currentEntryDate.getTime()) {
                checker[checker.length - 1][1] = checker[checker.length - 1][1] + 1;
            } else {
                checker.push([currentEntryDate, 1]);
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
