import "./styles/interfaz.css"

export const Interfaz = ({children}) => {


    return(
        <>
            <header>

                <h1 className="badeen-display-regular"   onClick={() => window.location.reload()}>Posted</h1>
            </header>
            {children}

            <footer className="marquee">
                <span>Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Postea! Pene! Postea! Postea! Postea! Postea! Postea! Postea! Postea!</span>
            </footer>
        
        </>

    )


}