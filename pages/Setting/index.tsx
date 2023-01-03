import type { NextPage } from "next";
import ToggleCheckComponent from "pages/components/atoms/Toggle";
import Anchor from "pages/components/atoms/Anchor";
import { ChangeEvent, useEffect, useRef, useState } from "react";
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
import { reloadSession } from "pages/components/atoms/Session";

import { getSession, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
import { clearMsg, setMsg } from "redux/slices/alert";
import uuid from "uuid4";
import { newAlert } from "pages/components/atoms/Alert";
import TypoComponent from "pages/components/atoms/Typo";
import UsageComponent from "pages/components/molecules/Usage";

interface SettingTypes extends styledInterface {
  typo: string;
  afterIcon?: string;
  rightTypo?: string;
}

interface AcrdListTypes {
  acrdTitle: string;
  toggleFlag: boolean;
  toggleFunc: Function;
  usageList?: string[];
  acrdList: {
    type: string;
    data: {
      label: string;
      column?: string;
      checked: boolean;
    }[];
  };
}

interface wordArcdListTypes {
  acrdTitle: string;
  toggleFlag: boolean;
  toggleFunc: Function;
  acrdList: {
    label: string;
    color: string;
    wordIcon: string;
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
  border-bottom: 1px dashed #ddd;
`;

// app interface
const SettingBottomStyled = styled.div`
  border-top: 1px solid rgba(120, 120, 120, 0.4);
`;

const AcrdWrapStyled = styled.div`
  border-bottom: 1px dashed #ddd;
`;

const Setting: NextPage<SettingTypes> = () => {
  const [wordCtrlByActivity, setWordCtrlByActivity] = useState(true);
  const [wordCtrlByState, setWordCtrlByState] = useState(false);
  const [wordCtrlByCate, setWordCtrlByCate] = useState(false);
  const { data: session, status } = useSession();
  const stateTogglesRef = useRef<any>([]);
  const router = useRouter();

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

  const dispatch = useDispatch();

  const modalOpenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    switch (e.currentTarget.innerText) {
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

  const wordAcrdList: wordArcdListTypes[] = [
    {
      acrdTitle: "나의 활동 내역",
      toggleFlag: wordCtrlByActivity,
      toggleFunc: setWordCtrlByActivity,
      acrdList: [
        {
          label: "아는단어",
          color: "#aaa",
          wordIcon: "know",
        },
        {
          label: "모르는단어",
          color: "#aaa",
          wordIcon: "dontknow",
        },
        {
          label: "즐겨찾는단어",
          color: "#aaa",
          wordIcon: "favorite",
        },
        {
          label: "건너뛴단어",
          color: "#aaa",
          wordIcon: "skip",
        },
      ],
    },
  ];

  const objAcrdList: AcrdListTypes[] = [
    {
      acrdTitle: "상태별 노출 관리",
      toggleFlag: wordCtrlByState,
      toggleFunc: setWordCtrlByState,
      usageList: [
        "상태별 노출 관리를 통해 이미 상태 변경 된 단어를 다시 메인에 노출할지 결정합니다.",
        "단어장에 없는 새로운 단어만 보시려면 상태별 노출관리 토글을 모두 해제해보세요.",
      ],
      acrdList: {
        type: "state",
        data: [
          {
            label: "아는단어",
            column: "user_main_k_flag",
            checked:
              session?.user.mainWordExpOpts?.stateFlags.user_main_k_flag!,
          },
          {
            label: "모르는단어",
            column: "user_main_d_flag",
            checked:
              session?.user.mainWordExpOpts?.stateFlags.user_main_d_flag!,
          },
          {
            label: "즐겨찾은단어",
            column: "user_main_f_flag",
            checked:
              session?.user.mainWordExpOpts?.stateFlags.user_main_f_flag!,
          },
          {
            label: "건너뛴단어",
            column: "user_main_s_flag",
            checked:
              session?.user.mainWordExpOpts?.stateFlags.user_main_s_flag!,
          },
        ],
      },
    },
    {
      acrdTitle: "카테고리별 노출 관리",
      toggleFlag: wordCtrlByCate,
      toggleFunc: setWordCtrlByCate,
      usageList: [
        "카테고리별 노출 관리를 통해 특정 카테고리에 해당하는 단어만 메인에 노출할지 결정합니다.",
        "카테고리별 노출 관리 토글은 최소 한개 이상 선택되어야 합니다.",
      ],
      acrdList: {
        type: "category",
        data: [
          {
            label: "CS",
            column: "user_main_cs_flag",
            checked:
              session?.user.mainWordExpOpts?.cateFlags.user_main_cs_flag!,
          },
          {
            label: "Web",
            column: "user_main_web_flag",
            checked:
              session?.user.mainWordExpOpts?.cateFlags.user_main_web_flag!,
          },
          {
            label: "Native",
            column: "user_main_ntv_flag",
            checked:
              session?.user.mainWordExpOpts?.cateFlags.user_main_ntv_flag!,
          },
        ],
      },
    },
  ];

  return (
    <SettingWrap>
      <SettingProfileStyled>
        <Anchor width="100%" href="/Setting/Profile">
          <UserProfileComponent />
        </Anchor>
      </SettingProfileStyled>

      {wordAcrdList.map((wordAcrd, index) => {
        return (
          <ProfileWordsWrap key={index}>
            <ProfileWordTitleComponent
              typo={wordAcrd.acrdTitle}
              afterIcon={wordAcrd.toggleFlag ? "arr-up" : "arr-down"}
              onClick={() => {
                wordAcrd.toggleFunc((prev: boolean) => !prev);
              }}
            />

            <ProfileWordComponent isOpened={wordAcrd.toggleFlag}>
              {wordAcrd.acrdList.map((list, index) => (
                <ProfileWordItemComponent
                  typo={list.label}
                  color={list.color}
                  wordIcon={list.wordIcon}
                  key={index}
                />
              ))}
            </ProfileWordComponent>
          </ProfileWordsWrap>
        );
      })}
      <TypoComponent
        textAlign="left"
        marginTop="20px"
        marginBottom="12px"
        color="var(--color-grey)"
      >
        &bull;메인카드 노출 옵션
      </TypoComponent>
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
              {objAcrd.acrdList.data.map((list, index) => (
                <ToggleCheckComponent
                  key={index}
                  typo={list.label}
                  defaultChecked={list.checked}
                  reference={(checkbox: HTMLInputElement) =>
                    objAcrd.acrdList.type === "category"
                      ? (stateTogglesRef.current[index] = checkbox)
                      : void 0
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let arrTglsVld: boolean[] = [];
                    stateTogglesRef.current.map(
                      (toggle: HTMLInputElement, index: number) => {
                        arrTglsVld[index] = toggle.checked;
                      }
                    );
                    arrTglsVld.indexOf(true) === -1
                      ? (() => {
                          e.target.checked = true;
                          newAlert(
                            "카테고리 토글은 최소 한개이상 설정되어야 합니다.",
                            "ngtv"
                          );
                          return;
                        })()
                      : (() => {
                          const res = axios.post(
                            "http://localhost:3000" + "/api/user/opt",
                            {
                              column: list.column,
                              value: e.target.checked ? 1 : 0,
                            }
                          );
                          res.then((result) => {
                            result.status === 200
                              ? (() => {
                                  newAlert(
                                    `${list.label} 노출옵션이 ${
                                      e.target.checked ? "활성" : "비활성"
                                    }화 되었습니다.`,
                                    "pstv"
                                  );
                                  reloadSession();
                                })()
                              : void 0;
                          });
                        })();
                  }}
                />
              ))}
            </Accordion>
            {objAcrd.usageList && objAcrd.toggleFlag ? (
              <UsageComponent usageList={objAcrd.usageList} />
            ) : (
              <></>
            )}
          </AcrdWrapStyled>
        ))}
      </SettingTopStyled>
      <TypoComponent
        textAlign="left"
        marginTop="20px"
        marginBottom="12px"
        color="var(--color-grey)"
      >
        &bull;이 앱에 대해서
      </TypoComponent>
      <SettingBottomStyled>
        {modalComponents.map((item: modalComponentsTypes, index: number) => (
          <SettingListComponent
            key={index}
            typo={item.typo}
            onClick={modalOpenClick}
          />
        ))}

        <SettingListComponent typo="버전정보" rightTypo="1.0.0" />
        <SettingListComponent
          typo="로그아웃"
          color="var(--color-red)"
          onClick={() => {
            signOut({
              redirect: true,
              callbackUrl: "/Login",
            });
          }}
        />
      </SettingBottomStyled>
    </SettingWrap>
  );
};

export const getServerSideProps = async (context: any) => {
  return { props: {} };
};
export default Setting;
