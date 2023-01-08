import majorRequirements from "../models/majorRequirements.js";

/**
 * Class handling API for retrieving major requirements from the database
 */
export default class majorRequirementsHandler {
    static async getMajorRequirements(majorName) {
        try {
            return await majorRequirements.findOne({ name: majorName });
        } catch (e) {
            console.error(`Unable to post course: ${e}`);
            return { error: e };
        }
    }
}
