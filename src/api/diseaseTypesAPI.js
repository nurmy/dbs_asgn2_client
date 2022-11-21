import axios from 'axios'

export const createDiseaseType = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'https://dbs-asgn2-server.onrender.com/diseasetype',
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

export const readDiseaseTypes = async () => {
    try {
        const res = await axios.get(
            'https://dbs-asgn2-server.onrender.com/diseasetype',
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

export const updateDiseaseType = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.patch(
            `https://dbs-asgn2-server.onrender.com/diseasetype/${attributes.id}`,
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

export const deleteDiseaseType = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.delete(
            `https://dbs-asgn2-server.onrender.com/diseasetype/${attributes.id}`
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
