import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Renavigate = ({ source }) => {
    const navigate = useNavigate()
    useEffect(() => {
        navigate(source)
    }, [])
    return <div>Renavigating...</div>
}

export default Renavigate
