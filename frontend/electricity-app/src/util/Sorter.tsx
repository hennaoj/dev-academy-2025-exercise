import { DailyInfo } from "../data/DailyInfo";

export function sortDataByValue(data: Array<DailyInfo>, sortBy: string) {
    const first = data[0];
    let sorted = [...data];
    if (sortBy === "date") {
        sorted.sort((a, b) => b.date.toString().localeCompare(a.date.toString()))
        if (new Date(sorted[0].date).getDate() === new Date(first.date).getDate()) {
            sorted = sorted.reverse();
        }
    } else if (sortBy === "production" || sortBy === "consumption" || sortBy === "average" ||
        sortBy === "consecutivenegatives"
    ) {
        sorted.sort((a,b) => localeCompareUndefined(a[sortBy], b[sortBy]))
        if (sorted[0][sortBy] === first[sortBy]) {
            sorted = sorted.reverse();
        }
    }
    return sorted;
}


const localeCompareUndefined = (a: number | undefined, b: number | undefined) => {
    if (a === undefined && b === undefined) return 0;
    else if (b === undefined) return 1;
    else if (a === undefined) return -1;
    else return a - b;
  }