import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Sidebar = () => {
    const [active, setActive] = useState()

    const location = useLocation()
    useEffect(() => {
        setActive((prev) => {
            if (location.pathname === '/diseasetype') {
                return 'diseasetype'
            } else if (location.pathname === '/country') {
                return 'country'
            } else if (location.pathname === '/disease') {
                return 'disease'
            } else if (location.pathname === '/discover') {
                return 'discover'
            } else if (location.pathname === '/users') {
                return 'users'
            } else if (location.pathname === '/doctor') {
                return 'doctor'
            } else if (location.pathname === '/publicservant') {
                return 'publicservant'
            } else if (location.pathname === '/specialize') {
                return 'specialize'
            } else if (location.pathname === '/record') {
                return 'record'
            }
        })
    }, [location])

    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-light"
            style={{ width: '280px' }}
        >
            <ul className="nav nav-pills flex-column mb-auto">
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('diseasetype')
                    }}
                >
                    <Link
                        to="/diseasetype"
                        className={
                            active === 'diseasetype'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Disease Types
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('country')
                    }}
                >
                    <Link
                        to="/country"
                        className={
                            active === 'country'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Countries
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('disease')
                    }}
                >
                    <Link
                        to="/disease"
                        className={
                            active === 'disease'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Diseases
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('discover')
                    }}
                >
                    <Link
                        to="/discover"
                        className={
                            active === 'discover'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Discoveries
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('users')
                    }}
                >
                    <Link
                        to="/users"
                        className={
                            active === 'users'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Users
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('publicservant')
                    }}
                >
                    <Link
                        to="/publicservant"
                        className={
                            active === 'publicservant'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Public Servants
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('doctor')
                    }}
                >
                    <Link
                        to="/doctor"
                        className={
                            active === 'doctor'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Doctors
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('specialize')
                    }}
                >
                    <Link
                        to="/specialize"
                        className={
                            active === 'specialize'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Specializations
                    </Link>
                </li>
                <li
                    className="nav-item"
                    onClick={() => {
                        setActive('record')
                    }}
                >
                    <Link
                        to="/record"
                        className={
                            active === 'record'
                                ? 'nav-link active'
                                : 'nav-link link-dark'
                        }
                    >
                        Records
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
