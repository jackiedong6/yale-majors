import express from "express";
import majorRequirementsHandler from "./majorRequirementsHandler.js";

const router = express.Router();

/**
 * Path to get major requirements
 * Example http://{BACKEND_SERVER}/api/major/requirements?name="CPSC 323"
 */
router.get("/major/requirements", async function (req, res, next) {
    try {
        const major = await majorRequirementsHandler.getMajorRequirements(
            req.query.name
        );
        let response;
        if (major) {
            response = {
                name: major.name,
                code: major.code,
                degree: major.degree,
                prerequisites:major.prerequisites,
                requirements: major.requirements,
                electives: major.electives,
                senior: major.senior,
            };
        } else {
            response = {};
        }
        res.json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
