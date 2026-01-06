import { useState } from "react"
import "./newPost.css"

export const NewPost = () => {

    const Name1 = "Add Post";
    const Name2 = "Close Window"
    const[nameButton, setNameButton] = useState("Add Post");
    const[addPost, setAddPost] = useState(false);




    return(

        <>
            <div className="btnContainer">
                <button className="btn success" onClick={() => {setAddPost(!addPost), (addPost) ? setNameButton(Name1) : setNameButton(Name2)}}>{nameButton}</button>
            </div>

            
                <div className="postInput">
                {
                    (addPost) ? 

                    <form>
                        <input type="text" />Ingrese titulo del Post
                        <textarea name="" id="">contenido</textarea>
                        <button>Enviar</button>
                    </form>
                    
                    
                    
                    : null
                }
                </div>
        </>
    )



}