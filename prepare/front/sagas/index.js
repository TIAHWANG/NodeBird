import { all, fork } from "redux-saga/effects";

import postSaga from "./post";
import userSaga from "./user";

// fork: 비동기적 함수 실행
// call: 동기적 함수 실행
// all: 함수들을 동시에 실행하게 끔 해줌
export default function* rootSaga() {
    yield all([fork(postSaga), fork(userSaga)]);
}
