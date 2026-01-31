import "./styles/post.css"
import { API_URL } from "../App";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export const Post = ({ post, onClose }) => {


  const[msj, setMsj] = useState("");
  const[chats, setChats] = useState([])
  
  useEffect(() => {
         fetch(`${API_URL}/inicio/${post.id}`)
             .then(res => res.json())
             .then(data => setChats(data))
             .catch(err => console.error(err));
     }, []);



  console.log(chats)


  const comentar = async (e) => {

  e.preventDefault();

      if(msj.length == 0){
        toast.error("Debes escribir algo");
        return
      }


    try {
    const response = await fetch(`${API_URL}/inicio/${post.id}`, {
      method: "POST",
      body: JSON.stringify({ data: msj, idPost: post.id}),
    headers: {
      "Content-Type": "application/json"
    }
    });

    const data = await response.json();
    console.log("comentario creado:", data);
    toast.success('Comentario enviado')

  }catch (error) {
    console.error(error);
  }
}



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
            <form className="formChat-post" onSubmit={comentar}>
                <input className="contenidosInput-post" type="text" placeholder="Comenta el post" value={msj} onChange={(e) => setMsj(e.target.value)}/>
                <button className="botonEnviar-post">Enviar</button>    
            </form> 

            <div>

              {chats.map(({data,id}) => <p className="mensaje" key={id}>{data}</p>)}

            </div>

        </div>
    </div>
  );
};
