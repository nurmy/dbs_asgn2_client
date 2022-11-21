import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchSpecializes,
    registerSpecialize,
    editSpecialize,
    removeSpecialize,
    resetReg,
    resetEdit,
    resetDelete,
} from '../../features/specializeSlice'
import Modal from '../../components/Modal/Modal'

import './Specialize.css'

const Specialize = () => {
    const state = useSelector((state) => {
        return {
            data: state.specialize.data,
            loaded: state.specialize.loaded,
            regging: state.specialize.regging,
            regged: state.specialize.regged,
            editing: state.specialize.editing,
            edited: state.specialize.edited,
            deleting: state.specialize.deleting,
            deleted: state.specialize.deleted,
        }
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSpecializes())
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
            label: 'id',
            name: 'Disease type ID',
            required: true,
            value: '',
        },
        {
            label: 'email',
            name: 'Email of doctor',
            required: true,
            value: '',
        },
    ])

    const [editFields, setEditFields] = useState([
        {
            label: 'id',
            name: 'Disease type ID',
            required: true,
            value: '',
            primary: true,
        },
        {
            label: 'email',
            name: 'Email of doctor',
            required: true,
            value: '',
            primary: true,
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
            id: elm.id,
            email: elm.email,
        }
        dispatch(
            removeSpecialize({
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
            registerSpecialize({
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
            editSpecialize({
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
                        className={'btn btn-primary disabled'}
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
                    <span className="fs-4">Doctors' Specialization List</span>
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
                                    <th scope="col">Disease type ID</th>
                                    <th scope="col">Doctor's email</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {state.data.map((elm) => (
                                    <tr key={elm.id.toString + elm.email}>
                                        <td>{elm.id}</td>
                                        <td>{elm.email}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-light disabled"
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

export default Specialize
