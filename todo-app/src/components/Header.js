import React from "react";
import { Link } from "react-router-dom";

const Header = ({ loggedIn, setLoggedIn }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">홈</Link>
                </li>
                {loggedIn ? (
                    <li onClick={() => setLoggedIn(false)}>로그아웃</li>
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
