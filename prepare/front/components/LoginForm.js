import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";
import Link from "next/link";

import useInput from "../hooks/useInput";

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, onChangeId] = useInput("");
    const [password, onChangePassword] = useInput("");

    const onSubmitForm = useCallback(() => {
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

LoginForm.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
