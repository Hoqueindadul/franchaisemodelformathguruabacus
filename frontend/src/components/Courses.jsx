import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

export default function Courses() {
    const { courses } = useAuth()
    console.log(courses)
    return (
        <div className='container'>
            <div className="row mt-5 mb-5">
                {courses && courses.length > 0 ? (
                    courses.map((course, index) => (
                        <div className="col-sm-12 col-md-4 mb-4 mt-4" key={index}>
                            <div className="card">
                                <img
                                    src={course.image || "./03.webp"}
                                    className="card-img-top"
                                    alt={course.courseTittle}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{course.name}</h5>
                                    <p className="card-text">
                                        {course.courseDescription || "No description available."}
                                    </p>
                                    <Link
                                        to={`/courses/${course.slug || course.id}`}
                                        className="btn btn-primary"
                                    >
                                        Know more..
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))

                ) : <p>No course found</p>}

            </div>
        </div>
    )
}
