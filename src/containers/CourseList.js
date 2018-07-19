import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseServiceClient from "../services/CourseServiceClient";


class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseServiceClient.instance;
        this.state = {courses: [], course:{title:''}};
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.createCourseServiceCall = this.createCourseServiceCall.bind(this);
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
        if(undefined === this.state.course || '' === this.state.course.title){
            this.setState({course: {title: 'New Course'}}, function () {
                this.createCourseServiceCall();
            });
        }
        else this.createCourseServiceCall();
    }

    createCourseServiceCall(){
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
        var input = window.confirm("Are you sure you want to delete this course?");
        if (input === true) {
            this.courseService.deleteCourse(courseId).then(() => {
                this.findAllCourses();
            });
        }
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService.findAllCourses().then((courses) => {
            this.setState({courses: courses});
            this.setState({course: {title:''}});
        });
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="form-group row bg-primary">

                    <i className="col-sm-1 col-form-label fa fa-bars" onClick={this.createCourse}/>

                    <div className="col-sm-10">
                        <input className="form-control bg-primary"
                               id="titleFld"
                               placeholder="New Course"
                               value={this.state.course.title}
                               onChange={this.titleChanged}/>
                    </div>
                    <i className="col-sm-1 col-form-label fa fa-plus-circle" onClick={this.createCourse}/>
                </div>
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