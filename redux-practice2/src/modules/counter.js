import { createAction, handleActions } from "redux-actions";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 액션 객체 내 데이터는 나중에 상태 업데이트할 때 참고해야할 값들

const initialState = 0;

const counter = handleActions(
    {
        [INCREASE]: (state) => state + 1,
        [DECREASE]: (state) => state - 1,
    },
    initialState
);

export default counter;
