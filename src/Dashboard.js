import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Listings from './components/Listings';
import { IoAdd, IoLogOut} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, onLogout }) {
  const [listing, setListing] = useState({ lister: '', address: '', beds: '', baths: '', catergory: '', price: '' });
  const [propertyList, setPropertiesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const logout = () => {
    onLogout();
    navigate("/login");
  };

  const updateListing = (e) => setListing({ ...listing, [e.target.name]: e.target.value });
  const updateImage = (e) => setImage(e.target.files[0] || null);

  const fetchListings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/listings", { headers: { Accept: "application/json" } });
      setPropertiesList(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err.response || err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const addOrUpdateProperty = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in listing) formData.append(`listing[${key}]`, listing[key]);
    if (image) formData.append('listing[image]', image);

    try {
      if (editingId) {
        // Edit existing listing
        const res = await axios.patch(`http://localhost:4000/listings/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPropertiesList(prev => prev.map(item => item.id === editingId ? res.data : item));
        setEditingId(null);
      } else {
        // Add new listing
        const res = await axios.post("http://localhost:4000/listings", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPropertiesList(prev => [...prev, res.data]);
      }
      setListing({ lister: '', address: '', beds: '', baths: '', catergory: '', price: '' });
      setImage(null);
    } catch (err) {
      console.error("Error adding/updating property:", err.response || err);
    }
  };

  const editListing = (listing) => {
    setListing({
      lister: listing.lister,
      address: listing.address,
      beds: listing.beds,
      baths: listing.baths,
      catergory: listing.catergory,
      price: listing.price
    });
    setEditingId(listing.id);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to form
  };

  const deleteListing = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/listings/${id}`);
      setPropertiesList(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting property:", err.response || err);
    }
  };

  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="border-end bg-white" id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom bg-light">Get Your Gaff Yo</div>
        <div className="list-group list-group-flush">
          <button className="list-group-item list-group-item-action list-group-item-light p-3" onClick={logout}>
            <IoLogOut /> Logout
          </button>
        </div>
      </div>

      {/* Page content */}
      <div id="page-content-wrapper" className="p-4">
        <h1 className="mt-4">{editingId ? "Edit Listing" : "Hous3 Hunt3rs"}</h1>
        <form onSubmit={addOrUpdateProperty} className='mb-4'>
          <div className="row g-2">
            <div className="col-md-6">
              <input type="text" className="form-control" name="lister" placeholder="Lister Name" value={listing.lister} onChange={updateListing} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" name="address" placeholder="Property Address" value={listing.address} onChange={updateListing} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" name="beds" placeholder="Bedrooms" value={listing.beds} onChange={updateListing} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" name="baths" placeholder="Bathrooms" value={listing.baths} onChange={updateListing} />
            </div>
            <div className="col-md-4">
              <input type="number" className="form-control" name="price" placeholder="Price" value={listing.price} onChange={updateListing} />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" name="catergory" placeholder="Category" value={listing.catergory} onChange={updateListing} />
            </div>
            <div className="col-md-6">
              <input type="file" className="form-control" name="image" onChange={updateImage} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            {editingId ? "Update Listing" : "Add Listing"} <IoAdd />
          </button>
        </form>

        {/* Listings table */}
        <Listings listings={propertyList} onDelete={deleteListing} onEdit={editListing} />
      </div>
    </div>
  );
}

export default Dashboard;
