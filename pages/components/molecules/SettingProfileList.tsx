import React from "react";
import styled from "styled-components";

import InputText from "../atoms/InputText";
import TypoComponent from "../atoms/Typo";
import styledInterface from "../Intefaces/styledComponent";

interface ProfileListTypes extends styledInterface {
  typo : string;
  userInfo?: string;
}

const ProfileListWrap = styled.dl`
  display : flex;
  align-items : center;
  dt {
    min-width : 80px;
  }
  dd {
    width : calc(100% - 80px);
  }
`

const ProfileListComponent: React.FC<ProfileListTypes> = (props) => {
  const { typo, color, userInfo } = props;
  console.log(userInfo)
  return (
    <ProfileListWrap>
      <dt>
        <TypoComponent
          fontSize="14px"
          fontWeight="regular"
          textAlign="left"
          color={color}
        >
          {typo}
        </TypoComponent>
      </dt>
      <dd>
        {/* FIXME : input value ? */}
        <InputText type="text" placeHolder={userInfo} />
      </dd>
    </ProfileListWrap>
  );
};

ProfileListComponent.defaultProps = {};

export default ProfileListComponent;
