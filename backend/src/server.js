import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import { passportConfig } from "./auth/authHandlers.js";
import auth_routes from "./auth/authRoutes.js";
import user_course_routes from "./user/userCourseRoutes.js";
import major_requirement_routes from "./major_requirements/majorRequirementsRoutes.js";
import cookieParser from "cookie-parser";


const corsOptions = {
    credentials: true,
    origin: "https://localhost:3000",
    optionsSuccessStatus: 200,
};

// Express backend for web application
const app = express();

app.set("trust proxy", true);

/////////////////////////////////////////////////////// Middleware //////////////////////////////////////////////////
app.use(cors(corsOptions));

app.use(
    session({
        secret: "somethingsecretgoeshere",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: true,
            maxAge: 10 * 60 * 100000,
            sameSite: 'None'

        },
    })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());

passportConfig(passport);

app.use("/api", auth_routes);
app.use("/api", major_requirement_routes);
app.use("/api", user_course_routes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app;
