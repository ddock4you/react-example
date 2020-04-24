import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../context";

const Header = () => {
    const { state, setState } = useContext(Store);

    return (
        <nav>
            {state.isLogin && `환영합니다. ${state.isLogin.id} 님`}
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                {state.isLogin ? (
                    <li onClick={() => setState.setIsLogin(false)}>로그아웃</li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">로그인</Link>
                        </li>
                        <li>
                            <Link to="/join">회원가입</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Header;
