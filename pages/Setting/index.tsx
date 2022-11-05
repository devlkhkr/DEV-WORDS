import type { NextPage } from "next";
import ToggleCheckComponent from "pages/components/atoms/Toggle";
import Anchor from "pages/components/atoms/Anchor";
import { useState } from "react";
import styled from "styled-components";
import styledInterface from "../components/Intefaces/styledComponent";
import { openModal, closeModal } from "redux/slices/modal";

import SettingListComponent from "../components/molecules/SettingList";
import UserProfileComponent from "../components/molecules/UserProfile";
import Accordion from "../components/molecules/Accordion";
import { useDispatch } from "react-redux";
import ProfileWordTitleComponent from "pages/components/molecules/ProfileWordTitle";
import ProfileWordComponent from "pages/components/molecules/ProfileWord";
import ProfileWordItemComponent from "pages/components/molecules/ProfileWordItem";
interface SettingTypes extends styledInterface {
  typo: string;
  afterIcon?: string;
  rightTypo?: string;
}

interface AcrdListTypes {
  acrdTitle: string;
  toggleFlag: boolean;
  toggleFunc: Function;
  acrdList: {
    label: string;
    checked: boolean;
  }[];
}

interface modalComponentsTypes {
  typo: string;
}

const SettingWrap = styled.div`
  background-color: var(--color-white);
  border-radius: 16px;
  padding: 16px 16px 40px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

// user profile
const SettingProfileStyled = styled.div`
  display: flex;
  align-items: center;
  /* height: 88px; */
  padding: 0 8px;
`;

// user interface

const SettingTopStyled = styled.div`
  border-top: 1px solid rgba(120, 120, 120, 0.4);
`;

const ProfileWordsWrap = styled.div`
  margin: 20px 0;
  border-bottom: 1px solid var(--color-lightgrey);
`;


// app interface
const SettingBottomStyled = styled.div`
  border-top: 1px solid rgba(120, 120, 120, 0.4);
  margin-top: 32px;
`;

const AcrdWrapStyled = styled.div`
  border-bottom: 1px dashed #ddd;
`;

const Setting: NextPage<SettingTypes> = () => {
  const [wordCtrlByState, setWordCtrlByState] = useState(false);
  const [wordCtrlByCate, setWordCtrlByCate] = useState(false);

  const [modalComponents, setModalComponents] = useState<
    modalComponentsTypes[]
  >([
    {
      typo: "공지사항",
    },
    {
      typo: "도움말(FAQ)",
    },
    {
      typo: "개발히스토리",
    },
    {
      typo: "시스템스펙",
    },
  ]);
  console.log(modalComponents);

  const dispatch = useDispatch();
  // FIXME : 이벤트객체 any타입 수정
  const modalOpenClick = (e: any) => {
    // console.log(e.target.innerText);
    switch (e.target.innerText) {
      case "공지사항":
        return dispatch(
          openModal({
            modalType: "NoticeModal",
            isOpen: true,
          })
        );
      case "도움말(FAQ)":
        return dispatch(
          openModal({
            modalType: "HelpMessageModal",
            isOpen: true,
          })
        );
      case "개발히스토리":
        return dispatch(
          openModal({
            modalType: "DevLogModal",
            isOpen: true,
          })
        );
      case "시스템스펙":
        return dispatch(
          openModal({
            modalType: "SystemSpecModal",
            isOpen: true,
          })
        );
      default:
        return console.log("null page");
    }
    return;
  };


  const [wordActivity, setWordActivity] = useState(false);


  const objAcrdList: AcrdListTypes[] = [
    {
      acrdTitle: "상태별 노출 관리",
      toggleFlag: wordCtrlByState,
      toggleFunc: setWordCtrlByState,
      acrdList: [
        {
          label: "아는단어",
          checked: false,
        },
        {
          label: "모르는단어",
          checked: true,
        },
        {
          label: "즐겨찾은단어",
          checked: true,
        },
        {
          label: "건너뛴단어",
          checked: false,
        },
      ],
    },
    {
      acrdTitle: "카테고리별 노출 관리",
      toggleFlag: wordCtrlByCate,
      toggleFunc: setWordCtrlByCate,
      acrdList: [
        {
          label: "CS",
          checked: true,
        },
        {
          label: "FrontEnd",
          checked: true,
        },
        {
          label: "BackEnd",
          checked: true,
        },
        {
          label: "App",
          checked: true,
        },
      ],
    },
  ];
  

  return (
    <SettingWrap>
      <SettingProfileStyled>
        <Anchor width="100%" href="/Setting/Profile">
          <UserProfileComponent />
        </Anchor>
      </SettingProfileStyled>

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

      <SettingTopStyled>
        {objAcrdList.map((objAcrd, index) => (
          <AcrdWrapStyled key={index}>
            <SettingListComponent
              typo={objAcrd.acrdTitle}
              afterIcon={objAcrd.toggleFlag ? "arr-up" : "arr-down"}
              onClick={() => {
                objAcrd.toggleFunc((prev: boolean) => !prev);
              }}
            />

            <Accordion isOpened={objAcrd.toggleFlag}>
              {objAcrd.acrdList.map((list, index) => (
                <ToggleCheckComponent
                  key={index}
                  typo={list.label}
                  defaultChecked={list.checked}
                />
              ))}
            </Accordion>
          </AcrdWrapStyled>
        ))}
      </SettingTopStyled>

      <SettingBottomStyled>
        {modalComponents.map((item: modalComponentsTypes, index: number) => (
          <SettingListComponent
            key={index}
            typo={item.typo}
            onClick={modalOpenClick}
          />
        ))}

        <SettingListComponent typo="버전정보" rightTypo="1.0.0" />
        <SettingListComponent typo="로그아웃" color="var(--color-red)" />
      </SettingBottomStyled>
    </SettingWrap>
  );
};

export default Setting;
