import express from "express";
import passport from "passport";
import User from "../models/user.js";

// Allows us to create routes specific to authentication
const router = express.Router();

/**
 * Route path for seeing if a user is logged in -> Used to grant access on the frontend
 * If authenticated then return the authentication as true, their netId, course list, and major
 */
router.get("/auth/check", (req, res) => {
    console.log(req.user)
    console.log(req.cookies)
    if (req.user) {
        User.findOne({netId: req.user}, function (err, docs) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    auth: true,
                    user: req.user,
                    courseList: docs.courseList,
                    semesterList: docs.semesterList,
                    major: docs.major,
                    creditsApplied: docs.creditsApplied,
                    emailAddress: docs.emailAddress,
                });
            }
        });
    } else {
        res.json({auth: false, id: null});
    }
});

/**
 * Path for logging in using passport-cas2 authentication
 */
router.get(
    "/auth/cas",
    passport.authenticate("cas", {failureRedirect: "api/auth/login/failed"}),
    function (req, res) {
        req.logIn(req.user, function (err) {
            if (err) {
                return next(err);
            }
            return res.redirect("https://localhost:3000");
        });
    }
);

/**
 * Path for when authentication via CAS fails
 */
router.get("/auth/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "Failed to Login with CAS",
    });
});

/**
 * Logout route
 */
router.get("/auth/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        } else {
            return res.json({success: true});
        }
    });
});

export default router;
