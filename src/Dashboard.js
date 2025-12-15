import { useState, useEffect } from "react";
import axios from "axios";
import './App.css';
import Listings from './components/Listings';
import { IoAdd, IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Dashboard({ user, onLogout }) {
  const [listing, setListing] = useState({ lister: '', address: '', beds: '', baths: '', catergory: '', price: '' });
  const [propertyList, setPropertiesList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Set Axios default headers for authentication
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
      const res = await axios.get("http://localhost:4000/listings", {
        headers: { Accept: "application/json" } 
      });
      setPropertiesList(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err.response || err);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const saveProperty = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in listing) {
      formData.append(`listing[${key}]`, listing[key]);
    }

    if (image) formData.append('listing[image]', image);

    try {
      let res;
      if (editingId) {
        res = await axios.patch(`http://localhost:4000/listings/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPropertiesList(prev => prev.map(item => item.id === editingId ? res.data : item));
      } else {
        res = await axios.post("http://localhost:4000/listings", formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPropertiesList(prev => [...prev, res.data]);
      }

      setListing({ lister: '', address: '', beds: '', baths: '', catergory: '', price: '' });
      setImage(null);
      setEditingId(null); 

    } catch (err) {
      console.error("Error saving property:", err.response || err);
    }
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
    <div className="app">
      <div className="appContainer">
        <h1 className="title">Reality App</h1>
        <button onClick={logout}><IoLogOut /></button>

        <form onSubmit={saveProperty} className='inputContainer'>
          <input type="text" name="lister" placeholder='Name of lister' value={listing.lister} onChange={updateListing} />
          <input type="text" name="address" placeholder='Address of Property' value={listing.address} onChange={updateListing} />
          <input type="number" name="beds" placeholder='Number of Bedrooms' value={listing.beds} onChange={updateListing} />
          <input type="number" name="baths" placeholder='Number of Bathrooms' value={listing.baths} onChange={updateListing} />
          <input type="text" name="catergory" placeholder='What kind of Property is it' value={listing.catergory} onChange={updateListing} />
          <input type="number" name="price" placeholder='Price of the property' value={listing.price} onChange={updateListing} />
          <input type="file" name="image" onChange={updateImage} />
          <button type="submit"><IoAdd /></button>
        </form>

        <Listings listings={propertyList} onDelete={deleteListing} onEdit={(item) => {
            setListing(item);
            setEditingId(item.id);
            }}/>
      </div>
    </div>
  );
}

export default Dashboard;
