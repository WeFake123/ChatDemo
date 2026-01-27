import "./styles/post.css"
import { API_URL } from "../App";

export const Post = ({ post, onClose }) => {

    console.log(post)

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
            <form action={() => console.log("hola")}>
                <input className="contenidosInput" type="text" placeholder="Comenta el post"/>
                <button>Enviar</button>
            </form>                   
        </div>
    </div>
  );
};
