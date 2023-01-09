import Searchbar from "./searchbar";
import "./styles.css"
import MajorDataService from "../services/majorRequirements.js";
import {useState, useEffect} from "react";
import {
    Card, Typography, Checkbox, CardActions, CardHeader,
} from "@mui/material";

const Home = () => {

    const renderCard = (course, index) => {
        return (<Card key={index}
                      variant="outlined"
                      className="course card"
        >
            <CardHeader
                sx={{display: "flex", flex: 1}}
                title={<Typography
                    className="course title"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontFamily: "Computer Modern Sans, sans-serif",
                        color: "#00356b"
                    }}
                >
                    {course}
                </Typography>}
            ></CardHeader>
            <CardActions disableSpacing sx={{
                alignSelf: 'stretch', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',
            }}
            >
                <Checkbox size="small" color="primary">
                </Checkbox>
            </CardActions>
        </Card>)
    }


    const renderOptions = (courses, category, index) => {
        return (<div className ="options" key ={index}>
            <h2 className="options subheading" key = {index}>Option {index + 1}: {category} </h2>
            <div className="course options">
            {courses.map((course, ind) => {
                return (<Card key={ind}
                              variant="outlined"
                              className="course card"
                >
                    <CardHeader
                        sx={{display: "flex", flex: 1}}
                        title={<Typography
                            className="course title"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                fontFamily: "Computer Modern Sans, sans-serif",
                                color: "#00356b"
                            }}
                        >
                            {course}
                        </Typography>}
                    ></CardHeader>
                    <CardActions disableSpacing sx={{
                        alignSelf: 'stretch', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',
                    }}
                    >
                        <Checkbox size="small" color="primary">
                        </Checkbox>
                    </CardActions>
                </Card>)
            })}
            </div>
        </div>)
    }

    const renderCourses = (courses, ind) => {
        return (courses.map((course, index) => {
            if (typeof (course) == "string") {
                return (renderCard(course, index))
            } else {
                return (renderOptions(course.course_list, course.category, index))
            }
        }))
    }

    const renderRequirements = (requirements) => {
        return (requirements.map((item, index) => {
            return (<div className="test" key={index}>
                <h1 className="subheading">{item.category}</h1>
                <div className="course layout" key={index}>
                    {renderCourses(item.courses, index)}
                </div>
            </div>)

        }))
    }

    const Grid = () => {
        if (major_data.name !== "") {
            return (<div className="grid">
                <div className="category">
                    <h1 className="label degree">Degree</h1>
                    <div className="degree_type">
                        {major_data.degree}
                    </div>
                </div>

                <div className="category">
                    <h1 className="label prerequisites">Prerequisites</h1>
                    <div className="courses">
                        {renderRequirements(major_data.prerequisites)}
                    </div>
                </div>
                <div className="category">
                    <h1 className="label requirements">Requirements</h1>
                    <div className="courses">
                        {renderRequirements(major_data.requirements)}
                    </div>
                </div>
                <div className="category">
                    <h1 className="label">Electives</h1>
                    <div className="courses">
                        {renderRequirements(major_data.electives)}
                    </div>
                </div>
                <div className="category">
                    <h1 className="label">Senior Requirements</h1>
                    <div className="courses">
                        {renderRequirements(major_data.senior)}
                    </div>
                </div>

            </div>)
        }
    }

    const initialMajorState = {
        name: "", degree: "", code: "", prerequisites: [], requirements: [], electives: [], senior: [],
    };

    const [major_data, set_major_data] = useState(initialMajorState);

    const get_requirements = async (major_name) => {

        MajorDataService.find(major_name)
            .then((response) => {
                set_major_data(response.data)
            })
    }

    useEffect(() => {
        if (major_data.name !== "") {
            console.log(major_data);
        }
    });


    return (<>
            <Searchbar onChange={(major_name) => {
                get_requirements(major_name.majorName)
            }}
            ></Searchbar>
            {Grid()}
        </>

    )
}
export default Home