import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { List, Button, Card } from "antd";
import { StopOutlined } from "@ant-design/icons";

const FollowList = ({ header, data }) => {
    const Header = useMemo(() => <div>{header}</div>, []);
    const ListContainer = useMemo(() => ({ marginBottom: 20 }), []);
    const ButtonContainer = useMemo(() => ({ textAlign: "center", margin: "10px 0px" }), []);
    const ListItem = useMemo(() => ({ margin: 20 }), []);

    return (
        <List
            header={Header}
            style={ListContainer}
            size="small"
            grid={{ gutter: 4, xs: 2, md: 3 }}
            loadMore={
                <div style={ButtonContainer}>
                    <Button>더보기</Button>
                </div>
            }
            bordered
            dataSource={data}
            renderItem={(item) => (
                <List.Item style={ListItem}>
                    <Card actions={[<StopOutlined key="stop" />]}>
                        <Card.Meta description={item.nickname} />
                    </Card>
                </List.Item>
            )}
        />
    );
};

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
};

export default FollowList;
