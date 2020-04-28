import { handleActions } from "redux-actions";
import * as api from "../lib/api";
import axios from "axios";

// 액션 타입을 선언합니다.
// 한 요청당 세 개를 만들어야 합니다.

const GET_POST_REQUEST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS_REQUEST = "sample/GET_USER";
const GET_USERS_SUCCESS = "sample/GET_USER_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USER_FAILURE";

// thunk 함수를 생성합니다.
// thunk 함수 내부에서는 시작할 때, 성공했을 대, 실패했을 때 다른 액션을 디스패치합니다.

export const getPost = (id) => async (dispatch) => {
    dispatch({ type: GET_POST_REQUEST });
    try {
        const response = await axios.get(
            `http://jsonplaceholder.typicode.com/posts/${id}`
        );
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data,
        }); // 요청 성공
    } catch (e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: e,
            error: true,
        }); // 에러 발생
        throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
    }
};

export const getUsers = () => async (dispatch) => {
    dispatch({ type: GET_USERS_REQUEST }); // 요청을 시작한 것을 알림
    try {
        const response = await axios.get(
            `http://jsonplaceholder.typicode.com/users`
        );
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data,
        }); // 요청 성공
    } catch (e) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true,
        }); // 에러 발생
        throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌.
    }
};

// 초기 상태를 선언합니다.
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리합니다.

const initialState = {
    loading: {
        GET_POST: false,
        GET_USERS: false,
    },
    post: null,
    users: null,
};

const sample = handleActions(
    {
        [GET_POST_REQUEST]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true, // 요청 시작
            },
        }),
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false, // 요청 완료
            },
            post: action.payload,
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            loadidng: {
                ...state.loading,
                GET_POST: false, // 요청 완료
            },
        }),
        [GET_USERS_REQUEST]: (state) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: true, // 요청 시작
            },
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.laoding,
                GET_USERS: false, // 요청 완료
            },
            users: action.payload,
        }),
        [GET_USERS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false, // 요청 완료
            },
        }),
    },
    initialState
);

export default sample;
