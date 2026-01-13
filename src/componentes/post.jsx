import "./styles/post.css"
import { API_URL } from "../App";

export const Post = ({ post, onClose }) => {

    console.log(post)

  return (
    <div className="postInterfaz">
        <div className="post">
                  <div>
                    <button onClick={onClose}>Cerrar</button>
                    <h1 className="titlePost">{post.name}</h1>
                    <img className="postImage" src={`${API_URL.replace(/\/$/, "")}/${post.image}`}
                                          alt="post"
                                          width={"450px"}
                                          height={"450px"}/>
                  </div>
                  <div className="textPost">
                       <p className="text">{post.text}</p>
                  </div>

        </div>

        <div>
          <h1>Chat</h1>
        </div>

    </div>
  );
};
