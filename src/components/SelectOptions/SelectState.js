import React, { useEffect, useState } from "react";
import Select from "react-select";
import MethodGet from "../../config/service";
const SelectState = ({ detectarCambiosState, defaultValue }) => {
  const [states, saveStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    MethodGet("/states")
      .then((res) => saveStates(res.data.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (defaultValue && states.length) {
      const stateOption = states.find((s) => s.id === defaultValue.id);
      setSelectedState(
        stateOption ? { value: stateOption.id, label: stateOption.name } : null
      );
    }
  }, [defaultValue, states]);

  const selectStyles = { menu: (base) => ({ ...base, zIndex: 100 }) };

  const handleChange = (value) => {
    setSelectedState(value);
    detectarCambiosState(value);
  };

  return (
    <>
      <label>Selecciona un estado</label>
      <Select
        required
        styles={selectStyles}
        onChange={handleChange}
        classNamePrefix="select"
        placeholder="Selecciona un estado"
        options={states.map((state) => ({
          label: state.name,
          value: state.id,
        }))}
        value={selectedState}
      />
    </>
  );
};

export default SelectState;
