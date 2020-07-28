import axios from "axios";

export const initialState = {
    isLoggedIn: false,
    me: null,
    signUpData: {},
    logInData: {},
};

export const loginAction = (data) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch(logInRequestAction());
        axios
            .post("/api/login")
            .then((res) => {
                dispatch(logInSuccessAction(res.data));
            })
            .catch((err) => {
                dispatch(logInFailureAction(err));
            });
    };
};

export const logInRequestAction = (data) => {
    return {
        type: "LOG_IN",
        data,
    };
};

export const logInSuccessAction = (data) => {
    return {
        type: "LOG_IN",
        data,
    };
};

export const logInFailureAction = (data) => {
    return {
        type: "LOG_IN",
        data,
    };
};

export const logOutRequestAction = () => {
    return {
        type: "LOG_OUT",
    };
};

export const logOutSuccessAction = () => {
    return {
        type: "LOG_OUT",
    };
};

export const logOutFailureAction = () => {
    return {
        type: "LOG_OUT",
    };
};

// 이전상태와 action을 받아서 다음상태를 돌려주는 함수 => reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                isLoggedIn: true,
                me: action.data,
            };
        case "LOG_OUT":
            return {
                ...state,
                isLoggedIn: false,
                me: null,
            };
        default:
            return state;
    }
};

export default reducer;
