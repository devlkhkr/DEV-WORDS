import React from "react";
import styled from "styled-components";
import Typo from "../../components/atoms/Typo";
import InputText from "../../components/atoms/InputText";
import Radio from "../../components/atoms/Radio";
import Select from "../../components/atoms/Select";
import MultiSelect from "../../components/atoms/MultiSelect";
import Label from "../../components/atoms/Label";
import Textarea from "../../components/atoms/Textarea";
import Button from "../../components/atoms/Button";
import Fieldset from "../../components/molecules/Fieldset";
import InputWrap from "../../components/molecules/InputWrap";
import ButtonWrap from "../../components/molecules/ButtonWrap";
import Form from "../../components/organisms/Form";

import { useState } from "react";

interface LoginTypes {
  setJoinPageOpened: Function
}

const JoinStyled = styled.form<LoginTypes>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 19999;
  padding: 32px 16px;
  background-color: #f3f3f3;
  overflow-y: auto;
  input{
    margin-top: 8px;
  }
  button{
    margin-top: 16px;
  }
`;

const JoinComponent: React.FC<LoginTypes> = ({ setJoinPageOpened }) => {
  const loginButtonClick = () => {
    setJoinPageOpened(false)
  };

  return (
    <>
      <JoinStyled setJoinPageOpened={setJoinPageOpened}>
        <Form>
          <Typo size="16px" weight="semi-bold" mt="12px">회원가입</Typo>
          <Fieldset>
            <Label
              htmlFor="joinId"
              desc="아이디"
              mandatory={true}
            />
            <InputText type="text" placeHolder="사용하실 아이디를 입력해주세요." id="joinId" />
          </Fieldset>
          <Fieldset>
            <Label
              htmlFor="joinPw"
              desc="비밀번호"
              mandatory={true}
            />
            <InputText type="password" placeHolder="최소 8자리 이상, 영문자 + 숫자 조합" id="joinPw" />
          </Fieldset>

          <Fieldset>
            <Label
              htmlFor="joinKey"
              desc="초대코드"
              mandatory={true}
            />
            <InputText type="text" placeHolder="초대코드를 입력해주세요." id="joinKey" />
          </Fieldset>

          <Fieldset>
            <ButtonWrap>
              <Button
                desc="취소"
                id="cancleRegWord"
                bgc="#666"
                color="#fff"
                width="40%"
                height="40px"
                onClick={() => setJoinPageOpened(false)}
              />
              <Button
                desc="가입"
                id="submitRegWord"
                bgc="var(--color-point)"
                color="#fff"
                width="60%"
                height="40px"
              />
            </ButtonWrap>
          </Fieldset>
        </Form>
      </JoinStyled>
    </>
  )
};

JoinComponent.defaultProps = {};

export default JoinComponent;