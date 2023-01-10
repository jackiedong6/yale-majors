import axios from "../utils/axios.js";

class UserCourseService {
    async add(name) {
        const body = { text: name };
        await axios.post("/user/courses", body, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    }
    async delete(name) {
        await axios.delete("/user/courses", {
            data: { text: name },
        });
    }
}

export default new UserCourseService();
