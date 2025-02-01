import { DailyInfo } from "../data/DailyInfo";

export function sortDataByValue(data: Array<DailyInfo>, sortBy: string) {
    const first = data[0];
    if (sortBy === "date") {
        data.sort((a, b) => b.date.toString().localeCompare(a.date.toString()))
        if (new Date(data[0].date).getDate() === new Date(first.date).getDate()) {
            data = data.reverse();
        }
    } else if (sortBy === "production" || sortBy === "consumption" || sortBy === "average" ||
        sortBy === "consecutivenegatives"
    ) {
        data.sort((a,b) => localeCompareUndefined(a[sortBy], b[sortBy]))
        if (data[0][sortBy] === first[sortBy]) {
            data = data.reverse();
        }
    }
    return data;
}


const localeCompareUndefined = (a: number | undefined, b: number | undefined) => {
    if (a === undefined && b === undefined) return 0;
    else if (b === undefined) return 1;
    else if (a === undefined) return -1;
    else return a - b;
  }