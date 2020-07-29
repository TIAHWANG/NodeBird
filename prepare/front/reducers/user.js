import axios from "axios";

export const initialState = {
    isLoggingIn: false, // 로그인 시도중
    isLoggedIn: false,
    isLoggingout: false, // 로그아웃 시도중
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
        type: "LOG_IN_REQUEST",
        data,
    };
};

export const logOutRequestAction = () => {
    return {
        type: "LOG_OUT_REQUEST",
    };
};

// 이전상태와 action을 받아서 다음상태를 돌려주는 함수 => reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN_REQUEST":
            return {
                ...state,
                isLoggingIn: true,
            };
        case "LOG_IN_SUCCESS":
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: { ...action.data, nickname: "Tia" },
            };
        case "LOG_IN_FAILURE":
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
            };
        case "LOG_OUT_REQUEST":
            return {
                ...state,
                isLoggingOut: true,
            };
        case "LOG_OUT_SUCCESS":
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null,
            };
        case "LOG_OUT_FAILURE":
            return {
                ...state,
                isLoggingOut: false,
            };
        default:
            return state;
    }
};

export default reducer;
