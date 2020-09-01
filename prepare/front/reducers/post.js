import faker from "faker";
import produce from "immer";
import shortId from "shortid";

export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: "티아",
            },
            content: "첫번째 게시글 #해시태그 #익스프레스",
            Images: [
                {
                    id: shortId.generate(),
                    src:
                        "data:image/jpeg;base64,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",
                },
                {
                    id: shortId.generate(),
                    src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSkEuPrKRRDOOijXKgUlmxAoR54EyQHrFhL3w&usqp=CAU",
                },
                {
                    id: shortId.generate(),
                    src:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSAIC_jDD1ILxCAowrLHvCAIwWzB-gJuzx5Pw&usqp=CAU",
                },
            ],
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "태리",
                    },
                    content: "우와우와",
                },
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: "루이",
                    },
                    content: "대박!!",
                },
            ],
        },
    ],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
};

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20)
        .fill()
        .map(() => ({
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.paragraph(),
            Images: [
                {
                    src: faker.image.imageUrl(),
                },
            ],
            Comments: [
                {
                    User: {
                        id: shortId.generate(),
                        nickname: faker.name.findName(),
                    },
                    content: faker.lorem.sentence(),
                },
            ],
        }))
);

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = (data) => ({
    id: data.id,
    content: data.content,
    User: {
        id: 1,
        nickname: "티아",
    },
    Images: [],
    Comments: [],
});

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: "티아",
    },
});

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;

                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                // };
            }
            case ADD_COMMENT_FAILURE:
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer;
