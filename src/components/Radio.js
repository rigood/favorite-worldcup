import { useContext } from "react";
import { RadioContext } from "../context/RadioContext";
import styled from "styled-components";

const Label = styled.label`
  font-size: 20px;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;

const Input = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 10px;
  border-radius: 50%;
  border: max(2px, 0.1rem) solid lightgray;
  vertical-align: middle;
  cursor: pointer;
  transition: border 0.3s ease-in-out;
  &:checked {
    border: 0.5rem solid var(--primary);
  }
  &:focus-visible {
    outline-offset: max(2px, 0.1rem);
    outline: max(2px, 0.1rem) dotted var(--primary);
  }
`;

const Span = styled.span`
  vertical-align: middle;
  cursor: pointer;
`;

function Radio({ value, name, disabled, children }) {
  const group = useContext(RadioContext);

  return (
    <Label>
      <Input
        type="radio"
        name={name}
        value={value}
        disabled={disabled || group.disabled}
        checked={group.value !== undefined ? value === group.value : undefined}
        onChange={(e) => group.onChange && group.onChange(e.target.value)}
      />
      <Span>{children}</Span>
    </Label>
  );
}

export default Radio;
