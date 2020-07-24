import React, { useState, useMemo, useCallback, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { addPost } from "../reducers/post";

const PostForm = () => {
    const { imagePaths } = useSelector((state) => state.post);
    const dispatch = useDispatch();
    const imageInput = useRef();

    const FormContiner = useMemo(
        () => ({
            margin: "10px 0px 20px",
        }),
        []
    );

    const [text, setText] = useState("");
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onSubmit = useCallback(() => {
        dispatch(addPost);
        setText("");
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    return (
        <Form style={FormContiner} encType="multipart/form-data" onFinish={onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="무엇?"
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type="primary" style={{ float: "right" }} htmlType="submit">
                    짹짹
                </Button>
            </div>
            {/* <div>
                {imagePaths.map((v) => (
                    <div key={v} style={{ display: "inline-block" }}>
                        <img src={v} style={{ width: "200px" }} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div> */}
        </Form>
    );
};

export default PostForm;