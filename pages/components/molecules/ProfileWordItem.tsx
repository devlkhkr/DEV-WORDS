import React from "react";
import styled from "styled-components";
import styledInterface from "../Intefaces/styledComponent";
import Icon from "../atoms/Icon";
import TypoComponent from "../atoms/Typo";

import {
  faLightbulb,
  faCircleQuestion,
  faStar,
  faForward,
} from "@fortawesome/free-solid-svg-icons";

interface ProfileWordTitleTypes extends styledInterface {
  typo: string;
  color: string;
  wordIcon: string;
}

const ProfileWordItem = styled.li`
  width: calc(25% - 24px / 4);
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.color || "var(--color-black)"};
  > div {
    &:nth-child(2) {
      /* FIXME: 4px 도 앵춘일까 */
      margin-bottom: 4px;
    }
  }
`;

const ProfileWordIconWrap = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 50%;
  background-color: #eaeaea;
`;

const ProfileWordItemComponent: React.FC<ProfileWordTitleTypes> = (props) => {
  const { typo, color, wordIcon } = props;

  const setWordIcon = () => {
    switch (wordIcon) {
      case "know":
        return (
          <Icon
            iconShape={faLightbulb}
            iconWidth="14px"
            iconHeight="14px"
            svgSize="14px"
            color="var(--color-grey)"
          />
        );
      case "dontknow":
        return (
          <Icon
            iconShape={faCircleQuestion}
            iconWidth="14px"
            iconHeight="14px"
            svgSize="14px"
            color="var(--color-grey)"
          />
        );
      case "favorite":
        return (
          <Icon
            iconShape={faStar}
            iconWidth="14px"
            iconHeight="14px"
            svgSize="14px"
            color="var(--color-grey)"
          />
        );
      case "skip":
        return (
          <Icon
            iconShape={faForward}
            iconWidth="14px"
            iconHeight="14px"
            svgSize="14px"
            color="var(--color-grey)"
          />
        );
      default:
        return;
    }
  };

  return (
    <ProfileWordItem>
      {wordIcon && <ProfileWordIconWrap>{setWordIcon()}</ProfileWordIconWrap>}
      <TypoComponent fontSize="12px" fontWeight="medium" color={color}>
        {typo}
      </TypoComponent>
      <TypoComponent
        fontSize="12px"
        fontWeight="semi-bold"
        color="var(--color-point)"
      >
        0개
      </TypoComponent>
    </ProfileWordItem>
  );
};

ProfileWordItemComponent.defaultProps = {};

export default ProfileWordItemComponent;
