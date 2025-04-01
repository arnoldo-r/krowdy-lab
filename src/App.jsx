import React, { useState } from "react";
import FormTemplate from "./components/FormTemplate";
import ChannelSelection from "./components/ChannelSelection";
import SmsMessage from "./components/SmsMessage";
import EmailMessage from "./components/EmailMessage";
import WhatsappMessage from "./components/WhatsappMessage";

function App() {
  const [form, setForm] = useState({
    plantilla: "",
    canal: [],
    smsMessage: "",
    emailSubject: "",
    emailMessage: "",
    whatsappMessage: "",
  });
  const [etapaActual, setEtapaActual] = useState(0);

  const templates = {
    invitado: {
      sms: "Invitación para [user] a una entrevista",
      email: {
        subject: "Invitación",
        message: "[user] ha sido invitado a una entrevista",
      },
      whatsapp: "Invitación para [user] a una entrevista",
    },
    recordatorio: {
      sms: "Recordatorio para [user]",
      email: {
        subject: "Recordatorio",
        message: "[user] recuerde su entrevista",
      },
      whatsapp: "Recordatorio para [user]",
    },
    personalizado: {
      sms: "",
      email: { subject: "", message: "" },
      whatsapp: "",
    },
  };

  const etapas = [
    <FormTemplate
      setForm={setForm}
      options={["invitado", "recordatorio", "personalizado"]}
      initialValue={form.plantilla}
    />,
    <ChannelSelection
      setForm={setForm}
      options={["sms", "correo", "whatsapp"]}
      initialValue={form.canal}
    />,
  ];

  const canales = form.canal;

  if (canales.includes("sms")) {
    etapas.push(
      <SmsMessage
        setMessage={(message) =>
          setForm((prev) => ({ ...prev, smsMessage: message }))
        }
        template={templates[form.plantilla].sms}
      />
    );
  }

  if (canales.includes("correo")) {
    etapas.push(
      <EmailMessage
        setSubject={(subject) =>
          setForm((prev) => ({ ...prev, emailSubject: subject }))
        }
        setMessage={(message) =>
          setForm((prev) => ({ ...prev, emailMessage: message }))
        }
        templateSubject={templates[form.plantilla].email.subject}
        templateMessage={templates[form.plantilla].email.message}
      />
    );
  }

  if (canales.includes("whatsapp")) {
    etapas.push(
      <WhatsappMessage
        setMessage={(message) =>
          setForm((prev) => ({ ...prev, whatsappMessage: message }))
        }
        template={templates[form.plantilla].whatsapp}
      />
    );
  }

  const handleSiguiente = () => {
    if (etapaActual < etapas.length - 1) {
      setEtapaActual((prev) => prev + 1);
    }
  };

  const handleEnviar = () => {
    console.log(form);
  };

  const handleAtras = () => {
    if (etapaActual > 0) {
      setEtapaActual((prev) => prev - 1);
    }
  };

  const handleCancelar = () => {
    setForm({
      plantilla: "",
      canal: [],
      smsMessage: "",
      emailSubject: "",
      emailMessage: "",
      whatsappMessage: "",
    });
    setEtapaActual(0);
  };

  return (
    <div>
      {etapas[etapaActual]}
      <div>
        {etapaActual === 0 ? (
          <button onClick={handleCancelar}>Cancelar</button>
        ) : (
          <button onClick={handleAtras}>Atrás</button>
        )}
        {etapaActual === etapas.length - 1 && etapaActual !== 1 ? (
          <button onClick={handleEnviar}>Enviar</button>
        ) : (
          <button
            onClick={handleSiguiente}
            disabled={
              (etapaActual === 0 && !form.plantilla) ||
              (etapaActual === 1 && (!form.canal || form.canal.length === 0)) ||
              (etapaActual === 2 &&
                form.canal.includes("sms") &&
                !form.smsMessage) ||
              (etapaActual === 3 &&
                form.canal.includes("correo") &&
                (!form.emailSubject || !form.emailMessage)) ||
              (etapaActual === 4 &&
                form.canal.includes("whatsapp") &&
                !form.whatsappMessage)
            }
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
