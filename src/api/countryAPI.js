import axios from 'axios'

export const createCountry = async (attributes) => {
    try {
        // console.log(token)
        const res = await axios.post(
            'https://dbs-asgn2-server.onrender.com/country',
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

export const readCountries = async () => {
    try {
        const res = await axios.get(
            'https://dbs-asgn2-server.onrender.com/country',
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

export const updateCountry = async (attributes) => {
    try {
        const res = await axios.patch(
            `https://dbs-asgn2-server.onrender.com/country/${attributes.cname}`,
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

export const deleteCountry = async (attributes) => {
    try {
        const res = await axios.delete(
            `https://dbs-asgn2-server.onrender.com/country/${attributes.cname}`
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
