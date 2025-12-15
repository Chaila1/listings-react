import Property from "./Property";

function Listings({ listings, onDelete, onEdit }) {
  return (
    <div className="propertyBox">
      {listings?.map(item => (
        <Property
          key={item.id}
          lister={item.lister}
          address={item.address}
          beds={item.beds}
          baths={item.baths}
          catergory={item.catergory}
          price={item.price}
          image_url={item.image_url || null}
          onDelete={() => onDelete(item.id)}
          onEdit={() => onEdit(item)}
        />
      ))}
    </div>
  );
}

export default Listings;
