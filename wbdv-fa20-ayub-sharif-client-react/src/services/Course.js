import axios from 'axios'

export default class Course {
    constructor() {
        this.url = 'https://wbdv-generic-server.herokuapp.com/api/asharif/courses'
    }

    createCourse(course) {
        axios.post(this.url, course)
        /*
        fetch(this.url,
              {
                  method: 'POST',
                  body: JSON.stringify(course),
                  headers: {
                      'Content-Type' : 'application/json'
                  }
              }).then(response => response.json)
         */
    }
}