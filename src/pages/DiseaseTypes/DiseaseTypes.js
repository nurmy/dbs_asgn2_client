import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchDiseaseTypes,
    registerDiseaseType,
    editDiseaseType,
    removeDiseaseType,
    resetReg,
    resetEdit,
    resetDelete,
} from '../../features/diseaseTypesSlice'
import Modal from '../../components/Modal/Modal'

import './DiseaseTypes.css'

const DiseaseTypes = () => {
    const state = useSelector((state) => {
        return {
            data: state.diseasetype.data,
            loaded: state.diseasetype.loaded,
            regging: state.diseasetype.regging,
            regged: state.diseasetype.regged,
            editing: state.diseasetype.editing,
            edited: state.diseasetype.edited,
            deleting: state.diseasetype.deleting,
            deleted: state.diseasetype.deleted,
        }
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDiseaseTypes())
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
            name: 'ID',
            required: true,
            value: '',
            type: 'Number',
        },
        {
            label: 'description',
            required: true,
            value: '',
            name: 'Description',
        },
    ])

    const [editFields, setEditFields] = useState([
        {
            label: 'id',
            name: 'ID',
            required: true,
            value: '',
            type: 'Number',
            primary: true,
        },
        {
            label: 'description',
            required: true,
            value: '',
            name: 'Description',
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
        }
        dispatch(
            removeDiseaseType({
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
            registerDiseaseType({
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
            editDiseaseType({
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
                    <span className="fs-4">Disease Types List</span>
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
                                    <th scope="col">ID</th>
                                    <th scope="col">Description</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody className="overflow-auto">
                                {state.data.map((elm) => (
                                    <tr key={elm.id}>
                                        <td>{elm.id}</td>
                                        <td>{elm.description}</td>
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

export default DiseaseTypes
