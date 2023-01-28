import Searchbar from "./searchbar";
import "./styles.css"
import MajorDataService from "../services/majorRequirements.js";
import {useState, useEffect, useContext} from "react";
import {
    Card, Typography, CardActions, CardHeader,CardActionArea
} from "@mui/material";
import UserContext from "../contexts/userContext";
import UserCourseService from "../services/userCourseList.js";
import AddIcon from '@mui/icons-material/Add';

const Home = () => {

    useEffect(() => {
        if (majorData.name !== "") {
            console.log(majorData);
        }
    });

    const initialMajorState = {
        name: "", degree: "", code: "", prerequisites: [], requirements: [], electives: [], senior: [],
    };

    const [majorData, setMajorData] = useState(initialMajorState);

    const {courseList} = useContext(UserContext);

    const [userCourses, setUserCourses] = useState(courseList)


    const handleClick = (courseName) =>{
        const temp = userCourses?.includes(courseName)
            ? userCourses?.filter((name) => name !== courseName)
            : [...(userCourses ?? []), courseName];

        let difference = temp.filter(
            (x) => !userCourses.includes(x)
        );

        if (difference.length > 0) {
            console.log("adding course")
            UserCourseService.add(courseName);
        } else {
            console.log("deleting course")
            UserCourseService.delete(courseName);
        }
        setUserCourses(temp);
    }

    const Grid = () => {
        if (majorData.name !== "") {
            return (<div className="grid">
                <div className="category">
                    <h1 className="label degree">Degree</h1>
                    <div className="degree_type">
                        {majorData.degree}
                    </div>
                </div>

                <div className="category">
                    <h1 className="label prerequisites">Prerequisites</h1>
                    <div className="courses">
                        {renderRequirements(majorData.prerequisites)}
                    </div>
                </div>
                <div className="category">
                    <h1 className="label requirements">Requirements</h1>
                    <div className="courses">
                        {renderRequirements(majorData.requirements)}
                    </div>
                </div>
                <div className="category">
                    <h1 className="label">Electives</h1>
                    <div className="courses">
                        {renderRequirements(majorData.electives)}
                    </div>
                </div>
                <div className="category">
                    <h1 className="label">Senior Requirements</h1>
                    <div className="courses">
                        {renderRequirements(majorData.senior)}
                    </div>
                </div>

            </div>)
        }
    }
    const renderCard = (course, index) => {

        return (
            <Card key={index}
                      variant="outlined"
                      className={
                          userCourses.includes(course)
                              ? "course card completed"
                              : "course card"
                      } onClick = {() => handleClick(course)}>
                <CardActionArea>
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
                <AddIcon sx = {{fontSize: "small", color: "#00356b"}}></AddIcon>
            </CardActions>
        </CardActionArea>
        </Card>
            )
    }


    const renderOptions = (courses, category, index) => {
        return (<div className="options" key={index}>
            <h2 className="options subheading" key={index}>Option {index + 1}: {category} </h2>
            <div className="course options">
                {courses.map((course, ind) => {
                    return (
                        renderCard(course, ind)
                    )
                })}
            </div>
        </div>)
    }

    const renderCourses = (courses, ind) => {
        return (courses.map((course, index) => {
            if (typeof (course) == "string") {
                return (renderCard(course, index))
            } else {
                return (
                    renderOptions(course.course_list, course.category, index)
                )
            }
        }))
    }

    const renderRequirements = (requirements) => {
        return (requirements.map((item, index) => {
            return (<div className="wrapper" key={index}>
                <div className="heading">
                    <h1 className="subheading">{item.category}</h1>
                    {"required_text" in item &&
                        <h4 className="required">({item.required_text})</h4>
                    }
                    {!("required_text" in item) &&
                        <h4 className ="required">Required Courses: {item.required}</h4>}
                </div>
                <div className="course layout" key={index}>
                    {renderCourses(item.courses, index)}
                </div>
            </div>)

        }))
    }


    const get_requirements = async (major_name) => {

        MajorDataService.find(major_name)
            .then((response) => {
                setMajorData(response.data)
            })
    }


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