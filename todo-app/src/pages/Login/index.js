import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "./style.scss";

const Login = ({ loggedin, setLoggedIn }) => {
    const userList = localStorage.getItem("userList")
        ? JSON.parse(localStorage.getItem("userList"))
        : [];
    const [id, inputId] = useState("");
    const [password, inputPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    const onLogin = (e) => {
        e.preventDefault();
        const idCheck = userList.filter((list) => list.id === id).length;
        if (id === "") {
            alert("아이디를 입력해주세요.");
            return false;
        }
        if (!idCheck) {
            alert("존재하지 않는 아이디입니다.");
            return false;
        }
        const passwordCheck = userList.filter(
            (list) => list.password === password
        ).length;
        if (password === "") {
            alert("비밀번호를 입력해주세요.");
            return false;
        }
        if (!passwordCheck) {
            alert("비밀번호를 다시 확인해 주세요.");
            return;
        }
        setLoginSuccess(true);
        setLoggedIn(true);
    };

    const onChangeId = (e) => {
        inputId(e.target.value);
    };

    const onChangePassword = (e) => {
        inputPassword(e.target.value);
    };

    return (
        <form className="loginForm" onSubmit={onLogin}>
            <h2>로그인</h2>
            <div>
                <label htmlFor="id">아이디</label>
                <input id="id" type="text" name="id" onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    onChange={onChangePassword}
                />
            </div>
            <div className="btn-group">
                <button type="submit">로그인</button>
            </div>
            {loginSuccess && <Redirect to="/" />}
        </form>
    );
};

export default Login;
