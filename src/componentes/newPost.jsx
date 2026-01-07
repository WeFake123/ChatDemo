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
                <button className="btn success" onClick={() => {
                    setAddPost(prev => {
                        setNameButton(prev ? Name1 : Name2)
                        return !prev
                    })
                }}>{nameButton}</button>
                
            </div>

            
            <div className={`postInput ${addPost ? "show" : ""}`}>
                <form>
                    <input type="text" placeholder="Ingrese título del post" />
                    <textarea placeholder="Contenido"></textarea>
                    <button>Enviar</button>
                </form>
            </div>
        </>
    )



}