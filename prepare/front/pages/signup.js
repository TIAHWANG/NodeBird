import React, { useCallback, useState, useMemo } from "react";
import Head from "next/head";
import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import { SIGN_UP_REQUEST } from "../reducers/user";

const ErrorMessage = styled.div`
    color: red;
`;

const SignUp = () => {
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput("");
    const [nickname, onChangeNickname] = useInput("");
    const [password, onChangePassword] = useInput("");

    const [passwordCheck, setPasswordCheck] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback(
        (e) => {
            setPasswordCheck(e.target.value);
            setPasswordError(e.target.value !== password);
        },
        [password]
    );

    const [term, setTerm] = useState("");
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    });

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        });
    }, [password, passwordCheck, term]);

    const ButtonContainer = useMemo(() => ({ marginTop: "10px" }), []);

    return (
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br />
                    <Input
                        name="user-email"
                        type="email"
                        value={email}
                        required
                        onChange={onChangeEmail}
                    />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br />
                    <Input
                        name="user-nickname"
                        value={nickname}
                        required
                        onChange={onChangeNickname}
                    />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input
                        type="password"
                        name="user-password"
                        value={password}
                        required
                        onChange={onChangePassword}
                        autoComplete="false"
                    />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 확인</label>
                    <br />
                    <Input
                        type="password"
                        name="user-password-check"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                        autoComplete="false"
                    />
                </div>
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
                        약관에 동의합니다.
                    </Checkbox>
                    {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                </div>
                <div style={ButtonContainer}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>
                        가입하기
                    </Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export default SignUp;
