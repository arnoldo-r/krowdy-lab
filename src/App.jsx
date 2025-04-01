import React, { useState } from "react";
import FormTemplate from "./components/FormTemplate";
import ChannelSelection from "./components/ChannelSelection";
import SmsMessage from "./components/SmsMessage";
import EmailMessage from "./components/EmailMessage";
import WhatsappMessage from "./components/WhatsappMessage";

function App() {
  const [formulario, setFormulario] = useState({
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
      sms: "Invitación",
      email: { subject: "Invitación", message: "Usted ha sido invitado" },
      whatsapp: "Invitación",
    },
    recordatorio: {
      sms: "Recordatorio",
      email: { subject: "Recordatorio", message: "Recuerde su cita" },
      whatsapp: "Recordatorio",
    },
    personalizado: {
      sms: "",
      email: { subject: "", message: "" },
      whatsapp: "",
    },
  };

  const etapas = [
    <FormTemplate
      setForm={setFormulario}
      options={["invitado", "recordatorio", "personalizado"]}
      name="plantilla"
      initialValue={formulario.plantilla}
    />,
    <ChannelSelection
      setForm={setFormulario}
      options={["sms", "correo", "whatsapp"]}
      name="canal"
      initialValue={formulario.canal}
    />,
  ];

  const canales = formulario.canal;

  if (canales.includes("sms")) {
    etapas.push(
      <SmsMessage
        setMessage={(message) =>
          setFormulario((prev) => ({ ...prev, smsMessage: message }))
        }
        template={templates[formulario.plantilla].sms}
      />
    );
  }

  if (canales.includes("correo")) {
    etapas.push(
      <EmailMessage
        setSubject={(subject) =>
          setFormulario((prev) => ({ ...prev, emailSubject: subject }))
        }
        setMessage={(message) =>
          setFormulario((prev) => ({ ...prev, emailMessage: message }))
        }
        templateSubject={templates[formulario.plantilla].email.subject}
        templateMessage={templates[formulario.plantilla].email.message}
      />
    );
  }

  if (canales.includes("whatsapp")) {
    etapas.push(
      <WhatsappMessage
        setMessage={(message) =>
          setFormulario((prev) => ({ ...prev, whatsappMessage: message }))
        }
        template={templates[formulario.plantilla].whatsapp}
      />
    );
  }

  const handleSiguiente = () => {
    if (etapaActual < etapas.length - 1) {
      setEtapaActual((prev) => prev + 1);
    } else {
      console.log("Formulario completo:", formulario);
    }
  };

  const handleAtras = () => {
    if (etapaActual > 0) {
      setEtapaActual((prev) => prev - 1);
    }
  };

  const handleCancelar = () => {
    setFormulario({
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
      <div style={{ marginTop: "20px" }}>
        {etapaActual === 0 ? (
          <button onClick={handleCancelar}>Cancelar</button>
        ) : (
          <button onClick={handleAtras}>Atrás</button>
        )}
        {etapaActual === etapas.length - 1 ? (
          <button onClick={handleSiguiente}>Enviar</button>
        ) : (
          <button
            onClick={handleSiguiente}
            disabled={
              (etapaActual === 0 && !formulario.plantilla) ||
              (etapaActual === 1 &&
                (!formulario.canal || formulario.canal.length === 0)) ||
              (etapaActual === 2 &&
                formulario.canal.includes("sms") &&
                !formulario.smsMessage) ||
              (etapaActual === 3 &&
                formulario.canal.includes("correo") &&
                (!formulario.emailSubject || !formulario.emailMessage)) ||
              (etapaActual === 4 &&
                formulario.canal.includes("whatsapp") &&
                !formulario.whatsappMessage)
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
