import axios from "axios";



const backend_url = "https://yalemajorsapi.com/api"

// const backend_url = "http://localhost:5000/api"

export default axios.create({
    withCredentials: true,
    baseURL: backend_url,

});


