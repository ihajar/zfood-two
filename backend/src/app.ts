import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import restaurantsRoutes from "./routes/restaurants";
import usersRoutes from "./routes/users";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import cors from "cors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGODB_CONNECTION_STRING
    })
}));

app.use("/api/users", usersRoutes);
app.use("/api/restaurants", restaurantsRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "an unknown error occured";
    let statusCode = 500;
    if(isHttpError(error)){
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;