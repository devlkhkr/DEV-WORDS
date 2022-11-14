import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";

import ImgComponent from "pages/components/atoms/Img";
import TypoComponent from "pages/components/atoms/Typo";
import ProfileListComponent from "pages/components/molecules/SettingProfileList";

import { useSelector } from "react-redux";
import { ReducerType } from "redux/rootReducer";
import { UserDataTypes } from "redux/slices/user";
import ButtonCompontent from "pages/components/atoms/Button";
import ButtonWrapComponent from "pages/components/molecules/ButtonWrap";
import { useRouter } from "next/router";
import { useState } from "react";

import ProfileWordComponent from "pages/components/molecules/ProfileWord";
import ProfileWordTitleComponent from "pages/components/molecules/ProfileWordTitle";
import ProfileWordItemComponent from "pages/components/molecules/ProfileWordItem";

interface SettingProfileTypes extends styledInterface {}

const SettingProfileWrap = styled.div`
  background-color: var(--color-white);
  border-radius: 16px;
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const SettingProfileUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
`;

const ProfileListWrap = styled.div``;

const ProfileWordsWrap = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid var(--color-lightgrey);
`;

const SettingProfileComponent: React.FC<SettingProfileTypes> = () => {
  const userData = useSelector<ReducerType, UserDataTypes>(
    (state) => state.user
  );

  const [wordActivity, setWordActivity] = useState(false);

  const router = useRouter();
  const cancelBtnClick = () => {
    router.push("/Setting");
  };

  // FIXME: 이미지 수정할수있는 함수
  const modifyImg = () => {
    console.log("이미지 수정 함수");
  };

  return (
    <SettingProfileWrap>
      <SettingProfileUser>
        <ImgComponent
          src={userData.prfImg}
          objectFit="cover"
          marginBottom="16px"
          width="80px"
          height="80px"
        />
        {/* FIXME: 추후 버튼으로 바꾸어야할까요? */}
        <TypoComponent
          fontSize="16px"
          fontWeight="semi-bold"
          textAlign="left"
          color="var(--color-point)"
          onClick={modifyImg}
        >
          프로필 사진 바꾸기
        </TypoComponent>
      </SettingProfileUser>

      <ProfileListWrap>
        <ProfileListComponent typo="이름" userInfo={`${userData.id}`} />
        <ProfileListComponent typo="닉네임" userInfo={`${userData.nickName}`} />
        <ProfileListComponent typo="소개글" />
      </ProfileListWrap>

      <ProfileWordsWrap>
        <ProfileWordTitleComponent
          typo="나의 활동 내역"
          color="var(--color-point)"
          afterIcon={wordActivity ? "arr-up" : "arr-down"}
          onClick={() => {
            setWordActivity((prev: boolean) => !prev);
          }}
        />
        <ProfileWordComponent isOpened={wordActivity}>
          <ProfileWordItemComponent
            typo="아는단어"
            color="#aaaaaa"
            wordIcon="know"
          />
          <ProfileWordItemComponent
            typo="모르는단어"
            color="#aaaaaa"
            wordIcon="dontknow"
          />
          <ProfileWordItemComponent
            typo="즐겨찾는단어"
            color="#aaaaaa"
            wordIcon="favorite"
          />
          <ProfileWordItemComponent
            typo="건너뛴단어"
            color="#aaaaaa"
            wordIcon="skip"
          />
        </ProfileWordComponent>
      </ProfileWordsWrap>

      <ButtonWrapComponent>
        <ButtonCompontent desc="취소" height="32px" onClick={cancelBtnClick} />
        <ButtonCompontent
          desc="수정"
          backgroundColor="var(--color-point)"
          color="var(--color-white)"
          height="32px"
        />
      </ButtonWrapComponent>
    </SettingProfileWrap>
  );
};

export default SettingProfileComponent;
