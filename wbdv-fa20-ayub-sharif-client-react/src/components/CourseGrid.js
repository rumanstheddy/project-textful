import React from 'react'
import CourseCard from "./CourseCard";

const CourseGrid = ({courses, selectCourse}) =>
    (
        <div className='card-deck'>
            { courses.map((course, key) =>
                              <CourseCard course={course}
                                          selectCourse={selectCourse}
                                          key={key}/>)}
        </div>
    )

export default CourseGrid
