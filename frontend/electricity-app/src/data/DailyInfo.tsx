export type DailyInfo = {
    date: Date,
    consumption?: number,
    production?: number,
    average?: number,
    consecutivenegatives?: number
};

let storedDailyInfo: Array<DailyInfo> = [];

export function setStoredDailyInfo(data: Array<DailyInfo>) {
    storedDailyInfo = data;
}

export function getStoredDailyInfo() {
    return storedDailyInfo;
}