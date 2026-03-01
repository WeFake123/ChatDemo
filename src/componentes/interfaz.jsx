import { Link } from "react-router-dom";
import "./styles/interfaz.css";

export const Interfaz = ({ children }) => {
  return (
    <>
      <header>
        <Link to="/" className="logo">
          <h1 className="badeen-display-regular">
            Posted
          </h1>
        </Link>
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