import { useEffect, useState } from "react"
import "./styles/newPost.css"
import { API_URL } from "../App";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";


export const NewPost = () => {


    const[addPost, setAddPost] = useState(false);


    const[titlePost, setTitlePost] = useState("");
    const[imagePost, setImagePost] = useState(null);
    const[contentPost, setContentPost] = useState("");


  //----------------------------------------------
const submitPost = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", titlePost);
  formData.append("text", contentPost);
  formData.append("image", imagePost);
  console.log(formData)

  if(!titlePost){
    toast.error('Debes agregar un titulo');
    return
  }
  if(!imagePost){
    toast.error("Necesitas agregar una imagen");
    return
  }
  if(!contentPost){
    toast.error("Necesitas agregar un texto");
    return
  }
  if(contentPost.length > 900){
    toast.error("Maximo de 900 caracteres");
    return
  }

  try {
    const response = await fetch(`${API_URL}/inicio`, {
      method: "POST",
      body: formData, // 👈 NO headers
    });

        console.log(response.status);

        
    if (response.status === 429) {
      const data = await response.json();
      toast.error(data.message); // 🔥 mensaje de espera
      return;
    }



    if (!response.ok) {
      throw new Error("Error al crear el post");
    }

    


    const data = await response.json();


    console.log("Post creado:", data);

    setTitlePost("");
    setImagePost(null);
    setContentPost("");
    setAddPost(false);

    toast.success('Posted')
  } catch (error) {
    toast.error("Error")
    console.error(error);
  }
};

  //-----------------------------------------------------------

  const validateTitle = (e) => {

    e.length > 36 ?     toast.error('Capacidad maxima 35 caracteres') : null

  }




    return(

        <>
          <div><Toaster/></div>
            <div className="btnContainer">


                <button className="btn success" onClick={() => {
                    setAddPost(prev => {

                        return !prev
                    })
                }}>Add Post</button>

            </div>


            <div className={`postInput ${addPost ? "show" : ""}`}>
              


                <form onSubmit={submitPost} className="formInput">
                                                      <span className="btn2 material-symbols-outlined warning" onClick={() => {
                            setAddPost(prev => {
                                return !prev
                            })
                        }}> close</span>
                    <h2 className="h2Formulario">Titulo</h2>
                    <input className="contenidosInput" type="text" placeholder="Ingrese título del post" maxLength={35} value={titlePost} onChange={(e) => {
                                setTitlePost(e.target.value);
                                validateTitle(e.target.value)}}/>
                    <h2 className="h2Formulario">Imagen</h2>
                    <input className="contenidosInput" type="file" name="image" accept="image/*" placeholder="Ingrese la direccion de la imagen" onChange={(e) => setImagePost(e.target.files[0])}/>
                      <h2 className="h2Formulario">Contenido</h2>
                    <textarea className="contenidosInput textArea" placeholder="Ingrese el contenido del post" value={contentPost} onChange={(e) => setContentPost(e.target.value)}></textarea>
                          
                    
                      <button type="submit" className="btn3 success">
                            Postear 
                      </button>

                                    
                                    


                
                        </form>



                
                    
             
            </div>
        </>
    )



}