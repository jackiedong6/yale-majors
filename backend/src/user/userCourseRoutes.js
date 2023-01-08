import express from "express";
import userCourseHandler from "./userCourseHandler.js";

const router = express.Router();

/**
 * Route for getting a user's courseList
 */
router.post("/user/courses", async function (req, res, next) {
    try {
        const courseCode = req.body.text;
        const data = await userCourseHandler.addCourse(courseCode, req.user);
        res.json({ courseList: data.courseList });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

/**
 * Route for deleting a user's course
 */
router.delete("/user/courses", async function (req, res, next) {
    try {
        const courseCode = req.body.text;
        console.log(courseCode);
        const netId = req.user;
        await userCourseHandler.deleteCourse(netId, courseCode);
        res.json({ status: "success" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

/**
 * Route for changing a user's major
 */
router.post("/user/major", async function (req, res, next) {
    try {
        const major = req.body.text;
        const updateMajor = await userCourseHandler.updateMajor(major, req.user);
        res.json({ status: "success", new_major: { updateMajor } });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post("/user/courses/semester", async function (req, res, next) {
    try {
        const courseCode = req.query.name;
        const semester = parseInt(req.query.semester);
        console.log(courseCode, semester);
        const updateSemesterList = await userCourseHandler.addCourseToSemester(
            courseCode,
            semester,
            req.user
        );
        console.log(updateSemesterList);
        res.json({ status: "success", new_semester: { semester, courseCode } });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.delete("/user/courses/semester", async function (req, res, next) {
    try {
        const courseCode = req.query.name;
        const semester = parseInt(req.query.semester);
        const updateSemesterList = await userCourseHandler.deleteCourseFromSemester(
            courseCode,
            semester,
            req.user
        );
        res.json({ status: "success", new_semester: { semester, courseCode } });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
export default router;
