import axios from 'axios'

export const createPublicServant = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'https://dbs-asgn2-server.onrender.com/publicservant',
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

export const readPublicServants = async () => {
    try {
        const res = await axios.get(
            'https://dbs-asgn2-server.onrender.com/publicservant',
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

export const updatePublicServant = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `https://dbs-asgn2-server.onrender.com/publicservant/${attributes.email}`,
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

export const deletePublicServant = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.delete(
            `https://dbs-asgn2-server.onrender.com/publicservant/${attributes.email}`
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
