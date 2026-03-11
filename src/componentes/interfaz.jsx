import { Link } from "react-router-dom";
import "./styles/interfaz.css";


export const Interfaz = ({ children, notifications}) => {



  return (
    <>
      <header className="d-flex justify-content-between align-items-center p-3  text-white">
        <Link to="/" className="logo">
          <h1 className="badeen-display-regular">
            Posted
          </h1>
        </Link>
        <div className="bell">

          
  🔔
        {notifications.length > 0 && (
          <span className="badge">{notifications.length}</span>
        )}
      </div>
      </header>

      {children}

      <footer className="marquee">
        <span>
          Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea!
        </span>
      </footer>
    </>
  );
};