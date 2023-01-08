import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";
import { passportConfig } from "./auth/authHandlers.js";
import auth_routes from "./auth/authRoutes.js";
import user_course_routes from "./user/userCourseRoutes.js";
import major_requirement_routes from "./major_requirements/majorRequirementsRoutes.js";

// Configurating the Cross-Origin Reserouce Sharing

const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000",
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
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: 10 * 60 * 100000,
        },
    })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

app.use("/api", auth_routes);
app.use("/api", major_requirement_routes);
app.use("/api", user_course_routes);

import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
///////////////////////////////////////////////////////End of Middleware//////////////////////////////////////////////////

export default app;
