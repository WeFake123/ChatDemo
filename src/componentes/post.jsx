import "./styles/post.css";
import { API_URL, BD_URL } from "../../config";
import { useEffect, useState, useMemo, useRef } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import Spinner from "react-bootstrap/Spinner";
import { ImageModal } from "./modal.jsx";


export const Post = ({ post, onClose }) => {
  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const [msj, setMsj] = useState("");
  const [chats, setChats] = useState([]);
  const [reply, setReply] = useState("");
  const [newChats, setNewChats] = useState([]);
  const [isNewChat, setIsNewChat] = useState(false);
  const [imagePost, setImagePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  /* ========================= */
  /* SOCKET                    */
  /* ========================= */

  useEffect(() => {
    socketRef.current = io(API_URL);

    socketRef.current.on("connect", () => {
      console.log("Conectado:", socketRef.current.id);
    });

    socketRef.current.on("nuevo_mensaje", (nuevoChat) => {
      setNewChats((prev) => [...prev, nuevoChat]);
      setIsNewChat(true);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  /* ========================= */
  /* TRAER MENSAJES            */
  /* ========================= */

  useEffect(() => {
    setLoading(true);

    fetch(`${API_URL}/inicio/${post.id}`)
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [post.id]);

  /* ========================= */
  /* AUTO SCROLL               */
  /* ========================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  /* ========================= */
  /* MEMO REVERSE              */
  /* ========================= */

  const reversedChats = useMemo(() => {
    return [...chats].reverse();
  }, [chats]);

  /* ========================= */
  /* COMENTAR                  */
  /* ========================= */

  const comentar = async (e) => {
    e.preventDefault();

    if (!msj.trim()) {
      toast.error("Debes escribir algo");
      return;
    }

const serialMsj = Date.now().toString().slice(-6);
    try {
      setSending(true);

      let imageUrl = null;

      // Subir imagen si existe
      if (imagePost) {
        const cloudFormData = new FormData();
        cloudFormData.append("file", imagePost);
        cloudFormData.append("upload_preset", "mi_preset_unsigned");
        cloudFormData.append("folder", "chats");

        const cloudResponse = await fetch(BD_URL, {
          method: "POST",
          body: cloudFormData,
        });

        if (!cloudResponse.ok) {
          throw new Error("Error subiendo imagen");
        }

        const cloudData = await cloudResponse.json();
        imageUrl = cloudData.secure_url;
      }

      // Enviar comentario
      const response = await fetch(`${API_URL}/inicio/${post.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: msj,
          idPost: post.id,
          serial: serialMsj,
          replyTo: reply,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Error enviando comentario");
      }

      toast.success("Comentario enviado 🚀");
      setMsj("");
      setReply("");
      setImagePost(null);

    } catch (error) {
      console.error(error);
      toast.error("Error enviando comentario");
    } finally {
      setSending(false);
    }
  };

  /* ========================= */
  /* SCROLL A MENSAJE          */
  /* ========================= */

  const goToChat = (serial) => {
    const el = document.getElementById(`chat-${serial}`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    el.classList.add("highlight");
    setTimeout(() => el.classList.remove("highlight"), 1200);
  };

  /* ========================= */
  /* RENDER                    */
  /* ========================= */

  return (
    <div className="postInterfaz">
    
      <div className="post">

        <div>


          <h1 className="titlePost">{post.name}</h1>
        </div>

        <div className="dataPost">
          <img
            className="postImage"
            src={post.image}
            alt={post.name}
            onClick={() => setSelectedImage(post.image)}
  style={{ cursor: "pointer" }}
          />
                <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

          <p className="text">{post.text}</p>
        </div>
      </div>

      <div className="chat">
        {reply && (
          <div className="formChat-reply">
            <p
              className="formChat-reply-text"
              onClick={() => goToChat(reply)}
            >
              responderle a {reply}
            </p>

            <p
              className="formChat-reply-cancel"
              onClick={() => setReply("")}
            >
              cancelar
            </p>
          </div>
        )}

        <form className="formChat-post" onSubmit={comentar}>
          <input
            className="contenidosInput-post"
            type="text"
            placeholder="Comenta el post"
            value={msj}
            onChange={(e) => setMsj(e.target.value)}
          />

          <input
            className="contenidosInput-post"
            type="file"
            accept="image/*"
            onChange={(e) => setImagePost(e.target.files[0])}
          />

          <button
            className="botonEnviar-post"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar"}
          </button>
        </form>

        <div className="chat-mensajes">
          <div className="cargarPost-contenedor">
            {isNewChat && (
              <p
                className="cargarPost"
                onClick={() => {
                  setIsNewChat(false);
                  setChats((prev) => [...prev, ...newChats]);
                  setNewChats([]);
                }}
              >
                Cargar mensajes nuevos
              </p>
            )}
          </div>

          {loading && (
            <div className="spinner-div">
              <Spinner
                animation="border"
                className="spinner"
                role="status"
                variant="light"
              />
            </div>
          )}

          {!loading && reversedChats.length === 0 && (
            <p className="sinComentariosTexto">
              Sé el primero en comentar…
            </p>
          )}

          {reversedChats.map(
            ({ data, id, serial, replyTo, image }) => (
              <div
                className="mensaje"
                key={id}
                id={`chat-${serial}`}
              >
                <p
                  className="mensaje-serial"
                  onClick={() => setReply(serial)}
                >
                  {`>>${serial}`}
                </p>

                {replyTo && (
                  <p
                    className="mensaje-reply"
                    onClick={() => goToChat(replyTo)}
                  >
                    {`>>${replyTo}`}
                  </p>
                )}

                {image && (
                  <img
                    src={image}
                    alt="chat"
                    className="chatImage"
                    onClick={() => setSelectedImage(image)}
  style={{ cursor: "pointer" }}
                  />
                  
                )}
                <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />

                <p className="mensaje-texto">{data}</p>
              </div>
            )
          )}

          <div ref={bottomRef} />
        </div>
      </div>

    </div>
  );
};