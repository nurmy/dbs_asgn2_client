import axios from 'axios'

export const createDoctor = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'https://dbs-asgn2-server.onrender.com/doctor',
            attributes,
            {}
        )
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}

export const readDoctors = async () => {
    try {
        const res = await axios.get(
            'https://dbs-asgn2-server.onrender.com/doctor',
            {}
        )
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}

export const updateDoctor = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `https://dbs-asgn2-server.onrender.com/doctor/${attributes.email}`,
            attributes,
            {}
        )
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}

export const deleteDoctor = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.delete(
            `https://dbs-asgn2-server.onrender.com/doctor/${attributes.email}`
        )
        if (res.message) {
            return {
                error: res.message,
            }
        }
        const data = res.data
        return data
    } catch (err) {
        return {
            error: 'Failed to authenticate',
        }
    }
}
