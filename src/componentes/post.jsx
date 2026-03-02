import "./styles/post.css";
import { API_URL, BD_URL } from "../config";
import { useEffect, useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import Spinner from "react-bootstrap/Spinner";
import { ImageModal } from "./modal";

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const [highlightUser, setHighlightUser] = useState(null);

  const [post, setPost] = useState(null);
  const [msj, setMsj] = useState("");
  const [chats, setChats] = useState([]);
  const [reply, setReply] = useState("");

  const [imagePost, setImagePost] = useState(null);

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const [sending, setSending] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);



  /* ========================= */
  /* SOCKET                    */
  /* ========================= */

useEffect(() => {
  socketRef.current = io(API_URL);

  socketRef.current.on("nuevo_mensaje", (nuevoChat) => {
    if (nuevoChat.idPost?.toString() === id) {
      setChats((prev) => [...prev, nuevoChat]);
    }
  });

  return () => {
    socketRef.current.disconnect();
  };
}, [id]);
  /* ========================= */
  /* TRAER POST                */
  /* ========================= */

  useEffect(() => {
    setLoadingPost(true);

    fetch(`${API_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLoadingPost(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPost(false);
      });
  }, [id]);

  /* ========================= */
  /* TRAER MENSAJES            */
  /* ========================= */

  useEffect(() => {
    setLoadingChats(true);

    fetch(`${API_URL}/posts/${id}/chat`)
      .then((res) => res.json())
      .then((data) => {
        setChats(data);
        setLoadingChats(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingChats(false);
      });
  }, [id]);

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

      if (imagePost) {
        const cloudFormData = new FormData();
        cloudFormData.append("file", imagePost);
        cloudFormData.append("upload_preset", "mi_preset_unsigned");
        cloudFormData.append("folder", "chats");

        const cloudResponse = await fetch(BD_URL, {
          method: "POST",
          body: cloudFormData,
        });

        const cloudData = await cloudResponse.json();
        imageUrl = cloudData.secure_url;
      }

      const response = await fetch(`${API_URL}/posts/${id}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: msj,
          idPost: id,
          serial: serialMsj,
          replyTo: reply,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      toast.success("Comentario enviado 🚀");
      setMsj("");
      setReply("");
      setImagePost(null);

    } catch (error) {
      toast.error("Error enviando comentario");
    } finally {
      setSending(false);
    }
  };

  /* ========================= */
  /* SCROLL A MENSAJE          */
  /* ========================= */

  const goToChat = (chatId) => {
    const el = document.getElementById(`chat-${chatId}`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("highlight");
    setTimeout(() => el.classList.remove("highlight"), 1200);
  };

  /* ========================= */
  /* SPINNER GLOBAL POST       */
  /* ========================= */

  if (loadingPost) {
    return (
      <div className="spinner-div">
        <Spinner
          animation="border"
          className="spinner"
          role="status"
          variant="light"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="spinner-div">
        <p style={{ color: "white" }}>Post no encontrado</p>
      </div>
    );
  }

  /* ========================= */
  /* RENDER                    */
  /* ========================= */

  return (
    <div className="postInterfaz">

      

      <div className="post">
        <button
        className="btnVolver"
        onClick={() => navigate("/")}
      >
        ← Volver
      </button>
        <h1 className="titlePost">{post.name}</h1>

        <div className="dataPost">
          {post.image && (
            <img
              className="postImage"
              src={post.image}
              alt={post.name}
              onClick={() => setSelectedImage(post.image)}
              style={{ cursor: "pointer" }}
            />
          )}

          <p className="text">{post.text}</p>
        </div>
      </div>

      <div className="chat">

        <form className="formChat-post" onSubmit={comentar}>

          {reply && (
    <div className="reply-preview">
      <span>
        Respondiendo a: &gt;&gt;
        {chats.find(c => c.id.toString() === reply.toString())?.serial}
      </span>

      <button
  type="button"
  onClick={() => {
    setReply("");
    setHighlightUser(null);
  }}
>
  ✕
</button>
    </div>
  )}
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

          {loadingChats && (
            <div className="spinner-div">
              <Spinner
                animation="border"
                className="spinner"
                role="status"
                variant="light"
              />
            </div>
          )}

          {!loadingChats && reversedChats.length === 0 && (
            <p className="sinComentariosTexto">
              Sé el primero en comentar…
            </p>
          )}

          {!loadingChats &&
  reversedChats.map((chat) => {

    const { data, id, serial, replyTo, image, authorHash } = chat;

    const mensajeRespondido = chats.find(
  (c) => c.id.toString() === replyTo?.toString()
    );

    return (
      <div
  className={`mensaje ${
    highlightUser === chat.authorHash ? "highlight-user" : ""
  }`}
  key={id}
  id={`chat-${id}`}
>

        <p
          className="mensaje-serial"
          onClick={() => {
    setReply(id);
    setHighlightUser(prev =>
      prev === chat.authorHash ? null : chat.authorHash
    );
  }}
        >
          {`>>${serial}`}
        </p>

        {replyTo && mensajeRespondido && (
          <p
            className="mensaje-reply"
            onClick={() => goToChat(replyTo)}
          >
            {`>>${mensajeRespondido.serial}`}
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

        <p className="mensaje-texto">{data}</p>

      </div>
    );
  })}

          <div ref={bottomRef} />
        </div>
      </div>

      <ImageModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};