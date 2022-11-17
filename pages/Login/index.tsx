import React from "react";
import styled from "styled-components";
import Logo from "pages/components/atoms/Logo";
import InputText from "pages/components/atoms/InputText";
import Typo from "pages/components/atoms/Typo";
import Button from "pages/components/atoms/Button";
import Fieldset from "pages/components/molecules/Fieldset";
import Form from "pages/components/organisms/Form";
import Join from "pages/components/templates/Join";
import { useState, useRef } from "react";
import axios from "axios";
import Hash from "../components/atoms/Hash";

import { useDispatch } from "react-redux";
import { UserDataTypes, setUserData } from "redux/slices/user";
import { NextPage } from "next";

import { store } from "redux/store";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface LoginTypes {
  isAuth?: boolean;
}

const LoginStyled = styled.form<LoginTypes>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 19998;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #fff;
  overflow: hidden;
  input {
    margin-top: 8px;
  }
  button {
    margin-top: 16px;
  }
`;

const LoginComponent: NextPage<LoginTypes> = ({ isAuth }) => {
  const idInput: any = useRef();
  const pwInput: any = useRef();
  const router = useRouter();
  const startLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUserId.length <= 0) {
      alert("아이디를 입력하세요");
      idInput.current.focus();
      return;
    } else if (loginUserPw.length <= 0) {
      alert("비밀번호를 입력하세요");
      pwInput.current.focus();
      return;
    } else {
      Hash.makePasswordHashed(loginUserId, loginUserPw).then(
        async (hashedPw: string | boolean) => {
          if (hashedPw) {
            const res: any = await signIn("credentials", {
              loginUserId,
              hashedPw,
              redirect: false,
            });
            if (res.error === "CredentialsSignin") {
              alert("아이디 또는 비밀번호를 확인하세요.");
            } else if (res.status === 200 && res.error === null) {
              router.push("/");
            } else {
              console.log("예외오류:::", res);
            }
          }
        }
      );
    }
  };

  const insertLoginData = async (userId: string) => {
    const res = await axios.post(
      "http://localhost:3000" + "/api/user/log/history",
      {
        loginUserData: {
          logUserId: userId,
          logAction: 1,
        },
      }
    );
    let logInsertResult = res.data.affectedRows === 1 ? "true" : "false";
    console.log(`로그인 기록 Insert : ${logInsertResult}`);
  };

  const [joinPageOpened, setJoinPageOpened] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  const [loginUserPw, setLoginUserPw] = useState("");

  return (
    <>
      {joinPageOpened ? (
        <Join
          setJoinPageOpened={setJoinPageOpened}
          startLogin={startLogin}
          insertLoginData={insertLoginData}
        />
      ) : (
        <></>
      )}
      <LoginStyled onSubmit={startLogin}>
        <Logo mainColor="var(--color-point)" subColor="#231815" />
        <Fieldset>
          <InputText
            type="text"
            placeHolder="이메일을 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserId(e.currentTarget.value);
            }}
            reference={idInput}
          />
          <InputText
            type="password"
            placeHolder="패스워드를 입력하세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserPw(e.currentTarget.value);
            }}
            reference={pwInput}
          />
          <Button
            type="submit"
            desc="로그인"
            height="48px"
            color="#fff"
            backgroundColor="var(--color-point)"
          />
        </Fieldset>
        <Typo
          fontSize="14px"
          color="rgba(0,0,0,.5)"
          onClick={(e) => setJoinPageOpened(true)}
        >
          회원가입
        </Typo>
      </LoginStyled>
    </>
  );
};

LoginComponent.defaultProps = {
  isAuth: true,
};

export default LoginComponent;
