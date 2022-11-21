import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchUsers,
    registerUser,
    editUser,
    removeUser,
    resetReg,
    resetEdit,
    resetDelete,
} from '../../features/usersSlice'
import Modal from '../../components/Modal/Modal'

import './Users.css'

const Users = () => {
    const state = useSelector((state) => {
        return {
            data: state.users.data,
            loaded: state.users.loaded,
            regging: state.users.regging,
            regged: state.users.regged,
            editing: state.users.editing,
            edited: state.users.edited,
            deleting: state.users.deleting,
            deleted: state.users.deleted,
        }
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    useEffect(() => {
        if (state.regged) {
            dispatch(resetReg())
            setRegisterModalActive(false)
            setRegFields((prev) =>
                prev.map((field) => {
                    return {
                        ...field,
                        value: '',
                    }
                })
            )
        }
        if (state.edited) {
            dispatch(resetEdit())
            setEditModalActive(false)
            setEditFields((prev) =>
                prev.map((field) => {
                    return {
                        ...field,
                        value: '',
                    }
                })
            )
        }
        if (state.deleted) {
            dispatch(resetDelete())
        }
    }, [state])

    const [editModalActive, setEditModalActive] = useState(false)
    const [registerModalActive, setRegisterModalActive] = useState(false)

    const [regFields, setRegFields] = useState([
        {
            label: 'email',
            name: 'Email',
            required: true,
            value: '',
        },
        {
            label: 'name',
            required: true,
            value: '',
            name: 'First name',
        },
        {
            label: 'surname',
            required: true,
            value: '',
            name: 'Second name',
        },
        {
            label: 'salary',
            name: 'Salary',
            required: true,
            value: '',
            type: 'Number',
        },
        {
            label: 'phone',
            required: true,
            value: '',
            name: 'Phone number',
        },
        {
            label: 'cname',
            required: true,
            value: '',
            name: 'Country name',
        },
    ])

    const [editFields, setEditFields] = useState([
        {
            label: 'email',
            name: 'Email',
            required: true,
            value: '',
            primary: true,
        },
        {
            label: 'name',
            required: true,
            value: '',
            name: 'First name',
        },
        {
            label: 'surname',
            required: true,
            value: '',
            name: 'Second name',
        },
        {
            label: 'salary',
            name: 'Salary',
            required: true,
            value: '',
            type: 'Number',
        },
        {
            label: 'phone',
            required: true,
            value: '',
            name: 'Phone number',
        },
        {
            label: 'cname',
            required: true,
            value: '',
            name: 'Country name',
        },
    ])

    const [currentModal, setCurrentModal] = useState(null)

    const handleEdit = (elm) => {
        setCurrentModal('edit')
        setEditFields((prev) =>
            prev.map((field) => {
                return {
                    ...field,
                    value: elm[field.label],
                }
            })
        )
        setEditModalActive(true)
    }

    const handleRegister = () => {
        setCurrentModal('reg')
        setRegisterModalActive(true)
    }

    const handleDelete = (elm) => {
        const attributes = {
            email: elm.email,
        }
        dispatch(
            removeUser({
                attributes,
            })
        )
    }

    const register = (regFields) => {
        const attributes = {}
        regFields.forEach((field) => {
            attributes[field.label] = field.value
        })
        dispatch(
            registerUser({
                attributes,
            })
        )
    }

    const edit = (editFields) => {
        const attributes = {}
        editFields.forEach((field) => {
            attributes[field.label] = field.value
        })
        dispatch(
            editUser({
                attributes,
            })
        )
    }

    const controlFunc = (e, label, setFunc) => {
        setFunc((prev) => {
            const target = prev.find((field) => field.label === label)
            if (target.type === 'Number') {
                target.value = Number(e.target.value)
            } else {
                target.value = e.target.value
            }
            return [...prev]
        })
    }

    return (
        <div className="wrapper">
            {currentModal === 'reg' ? (
                <Modal
                    className="register"
                    active={registerModalActive}
                    setActive={setRegisterModalActive}
                >
                    <form>
                        {regFields.map((field) => {
                            return (
                                <div className="mb-3 row" key={field.label}>
                                    <label
                                        for={field.label}
                                        className="col-sm-4 col-form-label"
                                    >
                                        {field.name}
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type={field.format || 'text'}
                                            className="form-control"
                                            required={field.required}
                                            id={field.label}
                                            onChange={(e) => {
                                                controlFunc(
                                                    e,
                                                    field.label,
                                                    setRegFields,
                                                    regFields
                                                )
                                            }}
                                            value={field.value}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                        <button
                            type="button"
                            className={
                                state.regging
                                    ? 'btn btn-primary disabled'
                                    : 'btn btn-primary'
                            }
                            onClick={(e) => {
                                register(regFields)
                            }}
                        >
                            Create
                        </button>
                    </form>
                </Modal>
            ) : currentModal === 'edit' ? (
                <Modal
                    className="edit"
                    active={editModalActive}
                    setActive={setEditModalActive}
                >
                    {editFields.map((field) => {
                        if (!field.primary) {
                            return (
                                <div className="mb-3 row" key={field.label}>
                                    <label
                                        for={field.label}
                                        className="col-sm-4 col-form-label"
                                    >
                                        {field.name}
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type={field.format || 'text'}
                                            className="form-control"
                                            id={field.label}
                                            onChange={(e) => {
                                                controlFunc(
                                                    e,
                                                    field.label,
                                                    setEditFields,
                                                    editFields
                                                )
                                            }}
                                            value={
                                                field.format === 'date'
                                                    ? field.value
                                                          .toString()
                                                          .slice(0, 10)
                                                    : field.value
                                            }
                                        />
                                    </div>
                                </div>
                            )
                        }
                    })}
                    <button
                        type="button"
                        className={'btn btn-primary'}
                        onClick={() => {
                            edit(editFields)
                        }}
                    >
                        Edit
                    </button>
                </Modal>
            ) : (
                <></>
            )}
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <div className="d-flex w-100 justify-content-between align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <span className="fs-4">Users List</span>
                    <button
                        type="button"
                        className="btn btn-primary "
                        onClick={() => handleRegister()}
                    >
                        + New entry
                    </button>
                </div>
                <hr />
                <div className="content h-100 overflow-hidden">
                    {state.loaded ? (
                        <table className="table table-hover h-100">
                            <thead>
                                <tr>
                                    <th scope="col">Email</th>
                                    <th scope="col">First name</th>
                                    <th scope="col">Second name</th>
                                    <th scope="col">Salary</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Country</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {state.data.map((elm) => (
                                    <tr key={elm.email}>
                                        <td>{elm.email}</td>
                                        <td>{elm.name}</td>
                                        <td>{elm.surname}</td>
                                        <td>{elm.salary}</td>
                                        <td>{elm.phone}</td>
                                        <td>{elm.cname}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                onClick={() => handleEdit(elm)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-danger"
                                                onClick={() =>
                                                    handleDelete(elm)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div>Loading</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Users
