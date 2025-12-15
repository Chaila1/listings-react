import { MdDeleteForever, MdEdit } from "react-icons/md";
import '../App.css';

function Property({ lister, address, beds, baths, catergory, price, image_url, onDelete, onEdit }) {
  return (
    <div className="property">
      <div className="propertyContainer">
        <h3>Lister: {lister}</h3>
        <p>Address: {address}</p>
        <p>Bedrooms: {beds}</p>
        <p>Bathrooms: {baths}</p>
        <p>Category: {catergory}</p>
        <p>Price: {price}</p>
        {image_url && <img src={image_url} alt="Property" style={{ width: "200px", height: "auto" }} />}
        <MdDeleteForever className="delete" onClick={onDelete} />
        <MdEdit className="edit" onClick={onEdit} title="Edit Entry" />
      </div>
    </div>
  );
}

export default Property;
