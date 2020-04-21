import React from "react";
import "./style.scss";

const Login = () => {
    return (
        <form className="loginForm">
            <h2>로그인</h2>
            <div>
                <label for="id">아이디</label>
                <input id="id" type="text" name="id" />
            </div>
            <div>
                <label for="password">비밀번호</label>
                <input id="password" type="password" name="password" />
            </div>
            <div className="btn-group">
                <button type="submit">로그인</button>
            </div>
        </form>
    );
};

export default Login;
