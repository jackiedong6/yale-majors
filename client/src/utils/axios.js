import axios from "axios";



const backend_url = "https://yalemajorsapi.com/api"

export default axios.create({
    withCredentials: true,
    baseURL: backend_url,

});


