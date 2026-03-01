import { useState } from "react";
import "./styles/newPost.css";
import { API_URL, BD_URL } from "../../config";
import toast, { Toaster } from "react-hot-toast";

export const NewPost = () => {

  const [addPost, setAddPost] = useState(false);
  const [titlePost, setTitlePost] = useState("");
  const [imagePost, setImagePost] = useState(null);
  const [contentPost, setContentPost] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------
  const submitPost = async (e) => {
    e.preventDefault();

    if (!titlePost.trim()) return toast.error("Debes agregar un título");
    if (!imagePost) return toast.error("Necesitas agregar una imagen");
    if (!contentPost.trim()) return toast.error("Necesitas agregar un texto");
    if (contentPost.length > 900) return toast.error("Máximo de 900 caracteres");

    // 🔥 Validar tamaño imagen (5MB)
    if (imagePost.size > 5 * 1024 * 1024) {
      return toast.error("La imagen no puede superar 5MB");
    }

    try {
      setLoading(true);

      // 1️⃣ Subir imagen a Cloudinary
      const cloudFormData = new FormData();
      cloudFormData.append("file", imagePost);
      cloudFormData.append("upload_preset", "mi_preset_unsigned");
      cloudFormData.append("folder", "posts");

      const cloudResponse = await fetch(BD_URL, {
        method: "POST",
        body: cloudFormData,
      });

      if (!cloudResponse.ok) {
        throw new Error("Error subiendo imagen");
      }

      const cloudData = await cloudResponse.json();
      const imageUrl = cloudData.secure_url;

      // 2️⃣ Crear post
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: titlePost.trim(),
          text: contentPost.trim(),
          image: imageUrl,
        }),
      });

      if (response.status === 429) {
        const data = await response.json();
        toast.error(data.message);
        return;
      }

      if (!response.ok) {
        throw new Error("Error al crear el post");
      }

      await response.json();

      // Reset
      setTitlePost("");
      setImagePost(null);
      setContentPost("");
      setAddPost(false);

      toast.success("Post creado 🚀");

    } catch (error) {
      console.error(error);
      toast.error("Error al publicar");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------
  const handleTitleChange = (value) => {
    if (value.length > 35) {
      toast.error("Máximo 35 caracteres");
      return;
    }
    setTitlePost(value);
  };

  // ---------------------------------------------------

  return (
    <>
      <Toaster position="top-right" />

      <div className="btnContainer">
        <button
          className="btn btn-success btn-200"
          onClick={() => setAddPost(prev => !prev)}
        >
          Add Post
        </button>
      </div>

      <div
        className={`postInput ${addPost ? "show" : ""}`}
        onClick={() => setAddPost(false)}
      >
        <form
          onSubmit={submitPost}
          className="formInput"
          onClick={(e) => e.stopPropagation()}
        >

<span className="material-symbols-outlined closeBtn" onClick={() => setAddPost(false)}>
    close
</span>

          <h2 className="h2Formulario">Título</h2>
          <input
            className="contenidosInput"
            type="text"
            placeholder="Ingrese título del post"
            maxLength={35}
            value={titlePost}
            onChange={(e) => handleTitleChange(e.target.value)}
          />

          <h2 className="h2Formulario">Imagen</h2>
          <input
            className="contenidosInput"
            type="file"
            accept="image/*"
            onChange={(e) => setImagePost(e.target.files[0])}
          />

          <h2 className="h2Formulario">Contenido</h2>
          <textarea
            className="contenidosInput textArea"
            placeholder="Ingrese el contenido del post"
            maxLength={900}
            value={contentPost}
            onChange={(e) => setContentPost(e.target.value)}
          />

<button type="submit" className="btn-submit" disabled={loading}>
    {loading ? "Publicando..." : "Postear"}
</button>

        </form>
      </div>
    </>
  );
};