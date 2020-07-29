import { all, fork, takeLatest, put, delay } from "redux-saga/effects";
import axios from "axios";

function addPostAPI(data) {
    return axios.post("/api/post", data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: "ADD_POST_SUCCESS",
            // data: result.data,
        });
    } catch (err) {
        yield put({
            type: "ADD_POST_FAILURE",
            data: err.response.data,
        });
    }
}

// takeLatest: 2번 요청 => 2번 응답이 아니라 제일 마지막 응답만 1번 전송. 요청은 그대로 2번 감 => 서버 쪽에서 데이터 중복 체크하기
// throttle: 서버에 요청 보내는 시간까지 정할 수 있음. 그 시간안에는 요청 1번만 전송되는 것
function* watchAddPost() {
    yield takeLatest("ADD_POST_REQUEST", addPost);
}

export default function* postSaga() {
    yield all([fork(watchAddPost)]);
}
