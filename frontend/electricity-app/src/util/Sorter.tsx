import { DailyInfo } from "../data/DailyInfo";

export function sortDataByValue(data: Array<DailyInfo>, sortBy: string) {
    var first = data[0];
    if (sortBy == "date") {
        data.sort((a, b) => b.date.toString().localeCompare(a.date.toString()))
    }
    if (data[0] === first) {
        data = data.reverse();
    }
    return data;
}
