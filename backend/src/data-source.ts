import "reflect-metadata"
import { DataSource } from "typeorm"
import { Electricitydata } from "./entity/ElectricityEntry"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "academy",
    password: "academy",
    database: "electricity",
    synchronize: false,
    logging: false,
    entities: [Electricitydata],
    migrations: [],
    subscribers: [],
})
