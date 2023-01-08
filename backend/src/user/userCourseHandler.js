import User from "../models/user.js";

/**
 * Class for users to alter their courses
 */
export default class userCourseHandler {
    /**
     * Adds course with name @param courseName to courselist of user with @param netId
     */
    static async addCourse(courseName, netId) {
        try {
            return await User.findOneAndUpdate(
                { netId: netId },
                { $addToSet: { courseList: courseName }, $inc: { creditsApplied: 1 } },
                { upsert: true, returnOriginal: false }
            );
        } catch (e) {
            console.error(`Unable to post course: ${e}`);
            return { error: e };
        }
    }

    static async addCourseToSemester(courseName, semesterNumber, netId) {
        const mongooseLink = "semesterList." + semesterNumber;
        try {
            return await User.updateOne(
                { nedId: netId },
                {
                    $addToSet: {
                        [mongooseLink]: courseName,
                    },
                }
            );
        } catch (e) {
            console.error(`Unable to post semesterCourse: ${e}`);
            return { error: e };
        }
    }
    /**
     * Updates major with @param major to courselist of user with @param netId
     */
    static async updateMajor(major, netId) {
        try {
            return await User.updateOne({ netId: netId }, { major: major });
        } catch (e) {
            console.error(`Unable to post major ${e}`);
            return { error: e };
        }
    }

    /**
     * Deletes course with name @param courseName to courselist of user with @param netId
     */
    static async deleteCourse(netId, courseName) {
        try {
            const deleteCourse = await User.updateOne(
                { netId: netId },
                {
                    $pullAll: {
                        courseList: [courseName],
                    },
                    $inc: {
                        creditsApplied: -1,
                    },
                }
            );
            return deleteCourse;
        } catch (e) {
            console.error(`Unable to delete course: ${e}`);
            return { error: e };
        }
    }

    static async deleteCourseFromSemester(courseName, semesterNumber, netId) {
        const mongooseLink = "semesterList." + semesterNumber;
        console.log(mongooseLink);
        try {
            return await User.updateOne(
                { nedId: netId },
                { $pull: { [mongooseLink]: courseName } }
            );
        } catch (e) {
            console.error(`Unable to post semesterCourse: ${e}`);
            return { error: e };
        }
    }
}
