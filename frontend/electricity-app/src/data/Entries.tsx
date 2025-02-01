import { ElectricityEntry } from "./ElectricityEntry";

let globalEntries: Array<ElectricityEntry> = []

export function setGlobalEntries(data: Array<ElectricityEntry>) {
    globalEntries = data
}

export function getGlobalEntries() {
    return globalEntries
}

