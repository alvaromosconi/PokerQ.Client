export function authHeader() {
    const token = localStorage.getItem('token') || '{}'
    if (token) {
        return { Authorization: 'Bearer ' + token }
    }
    else {
        return { Authorization: '' }
    }
}

export function authHeaderWithoutBearer() {
    const token = localStorage.getItem('token') || '{}'
    if (token) {
        return { Authorization: token }
    }
    else {
        return { Authorization: '' }
    }
}