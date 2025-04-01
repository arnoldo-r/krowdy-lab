import React from "react";

const EmailMessage = ({
  setSubject,
  setMessage,
  templateSubject,
  templateMessage,
}) => {
  const [subject, setSubjectState] = React.useState(templateSubject);
  const [message, setMessageState] = React.useState(templateMessage);

  const handleSubjectChange = (e) => {
    setSubjectState(e.target.value);
    setSubject(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessageState(e.target.value);
    setMessage(e.target.value);
  };

  return (
    <div>
      <h2>Mensaje Correo:</h2>
      <input
        type="text"
        placeholder="Asunto"
        value={subject}
        onChange={handleSubjectChange}
      />
      <textarea value={message} onChange={handleMessageChange} />
    </div>
  );
};

export default EmailMessage;
