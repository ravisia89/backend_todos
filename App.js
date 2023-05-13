import express from "express";
import Router from "./mainRouter.js";
import cookieParser from "cookie-parser";
import { errHandler, errMiddleware } from "./middlewares/error.js";
import { JWT_SECRET } from "./data/env.js";
import cors from "cors";
import { corsOptions } from "./data/cors.js";

export const App = express()

//middlewares
App.use(express.json())
App.use(cookieParser(JWT_SECRET, { sameSite: 'none', secure: true, httpOnly: true }))
App.use(cors(corsOptions))

//Router
App.use("/api/v1", Router)

//error handling
App.use((req, res, next) => next(new errHandler("Invalid Request", 404)))
App.use(errMiddleware)