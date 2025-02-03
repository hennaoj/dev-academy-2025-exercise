import { expect, test } from "vitest";
import { sortDataByValue } from "../util/Sorter";
import { dailyDataOfOneMonth } from "./TestData";

test('sorting data by consumption', () => {
    const list = sortDataByValue(dailyDataOfOneMonth, "consumption");
    expect(list[0].consumption).toBe(120.4);
});

test('sorting data that is already sorted reverts the list', () => {
    let list = sortDataByValue(dailyDataOfOneMonth, "consumption");
    expect(list[0].consumption).toBe(120.4);
    list = sortDataByValue(list, "consumption");
    expect(list[0].consumption).toBe(undefined);
});
