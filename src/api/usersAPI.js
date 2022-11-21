import axios from 'axios'

export const createUser = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'https://dbs-asgn2-server.onrender.com/users',
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

export const readUsers = async () => {
    try {
        const res = await axios.get(
            'https://dbs-asgn2-server.onrender.com/users',
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

export const updateUser = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `https://dbs-asgn2-server.onrender.com/users/${attributes.email}`,
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

export const deleteUser = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.delete(
            `https://dbs-asgn2-server.onrender.com/users/${attributes.email}`
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
