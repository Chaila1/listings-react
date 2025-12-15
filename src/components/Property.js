function Property(props){
    return(
        <div>
            <h3>{ "Lister: " + props.lister } </h3>
            <p>{ "Address: " + props.address }</p>
            <p>{ "Amount of Bedrooms: " + props.beds }</p>
            <p>{ "Amount of bathrooms: " + props.baths }</p>
            <p>{ "What kind of property is it: " + props.catergory }</p>
            <p>{ "Proposed price: " + props.price }</p>
        </div>
    )
}

export default Property