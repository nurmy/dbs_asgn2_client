import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchDiscovers,
    registerDiscover,
    editDiscover,
    removeDiscover,
    resetReg,
    resetEdit,
    resetDelete,
} from '../../features/discoverSlice'
import Modal from '../../components/Modal/Modal'

import './Discover.css'

const Discover = () => {
    const state = useSelector((state) => {
        return {
            data: state.discover.data,
            loaded: state.discover.loaded,
            regging: state.discover.regging,
            regged: state.discover.regged,
            editing: state.discover.editing,
            edited: state.discover.edited,
            deleting: state.discover.deleting,
            deleted: state.discover.deleted,
        }
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDiscovers())
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
            label: 'first_enc_date',
            name: 'Date of first encounter',
            required: true,
            value: '',
            format: 'date',
        },
    ])

    const [editFields, setEditFields] = useState([
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
            label: 'first_enc_date',
            name: 'Date of first encounter',
            required: true,
            value: '',
            format: 'date',
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
            cname: elm.cname,
            disease_code: elm.disease_code,
        }
        dispatch(
            removeDiscover({
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
            registerDiscover({
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
            editDiscover({
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
                    <span className="fs-4">Disease Discoveries List</span>
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
                                    <th scope="col">Country name</th>
                                    <th scope="col">Disease code</th>
                                    <th scope="col">Date of first encounter</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {state.data.map((elm) => (
                                    <tr key={elm.id}>
                                        <td>{elm.cname}</td>
                                        <td>{elm.disease_code}</td>
                                        <td>
                                            {elm.first_enc_date.slice(0, 10)}
                                        </td>
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

export default Discover
