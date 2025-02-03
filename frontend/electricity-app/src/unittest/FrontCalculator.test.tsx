import { expect, test } from "vitest";
import { findMinMaxPrices } from "../util/FrontCalculator";
import { dataOfOneDay } from "./TestData";

test('sorting data by consumption', () => {
    const list = findMinMaxPrices(dataOfOneDay)
    expect(list[0]).toBe(0);
    expect(list[1]).toBe(25.922);
});
