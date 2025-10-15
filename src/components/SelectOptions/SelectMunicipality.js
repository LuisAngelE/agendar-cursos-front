import React, { useEffect, useState } from "react";
import Select from "react-select";
import MethodGet from "../../config/service";
const SelectMunicipality = ({
  state_id,
  detectarCambiosMunicipality,
  defaultValue,
}) => {
  const [municipalities, saveMunicipalities] = useState([]);
  const [selectedMuni, setSelectedMuni] = useState(null);

  useEffect(() => {
    if (state_id) {
      MethodGet(`/states/municipalities/${state_id}`)
        .then((res) => saveMunicipalities(res.data.data))
        .catch(console.log);
    } else {
      saveMunicipalities([]);
      setSelectedMuni(null);
    }
  }, [state_id]);

  useEffect(() => {
    if (defaultValue && municipalities.length) {
      const muniOption = municipalities.find((m) => m.id === defaultValue.id);
      setSelectedMuni(
        muniOption ? { value: muniOption.id, label: muniOption.name } : null
      );
    }
  }, [defaultValue, municipalities]);

  const selectStyles = { menu: (base) => ({ ...base, zIndex: 100 }) };

  const handleChange = (value) => {
    setSelectedMuni(value);
    detectarCambiosMunicipality(value);
  };

  return (
    <>
      <Select
        required
        styles={selectStyles}
        onChange={handleChange}
        classNamePrefix="select"
        placeholder="Selecciona un municipio"
        options={municipalities.map((m) => ({ label: m.name, value: m.id }))}
        value={selectedMuni}
      />
    </>
  );
};

export default SelectMunicipality;
