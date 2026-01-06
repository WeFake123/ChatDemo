import "./interfaz.css"

export const Interfaz = ({children}) => {

    return(
        <>
            <header>

                <h1 className="badeen-display-regular">Posted</h1>
            </header>
            {children}

            <footer>
                <h2>asd</h2>
            </footer>
        
        </>

    )


}