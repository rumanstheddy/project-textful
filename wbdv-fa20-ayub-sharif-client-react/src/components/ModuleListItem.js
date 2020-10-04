import React from 'react'
import "font-awesome/css/font-awesome.css"


export default class ModuleListItem extends React.Component {
    render() {
        return (
            <li className="list-group-item">{this.props.title}
                <i className="fa fa-trash"></i>
                <i className="fa fa-pencil"></i></li>
        );}}
