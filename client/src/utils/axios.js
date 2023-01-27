import axios from "axios";



// const backend_url = "http://54.221.107.250:5000/api"

// const backend_url = "https://localhost:5000/api"

const backend_url = "https://yalemajorsapi.com/api"

export default axios.create({
    withCredentials: true,
    baseURL: backend_url,

});


