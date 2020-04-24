import React, { useState, useCallback, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "./style.scss";
import "./test";

const Join = ({ loggedIn, setLoggedIn }) => {
    const getUserList = localStorage.getItem("userList")
        ? JSON.parse(localStorage.getItem("userList"))
        : [];
    const [id, setId] = useState("");
    const [idChecked, setIdChecked] = useState(false);
    const [idDuplicateError, setIdDuplicateError] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordValidateError, setPasswordValidateError] = useState("");
    const [intro, setintro] = useState("");
    const [gender, setGender] = useState("man");
    const [birthday, setBirthday] = useState({
        year: "",
        month: "",
        day: "",
    });
    const [hobby, setHobby] = useState({
        연애: true,
        게임: false,
        영화보기: false,
    });
    const [userList, setUserList] = useState(getUserList);
    const [joinComplete, setJoinComplete] = useState(false);

    useEffect(() => {
        localStorage.setItem("userList", JSON.stringify(userList));
    }, [userList]);

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

    const makeDay = (month) => {
        const array = [];
        let date = 0;
        switch (Number(month)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                date = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                date = 30;
                break;
            case 2:
                date = 29;
                break;
            default:
                break;
        }
        for (let i = 1; i <= date; i += 1) {
            array.push(i);
        }
        return array;
    };

    // 10 자이상 영문+숫자+특수문자가 각각 하나 이상 들어가야함.
    const validateId = /^(?=.*?[a-zA-Z0-9])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,}$/;

    // 12 자이상 영문+숫자+특수문자가 각각 하나 이상 들어가야함.
    const validatePassword = /^(?=.*?[a-zA-Z0-9])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$/;

    const onChangeId = (e) => {
        setIdChecked(false);
        setId(e.target.value);
        setIdDuplicateError(!validateId.test(e.target.value));
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setPasswordValidateError(!validatePassword.test(e.target.value));
    };

    const onClickIdCheck = (id) => {
        const userFound = userList.filter((list) => list.id === id).length;
        console.log(userFound);
        userFound ? alert("중복되는 아이디입니다.") : setIdChecked(true);
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

        const user = {
            id,
            password,
            checkPassword,
            gender,
            birthday,
            hobby,
            intro,
        };
        if (!idChecked) {
            alert("아이디 중복확인 체크를 해주세요.");
            return;
        }
        if (idDuplicateError) {
            alert(
                "ID는 10 자이상 영문+숫자+특수문자가 각각 하나 이상 포함되어야 합니다."
            );
            return;
        }
        if (passwordError) {
            alert("패스워드가 맞지 않습니다.");
            return;
        }
        if (passwordValidateError) {
            alert(
                "패스워드는 12자 이상되어야 하고 숫자, 영문, 특수문자가 하나 이상 포함되어야 합니다."
            );
            return;
        }

        alert("회원가입이 완료되었습니다.\nTodoList 페이지로 이동합니다.");
        setUserList(userList.concat(user));
        setJoinComplete(true);
        setLoggedIn(true);
    };

    const onChangeYear = (e) => {
        setBirthday({ ...birthday, year: e.target.value });
    };

    const onChangeMonth = (e) => {
        setBirthday({ ...birthday, month: e.target.value });
        // makeDay(e.target.value);
    };

    const onChangeDay = (e) => {
        setBirthday({ ...birthday, day: e.target.value });
    };

    const onChangeHobby = (e) => {
        setHobby({ ...hobby, [e.target.value]: e.target.checked });
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
                    required
                />
                <button
                    type="button"
                    onClick={() => {
                        onClickIdCheck(id);
                    }}
                >
                    중복체크
                </button>
                {idChecked && <p style={{ color: "green" }}>가입가능</p>}
            </div>
            {idDuplicateError && (
                <p style={{ color: "red" }}>
                    ID는 10 자이상 영문+숫자+특수문자가 각각 하나 이상
                    포함되어야 합니다.
                </p>
            )}
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            {passwordValidateError && (
                <div style={{ color: "red" }}>
                    패스워드는 12자 이상되어야 하고 숫자, 영문, 특수문자가 하나
                    이상 포함되어야 합니다.
                </div>
            )}
            <div>
                <label htmlFor="password2">비밀번호확인</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={checkPassword}
                    onChange={onChangeCheckPassword}
                    required
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
                    <select value={birthday.year} onChange={onChangeYear}>
                        <option value="" key="default">
                            선택하세요.
                        </option>
                        {makeYear(1910).map((year) => (
                            <option value={year} key={year}>
                                {year}
                            </option>
                        ))}
                    </select>{" "}
                    년
                    <select value={birthday.month} onChange={onChangeMonth}>
                        <option value=" " key="default">
                            선택하세요.
                        </option>
                        {makeMonth().map((month) => (
                            <option value={month} key={month}>
                                {month}
                            </option>
                        ))}
                    </select>{" "}
                    월
                    <select value={birthday.day} onChange={onChangeDay}>
                        <option value="" key="default">
                            선택하세요.
                        </option>
                        {birthday.month
                            ? makeDay(birthday.month).map((day) => (
                                  <option value={day} key={day}>
                                      {day}
                                  </option>
                              ))
                            : ""}
                    </select>
                    일
                </div>
            </div>
            <div>
                <p>취미</p>
                <div className="inner">
                    <label>
                        연애
                        <input
                            type="checkbox"
                            value="연애"
                            checked={hobby.연애 === true}
                            onChange={onChangeHobby}
                        />
                    </label>
                    <label>
                        게임
                        <input
                            type="checkbox"
                            value="게임"
                            checked={hobby.게임 === true}
                            onChange={onChangeHobby}
                        />
                    </label>
                    <label>
                        영화보기
                        <input
                            type="checkbox"
                            value="영화보기"
                            checked={hobby.영화보기 === true}
                            onChange={onChangeHobby}
                        />
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
            {joinComplete && <Redirect to="/" />}
        </form>
    );
};

export default Join;
