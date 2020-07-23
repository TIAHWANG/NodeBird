import React, { useState, useCallback, useMemo } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, setId] = useState("");
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);

    const [password, setPassword] = useState("");
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value);
    }, []);

    const onSubmitForm = useCallback(() => {
        console.log(id, password);
        setIsLoggedIn(true);
    }, [id, password]);

    const FormContainer = useMemo(() => ({ padding: "10px" }), []);
    const ButtonContainer = useMemo(() => ({ marginTop: "10px" }), []);

    return (
        <Form onFinish={onSubmitForm} style={FormContainer}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input
                    name="user-id"
                    value={id}
                    onChange={onChangeId}
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
                <Button type="primary" htmlType="submit" loading={false}>
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
