import React from "react";
import styled from "styled-components";

interface RadioTypes {
  id: string;
  name: string;
  onClick?: any;
  defaultChecked?: boolean;
}

const RadioStyled = styled.input<RadioTypes>`
  appearance: none;
  width: 24px;
  height: 24px;
  vertical-align: middle;
  background-color: #fff;
  border: 1px solid var(--color-lightgrey);
  border-radius: 100%;
  position: relative;
  &:before {
    display: none;
    content: "";
    width: 16px;
    height: 16px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-point);
    border-radius: inherit;
    z-index: 1;
  }
  &:checked:before {
    display: inline-block;
  }
`;

const RadioComponent: React.FC<RadioTypes> = ({
  id,
  name,
  onClick,
  defaultChecked,
}) => {
  return (
    <RadioStyled
      type="radio"
      id={id}
      name={name}
      onClick={onClick}
      defaultChecked={defaultChecked}
    ></RadioStyled>
  );
};

RadioComponent.defaultProps = {};

export default RadioComponent;
