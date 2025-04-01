import React from "react";

const ChannelSelection = ({ setForm, options, initialValue }) => {
  const [selections, setSelections] = React.useState(initialValue || []);

  const handleSeleccionChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelections((prev) => [...prev, e.target.value]);
    } else {
      setSelections((prev) => prev.filter((item) => item !== e.target.value));
    }
    setForm((prev) => ({
      ...prev,
      canal: isChecked
        ? [...(prev.canal || []), e.target.value]
        : (prev.canal || []).filter((item) => item !== e.target.value),
    }));
  };

  return (
    <div>
      <h2>Seleccione un canal:</h2>
      {options.map((option) => (
        <div key={option}>
          <input
            type="checkbox"
            name="canal"
            value={option}
            checked={selections.includes(option)}
            onChange={handleSeleccionChange}
          />
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default ChannelSelection;
