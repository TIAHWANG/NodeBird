import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button } from "antd";
import Link from "next/link";

import useInput from "../hooks/useInput";
import { logInRequestAction } from "../reducers/user";

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading } = useSelector((state) => state.user);

    const [email, onChangeEmail] = useInput("");
    const [password, onChangePassword] = useInput("");

    const onSubmitForm = useCallback(() => {
        dispatch(logInRequestAction({ email, password }));
    }, [email, password]);

    const FormContainer = useMemo(() => ({ padding: "10px" }), []);
    const ButtonContainer = useMemo(() => ({ marginTop: "10px" }), []);

    return (
        <Form onFinish={onSubmitForm} style={FormContainer}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input
                    name="user-email"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                    autoComplete="false"
                />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                    autoComplete="false"
                />
            </div>
            <div style={ButtonContainer}>
                <Button type="primary" htmlType="submit" loading={logInLoading}>
                    로그인
                </Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </div>
        </Form>
    );
};

export default LoginForm;
