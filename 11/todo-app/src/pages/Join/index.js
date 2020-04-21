import React, { useState, useCallback } from "react";
import "./style.scss";
import "./test";

const Join = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [intro, setintro] = useState("");
    const [gender, setGender] = useState("man");
    const [birthday, setBirthday] = useState({
        year: "",
        month: "",
        day: "",
    });

    const makeYear = (startYear) => {
        const array = [];
        const currentYear = new Date().getFullYear();
        for (let i = startYear; i <= currentYear; i += 1) {
            array.push(i);
        }
        return array;
    };

    const makeMonth = () => {
        const array = [];
        for (let i = 1; i <= 12; i += 1) {
            array.push(i);
        }
        return array;
    };

    const makeDay = (e) => {
        // const array = [];
        // let month = 0;
        // switch (e.target.value) {
        //     case 1:
        //     case 3:
        //     case 5:
        //     case 7:
        //     case 8:
        //     case 10:
        //     case 12:
        //         month = 30;
        // }
    };

    const onChangeId = (e) => {
        setId(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onChangeCheckPassword = useCallback(
        (e) => {
            setPasswordError(e.target.value !== password);
            setCheckPassword(e.target.value);
        },
        [password]
    );

    const onChangeIntro = (e) => {
        setintro(e.target.value);
    };

    const handleJoin = (e) => {
        e.preventDefault();
        console.log({ id, password, checkPassword, gender, intro });
    };

    return (
        <form className="joinForm" onSubmit={handleJoin}>
            <h2>회원가입</h2>
            <div>
                <label htmlFor="id">아이디</label>
                <input
                    id="id"
                    type="text"
                    name="id"
                    value={id}
                    onChange={onChangeId}
                />
                <button type="button">중복체크</button>
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                />
            </div>
            <div>
                <label htmlFor="password2">비밀번호확인</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={checkPassword}
                    onChange={onChangeCheckPassword}
                />
            </div>
            {passwordError && (
                <div style={{ color: "red" }}>패스워드가 맞지 않습니다.</div>
            )}
            <div>
                <p>성별</p>
                <div className="inner">
                    <label>
                        남자{" "}
                        <input
                            type="radio"
                            name="gender"
                            value="man"
                            onChange={() => {
                                setGender("man");
                            }}
                            checked={gender === "man"}
                        />
                    </label>
                    <label>
                        여자{" "}
                        <input
                            type="radio"
                            name="gender"
                            value="woman"
                            checked={gender === "woman"}
                            onChange={() => {
                                setGender("woman");
                            }}
                        />
                    </label>
                </div>
            </div>
            <div>
                <p>생년월일</p>
                <div className="inner">
                    <select>
                        <option value="" selected>
                            선택하세요.
                        </option>
                        {makeYear(1910).map((year) => (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        ))}
                    </select>{" "}
                    년
                    <select onChange={makeDay}>
                        <option value="" selected>
                            선택하세요.
                        </option>
                        {makeMonth().map((month) => (
                            <option value={month} key={month}>
                                {month}
                            </option>
                        ))}
                    </select>{" "}
                    월
                    <select>
                        <option value="20">20</option>
                    </select>
                    일
                </div>
            </div>
            <div>
                <p>취미</p>
                <div className="inner">
                    <label>
                        연애
                        <input type="checkbox" value="연애" />
                    </label>
                    <label>
                        게임
                        <input type="checkbox" value="게임" />
                    </label>
                    <label>
                        영화보기
                        <input type="checkbox" value="영화보기" />
                    </label>
                </div>
            </div>
            <div>
                <label htmlFor="textarea">자기소개</label>
                <textarea
                    id="textarea"
                    value={intro}
                    onChange={onChangeIntro}
                ></textarea>
            </div>
            <div className="btn-group">
                <button>취소</button>
                <button type="submit">가입완료</button>
            </div>
        </form>
    );
};

export default Join;
