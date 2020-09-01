import { all, fork, takeLatest, put, delay, throttle } from "redux-saga/effects";
import axios from "axios";
import shortId from "shortid";
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POST_FAILURE,
    generateDummyPost,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function loadPostAPI(data) {
    return axios.get("/api/post", data);
}

function* loadPost() {
    try {
        // const result = yield call(loadPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: generateDummyPost(10),
            // data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function addPostAPI(data) {
    return axios.post("/api/post", data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
            // data: result.data,
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function removePostAPI(data) {
    return axios.delete("/api/post", data);
}

function* removePost(action) {
    try {
        // const result = yield call(removePostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
            // data: result.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
            // data: result.data,
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}

// take: 1회용. 한번 사용하면 사라져 버림 => while(true){}로 감싸주면 계속 사용 가능 (잘 사용하지 않는 방법) => takeEvery를 사용함
// while take: 동기적으로 동작
// takeEvery: 비동기적으로 동작
// takeLatest: 동시에 2번 요청 => 2번 응답이 아니라 제일 마지막 응답만 1번 전송. 요청은 그대로 2번 감 => 서버 쪽에서 데이터 중복 체크하기
// throttle: 서버에 요청 보내는 시간까지 정할 수 있음. 그 시간안에는 요청 1번만 전송되는 것
function* watchLoadPost() {
    yield throttle(5000, LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPost),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}
