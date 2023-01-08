import {Strategy as CasStrategy} from "passport-cas2";
import User from "../models/user.js";

/**
 * Configures the passport for our express backend server
 * @param {object} passport passport to be passed in to function
 */

export const passportConfig = async (passport) => {
    // Utilizes CAS Strategy from passport-cas2 in order for students to login with Yale-CAS
    passport.use(
        new CasStrategy(
            {
                version: "CAS2.0",
                casURL: "https://secure.its.yale.edu/cas",
            },
            // Callback function tries to find a user within our database. If not found create one
            async function (req, profile, done) {
                User.findOne({netId: profile.id}, async (err, doc) => {
                    const matrix = new Array(9).fill([]);
                    if (err) throw err;
                    if (doc) console.log("Existing User");
                    if (!doc) {
                        const newUser = new User({
                            netId: profile.id,
                            courseList: [],
                        });
                        await newUser.save();
                        console.log("User Created");
                    }
                });
                done(null, profile.id);
            }
        )
    );

    // Serialize user for saving session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // Used to retrieve user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

