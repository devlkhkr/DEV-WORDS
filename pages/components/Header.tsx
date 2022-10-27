import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";
import Logo from "../components/atoms/Logo";

const HeaderWrap = styled.header`
  background-color: blue;
  width: 100%;
  height: var(--height-header);
  background-color: #ffffff;
  position: relative;
  display: flex;
  justify-content: center;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrap>
      {/* <FontAwesomeIcon icon="fa-brands fa-discord" /> */}
      <HeaderLogo>
        {/* <FontAwesomeIcon icon={faBolt} />
        <h1>DINDER</h1> */}
        <Logo mainColor="var(--color-point)" subColor="#231815" />
      </HeaderLogo>
    </HeaderWrap>
  );
};

export default Header;
