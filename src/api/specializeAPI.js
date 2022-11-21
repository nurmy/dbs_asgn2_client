import axios from 'axios'

export const createSpecialize = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'https://dbs-asgn2-server.onrender.com/specialize',
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

export const readSpecializes = async () => {
    try {
        const res = await axios.get(
            'https://dbs-asgn2-server.onrender.com/specialize',
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

export const updateSpecialize = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `https://dbs-asgn2-server.onrender.com/specialize/${attributes.id}/${attributes.email}`,
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

export const deleteSpecialize = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.delete(
            `https://dbs-asgn2-server.onrender.com/specialize/${attributes.id}/${attributes.email}`
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
