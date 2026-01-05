import "./text.css"

export const Texto = ({data}) => {


    console.log(data)
    return(
        <>

        <div class="burbuja">
            <h2 class="burbujaName">{data.name}</h2>
            <p className="burbujaText">{data.text}</p>    
        </div>      


        </>

    )

}