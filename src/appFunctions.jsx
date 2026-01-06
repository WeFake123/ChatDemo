export const enviarMensaje = async (e) => {
    e.preventDefault(); // ⬅️ CLAVE

    if (!nombre || !mensaje) {
      alert("No se permiten campos vacíos");
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          text: mensaje,
        }),
      });

      if (!res.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      const data = await res.json();
      console.log("Mensaje enviado:", data);

      setNombre("");
      setMensaje("");

      // opcional: refrescar mensajes
      setText((prev) => [...prev, data]);

    } catch (error) {
      console.error(error);
    }
  };


  //-------------

    export  const cargarMensajes = async () => {
        try {
          const res = await fetch(API_URL);
  
          if (!res.ok) {
            throw new Error("Error al obtener mensajes");
          }
  
          const data = await res.json();
          setText(data);
        } catch (error) {
          console.error(error);
        }
      };