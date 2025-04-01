import React from "react";

const WhatsappMessage = ({ setMessage, template }) => {
  const [message, setMessageState] = React.useState(template);

  const handleMessageChange = (e) => {
    setMessageState(e.target.value);
    setMessage(e.target.value);
  };

  return (
    <div>
      <h2>Mensaje WhatsApp:</h2>
      <input type="text" value={message} onChange={handleMessageChange} />
    </div>
  );
};

export default WhatsappMessage;
