// pages 폴더 안의 모든 파일에 공통된 것들 여기에 설정

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import "antd/dist/antd.css";
import wrapper from "../store/configureStore";

// pages 폴더 안에 있는 모든 파일들의 return부분이 Component에 들어가게 되는 것
const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(NodeBird);
