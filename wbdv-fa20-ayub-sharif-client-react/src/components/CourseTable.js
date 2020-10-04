import React from 'react'
import CourseRow from "./CourseRow";

const CourseTable = ({courses, selectCourse}) =>
    (
        <table className="table">
            <tbody>
            {
                courses.map((course, key) =>
                    <CourseRow selectCourse = {selectCourse}
                               course={course} key={key}/>
                )
            }
            </tbody>
        </table>
    )

export default CourseTable