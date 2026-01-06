import "./text.css"

export const Texto = ({data}) => {


    console.log(data)
    return(
        <>

        <div className="burbuja">
            <h2 className="burbujaName">{data.name}</h2>
            <p className="burbujaText">{data.text}</p>    
        </div>      


        </>

    )

}