import React from "react";

const FormTemplate = ({ setForm, options, name, initialValue }) => {
  const [value, setValue] = React.useState(initialValue || "");

  const handleValueChange = (e) => {
    setValue(e.target.value);
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div>
      <h2>Seleccione una {name}:</h2>
      {options.map((option) => (
        <div key={option}>
          <input
            type="radio"
            name={name}
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
