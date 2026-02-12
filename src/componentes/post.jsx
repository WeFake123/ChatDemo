import "./styles/post.css"
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io(API_URL);

export const Post = ({ post, onClose }) => {

  const [msj, setMsj] = useState("");
  const [chats, setChats] = useState([]);
  const [reply, setReply] = useState("");
  const [newChats, setNewChats] = useState([])
  const[isNewChat, setIsNewChat] = useState(false)
  const[ImagePost, setImagePost] = useState(null);


  // 🔥 SOCKET LISTENERS
  useEffect(() => {

    socket.on("connect", () => {
      console.log("Conectado al servidor:", socket.id);
    });

    socket.on("nuevo_mensaje", (nuevoChat) => {
      console.log("Mensaje recibido en front:", nuevoChat);
      setNewChats(prev => [...prev, nuevoChat]);
      setIsNewChat(true)
    });

    return () => {
      socket.off("connect");
      socket.off("nuevo_mensaje");
    };

  }, []);

  // 🔥 TRAER MENSAJES DEL POST
  useEffect(() => {
    fetch(`${API_URL}/inicio/${post.id}`)
      .then(res => res.json())
      .then(data => setChats(data))
      .catch(err => console.error(err));
  }, [post.id]);

  const reversedChats = [...chats].reverse();

const comentar = async (e) => {
  e.preventDefault();

  if (msj.length === 0) {
    toast.error("Debes escribir algo");
    return;
  }

  let repeat = true;
  let serialMsj;

  while (repeat) {
    serialMsj = Math.floor(Math.random() * 100000);
    const existe = chats.some(i => i.serial === serialMsj);
    if (!existe) repeat = false;
  }

  try {
    const formData = new FormData();

    formData.append("data", msj);
    formData.append("idPost", post.id);
    formData.append("serial", serialMsj);
    formData.append("replyTo", reply);

    if (ImagePost) {
      formData.append("image", ImagePost);
    }

    const response = await fetch(`${API_URL}/inicio/${post.id}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    toast.success("Comentario enviado");
    setMsj("");
    setReply("");
    setImagePost(null);

  } catch (error) {
    console.error(error);
  }
};


  const goToChat = (serial) => {
    const el = document.getElementById(`chat-${serial}`);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });

    el.classList.add("highlight");
    setTimeout(() => el.classList.remove("highlight"), 1200);
  };

  //---------------------------------------------------------------

  return (
    <div className="postInterfaz">
      <div className="post">
        <div>
          <span className="btn2 material-symbols-outlined warning" onClick={onClose}>close</span>
          <h1 className="titlePost">{post.name}</h1>
        </div>

        <div className="textPost">
          <img
            className="postImage"
            src={`${API_URL.replace(/\/$/, "")}/uploads/${post.image}`}
            alt="post"
            width={"500px"}
            height={"500px"}
          />
          <p className="text">{post.text}</p>
        </div>
      </div>

      <div className="chat">

        {reply &&
          <div className="formChat-reply">
            <p className="formChat-reply-text" onClick={() => goToChat(reply)}>
              responderle a {reply}
            </p>
            <p className="formChat-reply-cancel" onClick={() => setReply("")}>
              cancelar
            </p>
          </div>
        }

        <form className="formChat-post" onSubmit={comentar}>
          <input
            className="contenidosInput-post"
            type="text"
            placeholder="Comenta el post"
            value={msj}
            onChange={(e) => setMsj(e.target.value)}
          />
          <input className="contenidosInput" type="file" name="image" accept="image/*" placeholder="Ingrese la direccion de la imagen" onChange={(e) => setImagePost(e.target.files[0])}/>

          <button className="botonEnviar-post">Enviar</button>
        </form>

        <div className="chat-mensajes">
          {isNewChat ? <p onClick={ () => {setIsNewChat(false)
            setChats(prev => [...prev, ...newChats]);
            console.log(chats)
}
           }>Cargar mensajes nuevos</p>: null  }
          {reversedChats.map(({ data, id, serial, replyTo }) => (
            <div className="mensaje" key={id} id={`chat-${serial}`}>
              <p className="mensaje-serial" onClick={() => setReply(serial)}>
                {`>>${serial}`}
              </p>

              {replyTo &&
                <p className="mensaje-reply" onClick={() => goToChat(replyTo)}>
                  {`>>${replyTo}`}
                </p>
              }

              <p className="mensaje-texto">{data}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
