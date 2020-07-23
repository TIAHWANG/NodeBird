import React from "react";
import Head from "next/head";

import AppLayout from "../components/AppLayout";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
    const followerList = [{ nickname: "티아" }, { nickname: "루이" }, { nickname: "태리" }];
    const followingList = [{ nickname: "덕구" }, { nickname: "명은" }, { nickname: "유니" }];
    return (
        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={followingList} />
                <FollowList header="팔로워" data={followerList} />
            </AppLayout>
        </>
    );
};

export default Profile;
