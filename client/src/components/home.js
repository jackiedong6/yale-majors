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
        }
    });

    const initialMajorState = {
        name: "", degree: "", code: "", prerequisites: [], requirements: [], electives: [], senior: [],
    };

    const [majorData, setMajorData] = useState(initialMajorState);

    const {courseList} = useContext(UserContext);

    const [userCourses, setUserCourses] = useState(courseList)

    // Key as the requirement string, value as [completed, required]
    const [requirementTable, setRequirementTable] = useState({});


    const updateRequirementTable = (key, completed, required) => {
        setRequirementTable(prevTable => {
            if (key in prevTable) {
                return {
                    ...prevTable,
                    [key]: { completed: prevTable[key].completed + completed, required: prevTable[key].required + required}
                };
            }
            return {
                ...prevTable,
                [key]: { completed, required}
            };
        });
    };

    const retrieveRequirementTable = key => {
        return key in requirementTable ? requirementTable[key] : { completed: 0, required: 0 };
    };


    const handleClick = (courseName, family) => {
        const temp = userCourses?.includes(courseName) ? userCourses?.filter((name) => name !== courseName) : [...(userCourses ?? []), courseName];

        let difference = temp.filter((x) => !userCourses.includes(x));
        if (difference.length > 0) {
            UserCourseService.add(courseName);
            updateRequirementTable(family, 1, 0)

        } else {
            UserCourseService.delete(courseName);
            updateRequirementTable(family, -1, 0)
        }
        setUserCourses(temp);
    }

    const Grid = () => {
        if (majorData.name !== "") {
            return (<div className="grid">
                <div className="category">
                    <h1 className="label degree">Degree{renderProgress()}
                    </h1>
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
            const completed = retrieveRequirementTable(item.category).completed
            return (<div className="wrapper" key={index}>
                <div className="heading">
                    <h1 className="subheading">{item.category}</h1>
                        {"required_text" in item &&
                            <h4 className="required">Completed: {completed} courses / {item.required} required <br/> ({item.required_text})</h4>
                        }
                        {!("required_text" in item) &&
                            <h4 className ="required">Completed: {completed} courses / {item.required} required</h4>}
                </div>
                <div className="course layout" key={index}>
                    {renderCourses(item.courses, index, item.category)}
                </div>
            </div>)

        }))
    }
    const renderProgress = () => {
        const keys = Object.keys(requirementTable)
        let totalRequired = 0
        let totalSatisfied = 0
        keys.forEach(key => {
            const value = requirementTable[key]
            totalRequired += value.required
            if (value.completed >= value.required){
                totalSatisfied += value.required
            }
            else{
                totalSatisfied += value.completed
            }
        });
        return(<>
            <br/>
            <h className ="test">({totalSatisfied} / {totalRequired} Courses Completed)</h>

        </>)
    }

    const get_requirements = async (major_name) => {
        MajorDataService.find(major_name)
            .then((response) => {
                if (Object.keys(response.data).length > 0) {
                    setRequirementTable({})
                    const course_count = (requirements, flag) => {
                        requirements.forEach((item) => {
                            let curr_count = 0

                            item.courses.forEach((course) => {
                                if ("course_code" in item.courses[0]) {
                                    if (userCourses.includes(course.course_code)) {
                                        curr_count += 1
                                    }
                                } else {
                                    item.courses.forEach((option) => {
                                        if (userCourses.includes(option.course_code)) {
                                            curr_count +=1
                                        }
                                    })
                                }
                            })
                            if(parseInt(flag) === 0){
                                updateRequirementTable(item.category, curr_count, item.required)
                            }
                        })
                    }

                    course_count(response.data.requirements, 0)
                    course_count(response.data.prerequisites, 1)
                    course_count(response.data.electives, 0)
                    course_count(response.data.senior, 0)
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