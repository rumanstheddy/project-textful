import React from 'react'
import {Link} from 'react-router-dom'

const CourseRow = ({course, selectCourse}) =>
    (
        <tr>
            <td>
                <Link to={`/course/edit/${course._id}`}
                      onClick= {() => selectCourse(course)}>
                    {course.title}
                </Link>
            </td>
        </tr>
    )

export default CourseRow