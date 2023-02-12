import Searchbar from "./searchbar";
import "./styles.css"
import MajorDataService from "../services/majorRequirements.js";
import {useState, useEffect, useContext} from "react";
import {
    Card, Typography, CardActions, CardHeader, CardActionArea,
} from "@mui/material";

import UserContext from "../contexts/userContext";
import UserCourseService from "../services/userCourseList.js";
import AddIcon from '@mui/icons-material/Add';


const Home = () => {
    useEffect(() => {
        if (majorData.name !== "") {
            // console.log(majorData);
        }
    });

    const initialMajorState = {
        name: "", degree: "", code: "", prerequisites: [], requirements: [], electives: [], senior: [],
    };

    const [majorData, setMajorData] = useState(initialMajorState);

    const {courseList} = useContext(UserContext);

    const [userCourses, setUserCourses] = useState(courseList)
    const [table, setTable] = useState({});
    const [totalRequired, setTotalRequired] = useState(0)
    const [totalSatisfied, setTotalSatisfied] = useState(0)


    const insert = (key, value = 1) => {
        setTable(prevTable => ({
            ...prevTable, [key]: key in prevTable ? prevTable[key] + value : value
        }));
    };

    const retrieve = key => {
        return key in table ? table[key] : 0;
    };


    const handleClick = (courseName, family) => {
        const temp = userCourses?.includes(courseName) ? userCourses?.filter((name) => name !== courseName) : [...(userCourses ?? []), courseName];

        let difference = temp.filter((x) => !userCourses.includes(x));
        if (difference.length > 0) {
            // console.log("adding course")
            UserCourseService.add(courseName);
            insert(family)
            // const prev = course_count.getItem(family)
            // course_count.setItem(family, prev + 1)
        } else {
            // console.log("deleting course")
            UserCourseService.delete(courseName);
            insert(family, -1)
            // const prev = course_count.getItem(family)
            // course_count.setItem(family, prev - 1)
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
    const renderCard = (course, index, family) => {
        return (<Card key={index}
                      variant="outlined"
                      className={userCourses.includes(course.course_code) ? "course card completed" : "course card"

                      } onClick={() => handleClick(course.course_code, family)}>
            <CardActionArea>
                <CardHeader
                    sx={{display: "flex", flex: 1}}
                    title={<div className="course_text">
                        <Typography noWrap
                                    className="course title"
                                    sx={{
                                        marginLeft: 'auto',
                                        marginRight: 'auto',
                                        alignContent: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        fontFamily: "YaleFont",
                                        color: "#00356b",
                                        textOverflow: "ellipsis",
                                    }}
                        >
                            {course.course_title}
                            <br/>
                            {course.course_code}
                        </Typography></div>}

                ></CardHeader>
                <CardActions disableSpacing sx={{
                    alignSelf: 'stretch', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start',
                }}
                >

                    <AddIcon sx={{fontSize: "small", color: "#00356b"}}></AddIcon>
                </CardActions>
            </CardActionArea>
        </Card>)
    }


    const renderOptions = (courses, category, index, family) => {
        return (<div className="options" key={index}>
            <h2 className="options subheading" key={index}>Option {index + 1}: {category} </h2>
            <div className="course options">
                {courses.map((course, ind) => {
                    return (renderCard(course, ind, family))
                })}
            </div>
        </div>)
    }

    const renderCourses = (courses, ind, family) => {
        return (courses.map((course, index) => {
            if ("course_code" in courses[index]) {
                return (renderCard(course, index, family))
            } else {
                return (renderOptions(course.course_list, course.category, index, family))
            }
        }))
    }

    const renderRequirements = (requirements) => {
        return (requirements.map((item, index) => {
            const completed = retrieve(item.category)
            return (<div className="wrapper" key={index}>
                <div className="heading">
                    <h1 className="subheading">{item.category}</h1>
                        <h4 className="required">Completed: {completed} courses / {item.required} required</h4>
                </div>
                <div className="course layout" key={index}>
                    {renderCourses(item.courses, index, item.category)}
                </div>
            </div>)

        }))
    }


    const get_requirements = async (major_name) => {
        MajorDataService.find(major_name)
            .then((response) => {
                if (Object.keys(response.data).length > 0) {
                    let category_array = []
                    const course_count = async (requirements) => {
                        let total_requirements = 0
                        requirements.forEach((item) => {
                            category_array.push(item.category)
                            total_requirements += item.required
                            const category = item.category
                            item.courses.forEach((course) => {
                                if ("course_code" in item.courses[0]) {
                                    if (userCourses.includes(course.course_code)) {
                                        insert(category)
                                    }
                                } else {
                                    item.courses.forEach((option) => {
                                        if (userCourses.includes(option.course_code)) {
                                            insert(category)
                                        }
                                    })
                                }
                            })
                        })
                        return total_requirements
                    }
                    let num_requirements = 0
                    num_requirements += course_count(response.data.requirements)
                    course_count(response.data.prerequisites)
                    num_requirements += course_count(response.data.electives)
                    num_requirements+= course_count(response.data.senior)
                    setTotalRequired(num_requirements)
                    const progress_count = (requirements) => {
                        let satisfied = 0
                        requirements.forEach((item) => {
                            let completed = retrieve(item.category)

                            if (completed >= item.required){
                                satisfied += item.required
                            }
                            else{
                                satisfied += completed
                            }
                        })
                        return satisfied
                    }
                    let classes_satisfied = 0
                    classes_satisfied += progress_count(response.data.requirements)
                    classes_satisfied += progress_count(response.data.electives)
                    classes_satisfied += progress_count(response.data.senior)
                    setTotalSatisfied( classes_satisfied)
                    setMajorData(response.data)

                } else {
                    setMajorData(initialMajorState);
                    return (<div className="grid">
                        <h1>{major_name} is not currently supported</h1>
                    </div>)

                }

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