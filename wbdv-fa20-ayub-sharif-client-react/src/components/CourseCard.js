import React from "react"
import {Link} from "react-router-dom";

const CourseCard = ({course, selectCourse}) =>
    (
        <div className="card" styles={{width: '18rem'}}>
            <img className="card-img-top"
             src="https://picsum.photos/300/200"/>
             <div className="card-body">
                 <h5 className="card-title">Card title</h5>
                 <p className="card-text">Card text.</p>
                 <Link className="btn btn-primary"
                       onClick={() => selectCourse(course)}
                       to={`/course/edit/${course._id}`}>More...</Link>
             </div>
        </div>
    )

export default CourseCard