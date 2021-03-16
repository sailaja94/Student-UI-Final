import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom'
import './App.css';
import Student from './Student/Student.js'
import University from './University/University.js'
import UniversityStudent from './UniversityStudent.js'



const App = () => (
    <BrowserRouter>
        <div>
            <header className='NavMenu'>
            <nav>
                <ul>
                    <li><Link to='/'><h4>HOME</h4></Link></li>
                    <li><Link to='/university'><h4>UNIVERSITY-DATABASE</h4></Link></li>
                    <li><Link to='/university_student'><h4>UNIVERSITY-STUDENTS</h4></Link></li>
                </ul>
            </nav>
        </header>
        <Route path="/" exact component={Student} />
        <Route path="/university" component={University} />
        <Route path="/university_student" component={UniversityStudent} />
        </div>
        
     </BrowserRouter>

        )


export default App;
