import React from 'react'
import ModuleListItem from "./ModuleListItem";
import Course from "../services/Course";

export default class ModuleList extends React.Component {
    constructor(props) { super(props);
        this.state = {
            _id: 'no id',
            module: '',
            modules: [
                {title: 'Module 1 - jQuery', id: 123},
                {title: 'Module 2 - React', id: 234},
                {title: 'Module 3 - Redux', id: 345},
                {title: 'Module 4 - Angular', id: 456},
                {title: 'Module 5 - Node.js', id: 567},
                {title: 'Module 6 - MongoDB', id: 678},
            ],
            courseService: new Course()
        };

        this.titleChanged = this.titleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
    }

    titleChanged(event) {
        this.setState({module: {title: event.target.value}})
        console.log(event.target.value);
    }

    createModule() {
        this.state.courseService.createCourse({title: this.state.module.title,
                                                  modules: this.state.modules}).then(
                                                      result => {
                                                          console.log(result)
                                                          this.setState({_id: result.data._id})
                                                      })
        console.log(this.state.module);
    }

    renderListOfModules() {
        let modules = this.state.modules.map(function (module) {
            return <ModuleListItem title={module.title} key={module.id}/>
        });
        return modules;
    }

    render() {
        return (
            <div>
                <input className='form-control' onChange={this.titleChanged}
                       value={this.state.module.value} placeholder='title'/>

                       <button className="btn btn-primary btn-block">
                           <i className="fa fa-plus" onClick={this.createModule}></i>
                       </button>

                <ul className="list-group">
                    {this.renderListOfModules()}
                </ul>
            </div>
        );
    }
}
