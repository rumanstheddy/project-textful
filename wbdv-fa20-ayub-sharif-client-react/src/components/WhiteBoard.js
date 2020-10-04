import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import CourseTable from "./CourseTable";
import CourseGrid from "./CourseGrid";
import axios from 'axios';
import CourseEditor from "./CourseEditor";


export default class WhiteBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            selectedCourse: null,
            courses: []
        }
    }

    componentDidMount() {
        axios.get('https://wbdv-generic-server.heroku.com/api/asharif/courses')
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        courses: result,
                        selectedCourse: result.data[0]
                                  })
                }
            )
    }

    selectCourse = course =>
        this.setState({selectedCourse: course})

    render() {
        return (
            <Router>
                <div>
                    <Link to="/course/table">Table</Link>
                    <Link to="/course/grid">Grid</Link>
                    <Route path="/course/table"
                           render={() => <CourseTable selectCourse = {this.selectCourse}
                                                      courses={this.state.courses}/>}/>
                    <Route path="/course/grid"
                           render={() => <CourseGrid selectCourse = {this.selectCourse}
                                                     courses={this.state.courses}/>}/>

                    <Route path="/course/edit/:id" render={() => <CourseEditor
                        course = {this.state.selectedCourse}/>}/>
                </div>
            </Router>
        )
    }
}