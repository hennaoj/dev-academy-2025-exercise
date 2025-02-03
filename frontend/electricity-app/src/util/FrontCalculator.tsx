import { ElectricityEntry } from "../data/ElectricityEntry";

/**
 * Returns minimum and maximum spot prices of the given entries.
 * @param entries Array of ElectricityEntry
 * @returns [min, max] of hourlyprice
 */
export function findMinMaxPrices(entries: Array<ElectricityEntry>) {
    let max = 0;
    let min = 0;
    for (const entry of entries) {
        if (entry.hourlyprice) {
            if (Number(entry.hourlyprice) > max) {
                max = entry.hourlyprice;
            } else if (Number(entry.hourlyprice)< min) {
                min = entry.hourlyprice;
            }
        }
    }
    return [min, max];
}
