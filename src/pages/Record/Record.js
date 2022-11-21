import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchRecords,
    registerRecord,
    editRecord,
    removeRecord,
    resetReg,
    resetEdit,
    resetDelete,
} from '../../features/recordSlice'
import Modal from '../../components/Modal/Modal'

import './Record.css'

const Record = () => {
    const state = useSelector((state) => {
        return {
            data: state.record.data,
            loaded: state.record.loaded,
            regging: state.record.regging,
            regged: state.record.regged,
            editing: state.record.editing,
            edited: state.record.edited,
            deleting: state.record.deleting,
            deleted: state.record.deleted,
        }
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRecords())
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
            label: 'cname',
            name: 'Country Name',
            required: true,
            value: '',
        },
        {
            label: 'disease_code',
            name: 'Disease Code',
            required: true,
            value: '',
        },

        {
            label: 'total_deaths',
            name: 'Total deaths',
            required: true,
            value: '',
            type: 'Number',
        },
        {
            label: 'total_patients',
            name: 'Total patients',
            required: true,
            value: '',
            type: 'Number',
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
            label: 'cname',
            name: 'Country Name',
            required: true,
            value: '',
            primary: true,
        },
        {
            label: 'disease_code',
            name: 'Disease Code',
            required: true,
            value: '',
            primary: true,
        },

        {
            label: 'total_deaths',
            name: 'Total deaths',
            required: true,
            value: '',
            type: 'Number',
        },
        {
            label: 'total_patients',
            name: 'Total patients',
            required: true,
            value: '',
            type: 'Number',
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
            cname: elm.cname,
            disease_code: elm.disease_code,
        }
        dispatch(
            removeRecord({
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
            registerRecord({
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
            editRecord({
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
                    <span className="fs-4">Records List</span>
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
                                    <th scope="col">Country name</th>
                                    <th scope="col">Disease code</th>
                                    <th scope="col">Total deaths</th>
                                    <th scope="col">Total patients</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {state.data.map((elm) => (
                                    <tr
                                        key={
                                            elm.email +
                                            elm.cname +
                                            elm.disease_code
                                        }
                                    >
                                        <td>{elm.email}</td>
                                        <td>{elm.cname}</td>
                                        <td>{elm.disease_code}</td>
                                        <td>{elm.total_deaths}</td>
                                        <td>{elm.total_patients}</td>
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

export default Record
