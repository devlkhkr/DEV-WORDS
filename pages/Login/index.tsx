import React, { useEffect } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface LoginTypes {
  isAuth?: boolean;
}

const LoginStyled = styled.form<LoginTypes>`
  width: 100%;
  height: 100%;
  z-index: 19998;
  display: flex;
  flex-flow: column;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    display: inline-block;
    width: 100%;
    max-width: 720px;
    height: 100%;
    background-image: url(../images/bg_login.png);
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center bottom;
    z-index: -1;
    opacity: 0.5;
  }
  input {
    margin-top: 8px;
  }
  button {
    margin-top: 16px;
  }
`;

const LoginWithOtherSys = styled.div`
  button {
  }
`;

const LoginComponent: NextPage<LoginTypes> = ({ isAuth }) => {
  const idInput: any = useRef();
  const pwInput: any = useRef();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    console.log(session.status);
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [session]);

  const startLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUserId.length <= 0) {
      alert("???????????? ???????????????");
      idInput.current.focus();
      return;
    } else if (loginUserPw.length <= 0) {
      alert("??????????????? ???????????????");
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
              alert("????????? ?????? ??????????????? ???????????????.");
            } else if (res.status === 200 && res.error === null) {
              console.log("????????? ??????");
            } else {
              console.log("????????????:::", res);
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
    console.log(`????????? ?????? Insert : ${logInsertResult}`);
  };

  const [joinPageOpened, setJoinPageOpened] = useState(false);
  const [loginUserId, setLoginUserId] = useState("");
  const [loginUserPw, setLoginUserPw] = useState("");

  return (
    <>
      {joinPageOpened ? (
        <Join
          setJoinPageOpened={setJoinPageOpened}
          signIn={signIn}
          insertLoginData={insertLoginData}
        />
      ) : (
        <></>
      )}
      <LoginStyled onSubmit={startLogin}>
        {/* <Logo mainColor="var(--color-point)" subColor="#231815" /> */}
        <Typo
          textAlign="left"
          fontSize="24px"
          fontWeight="bold"
          color="var(--color-darkblue)"
        >
          ?????????
        </Typo>
        <Fieldset>
          <InputText
            type="text"
            placeHolder="???????????? ???????????????."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserId(e.currentTarget.value);
            }}
            reference={idInput}
            className="input_bg_email"
          />
          <InputText
            type="password"
            placeHolder="??????????????? ???????????????."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setLoginUserPw(e.currentTarget.value);
            }}
            reference={pwInput}
            className="input_bg_pw"
          />
          <Button
            type="submit"
            desc="?????????"
            height="48px"
            color="#fff"
            backgroundColor="var(--color-point)"
          />
        </Fieldset>
        <Typo
          fontSize="14px"
          color="var(--color-grey)"
          onClick={(e) => setJoinPageOpened(true)}
        >
          ????????????
        </Typo>
        {/* <LoginWithOtherSys>
          <Button
            type="submit"
            desc="???????????? ?????????"
            height="48px"
            color="#333"
            backgroundColor="#fada0a"
            onClick={() => signIn("kakao")}
          />
        </LoginWithOtherSys> */}
      </LoginStyled>
    </>
  );
};

LoginComponent.defaultProps = {
  isAuth: true,
};

export default LoginComponent;
