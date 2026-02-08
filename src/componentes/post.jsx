import "./styles/post.css"
import { API_URL } from "../App";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export const Post = ({ post, onClose }) => {


  const[msj, setMsj] = useState("");
  const[chats, setChats] = useState([])
  const[reply, setReply] = useState("")
  
  useEffect(() => {
         fetch(`${API_URL}/inicio/${post.id}`)
             .then(res => res.json())
             .then(data => setChats(data))
             .catch(err => console.error(err));
     }, []);

      const reversedChats = [];

    for (let i = chats.length - 1; i >= 0; i--) {
    reversedChats.push(chats[i]);
    }


  const comentar = async (e) => {

  e.preventDefault();

    let repeat = true;
    let serialMsj;

    while (repeat) {
      serialMsj = Math.floor(Math.random() * 100000);

      const existe = chats.some(i => i.serial === serialMsj);

      if (!existe) {
        repeat = false;
      }
    }


    console.log(serialMsj);

      if(msj.length == 0){
        toast.error("Debes escribir algo");
        return
      }


    try {
    const response = await fetch(`${API_URL}/inicio/${post.id}`, {
      method: "POST",
      body: JSON.stringify({ data: msj, idPost: post.id, serial: serialMsj, replyTo: reply}),
    headers: {
      "Content-Type": "application/json"
    },
    });

    const data = await response.json();
    console.log("comentario creado:", data);
    toast.success('Comentario enviado')

  }catch (error) {
    console.error(error);
  }
}

const goToChat = (serial) => {
  const el = document.getElementById(`chat-${serial}`);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });

  el.classList.add("highlight");
  setTimeout(() => el.classList.remove("highlight"), 1200);
};


  return (
    <div className="postInterfaz">
        <div className="post">
                  <div>
                    
                    <span className="btn2 material-symbols-outlined warning" onClick={onClose}>close</span>
                    <h1 className="titlePost">{post.name}</h1>

                  </div>
                  <div className="textPost">

                                        <img className="postImage"                             
                                          src={`${API_URL.replace(/\/$/, "")}/uploads/${post.image}`}
                                          alt="post"
                                          width={"400px"}
                                          height={"400px"}/>
                       <p className="text">{post.text}</p>
                  </div>

        </div>

        <div className="chat">
                          {(reply) ? <div className="formChat-reply"><p className="formChat-reply-text" onClick={() => goToChat(reply)}>responderle a {reply}</p> <p className="formChat-reply-cancel" onClick={() => setReply("")}>cancelar</p></div> : null} 

            <form className="formChat-post" onSubmit={comentar}>

                <input className="contenidosInput-post" type="text" placeholder="Comenta el post" value={msj} onChange={(e) => setMsj(e.target.value)}/>
                <button className="botonEnviar-post">Enviar</button>    
            </form> 

            <div className="chat-mensajes">
              {reversedChats.map(({data,id, serial, replyTo}) => <div className="mensaje" key={id}  id={`chat-${serial}`}> 
                                                  <p className="mensaje-serial" onClick={() => setReply(serial)}>{`>>${serial}`}</p>
                                                  {replyTo ?  <p className="mensaje-reply" onClick={() => goToChat(replyTo)}>{`>>${replyTo}`}</p> : null}
                                                  <p className="mensaje-texto">{data}</p>  
                                                </div>)}

            </div>

        </div>
    </div>
  );
};
