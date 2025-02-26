import express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./router/routes"

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    const cors = require('cors')
    app.use(bodyParser.json())
    app.use(cors())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // start express server
    app.listen(3003)

    console.log("Express server has started on port 3003. Open http://localhost:3003/electricity to see results")

}).catch(error => console.log(error))
