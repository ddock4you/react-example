import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";

// useAcrions 함수는 액션 생성 함수를 액션을 디스패치하는 함수로 자동 변환해준다.
export default function useActions(actions, deps) {
    const dispatch = useDispatch();
    return useMemo(
        () => {
            if (Array.isArray(actions)) {
                return actions.map((a) => bindActionCreators(a, dispatch));
            }
            return bindActionCreators(actions, dispatch);
        },
        deps ? [dispatch, ...deps] : deps
    );
}
