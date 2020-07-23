import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";

import UserProfile from "../components/UserProfile";
import LoginForm from "../components/LoginForm";

const AppLayout = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const SearchInput = useMemo(
        () => ({
            verticalAlign: "middle",
        }),
        []
    );
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/">
                        <a>노드버드</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">
                        <a>프로필</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={SearchInput} />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">
                        <a>회원가입</a>
                    </Link>
                </Menu.Item>
            </Menu>
            <Row>
                {/* 모바일 => 태블릿 => PC 순으로 개발하는 것이 편함! */}
                <Col xs={24} md={6}>
                    {isLoggedIn ? (
                        <UserProfile setIsLoggedIn={setIsLoggedIn} />
                    ) : (
                        <LoginForm setIsLoggedIn={setIsLoggedIn} />
                    )}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://github.com/TIAHWANG" target="_blank" rel="noreferrer noopener">
                        Mady by TIA
                    </a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;
