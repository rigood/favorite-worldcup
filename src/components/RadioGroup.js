import { RadioContext } from "../context/RadioContext";

function RadioGroup({ label, children, ...rest }) {
  return (
    <fieldset>
      <legend>
        {label}
        <span>*</span>
      </legend>
      <RadioContext.Provider value={rest}>{children}</RadioContext.Provider>
    </fieldset>
  );
}

export default RadioGroup;
