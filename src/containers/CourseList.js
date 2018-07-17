import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient";


class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: []};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    courseRows() {
        var rows = this.state.courses.map((course) => {
            return <CourseRow course={course} key={course.id} delete={this.deleteCourse} update={this.updateCourse}/>
        });
        return rows;
    }

    titleChanged(event) {
        this.setState({course: {title: event.target.value}});
    }

    createCourse() {
        // add error handling for empty course
        this.courseService.createCourse(this.state.course).then(() => {
            this.findAllCourses();
        });
    }

    updateCourse(course, courseId) {
        console.log(courseId);
        // this.courseService.updateCourse(course, courseId).then(() => {
        //     this.findAllCourses();
        // });
    }

    deleteCourse(courseId) {
        this.courseService.deleteCourse(courseId).then(() => {
            this.findAllCourses();
        });
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses().then((courses) => {
            this.setState({courses: courses});
            console.log(courses);
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="form-group row bg-primary">

                    <i className="col-sm-1 col-form-label fa fa-bars" onClick={this.createCourse}/>

                    <div className="col-sm-10">
                        <input className="form-control bg-primary" id="titleFld" placeholder="cs101" onChange={this.titleChanged}/>
                    </div>
                    <i className="col-sm-1 col-form-label fa fa-plus-circle" onClick={this.createCourse}/>
                </div>
                {/*<div className="form-group row">*/}
                    {/*<div className="col-sm-10">*/}
                        {/*<input id="titleFld" placeholder="cs101" onChange={this.titleChanged}/>*/}
                        {/*<i className="col-sm-2 col-form-label fa fa-plus-circle" onClick={this.createCourse}/>*/}
                    {/*</div>*/}
                {/*</div>*/}
                <h2> Course List </h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Owned By</th>
                        <th>Last Modified</th>
                        <th><i className="fa fa-th"/></th>
                        <th><i className="fa fa-sort"/></th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.courseRows()}
                    </tbody>
                </table>
            </div>)
    }
}

export default CourseList;