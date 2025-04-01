import React from "react";

const FormTemplate = ({ setForm, options, initialValue }) => {
  const [value, setValue] = React.useState(initialValue || "");

  const handleValueChange = (e) => {
    setValue(e.target.value);
    setForm((prev) => ({ ...prev, plantilla: e.target.value }));
  };

  return (
    <div>
      <h2>Seleccione una plantilla:</h2>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            name="plantilla"
            value={option}
            checked={value === option}
            onChange={handleValueChange}
          />
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default FormTemplate;
