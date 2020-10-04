import React from 'react'
import ModuleList from "./ModuleList";

export default class CourseEditor {
    render() {
        return (
        <div className="row">
            <h3>{this.props.course.title}</h3>
            <div className="col-3">
                <ModuleList modules={this.props.course.modules}/></div>
            <div className="col-3">
                {

                }
            </div>
        </div>
        )
    }
}