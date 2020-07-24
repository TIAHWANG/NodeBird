export const initialState = {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    logInData: {},
};

export const logInAction = (data) => {
    return {
        type: "LOG_IN",
        data,
    };
};

export const logOutAction = () => {
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
                user: action.data,
            };
        case "LOG_OUT":
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        default:
            return state;
    }
};

export default reducer;
