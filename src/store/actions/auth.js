export const login = (user) => ({
    type: 'LOGIN'
    , payload: {
        ...user
    }
});

export const notLogin = () => ({
    type: 'NOT_LOGIN'
});

export const logOut = () => ({
    type: 'LOGOUT'
});