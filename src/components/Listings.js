import { IoPencil, IoTrash } from "react-icons/io5";

function Listings({ listings, onDelete, onEdit }) {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {listings.map(listing => (
        <div className="col" key={listing.id}>
          <div className="card h-100">
            {listing.image_url && (
              <img src={listing.image_url} className="card-img-top" alt={listing.lister} />
            )}
            <div className="card-body">
              <h5 className="card-title">{listing.lister}</h5>
              <p className="card-text">
                <strong>Address:</strong> {listing.address}<br />
                <strong>Beds:</strong> {listing.beds} | <strong>Baths:</strong> {listing.baths}<br />
                <strong>Category:</strong> {listing.catergory}<br />
                <strong>Price:</strong> ${listing.price.toLocaleString()}
              </p>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <button className="btn btn-sm btn-warning" onClick={() => onEdit(listing)}>
                <IoPencil /> Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(listing.id)}>
                <IoTrash /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Listings;
