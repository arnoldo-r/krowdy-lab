import React from "react";

const SmsMessage = ({ setMessage, template }) => {
  const [message, setMessageState] = React.useState(template);

  const handleMessageChange = (e) => {
    setMessageState(e.target.value);
    setMessage(e.target.value);
  };

  return (
    <div>
      <h2>Mensaje SMS:</h2>
      <input type="text" value={message} onChange={handleMessageChange} />
    </div>
  );
};

export default SmsMessage;
