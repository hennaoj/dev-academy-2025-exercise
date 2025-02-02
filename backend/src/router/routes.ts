import { DataController } from "../controller/Controller";

export const Routes = [{
    method: "get",
    route: "/electricity",
    controller: DataController,
    action: "all"
}, {
    method: "get",
    route: "/electricity/dates/:date",
    controller: DataController,
    action: "dayData"
}, {
    method: "get",
    route: "/electricity/dailyinfo",
    controller: DataController,
    action: "dailyInfo"
}];
