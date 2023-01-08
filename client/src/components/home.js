import Searchbar from "./searchbar";
import "./styles.css"
import MajorDataService from "../services/majorRequirements.js";
import {useState} from "react";

const Home = () =>{

    const initialMajorState = {
        majorName: "",
        majorCode: "",
        prerequisites: [],
        requirements:[],
        electives:[],
        senior:[],
    };

    const [major_data, set_major_data] = useState(initialMajorState);

    const get_requirements = async (major_name) =>{

        MajorDataService.find(major_name)
            .then((response) => {
                console.log(major_name)
                set_major_data(response.data)
                console.log(response.data)
            })
    }


    return(
        <Searchbar onChange={(major_name) => {
            get_requirements(major_name.majorName)
        }}
        ></Searchbar>


    )
}
export default Home