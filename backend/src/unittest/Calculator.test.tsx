import { calculateDailyInfromation } from "../util/Calculator";
import { dataOfOneDay } from "./TestData";


test('calculating daily information from data of one day should return a list of length 1', () => {
    const list = calculateDailyInfromation(dataOfOneDay);
    expect(list.length).toBe(1);
});

export {}
