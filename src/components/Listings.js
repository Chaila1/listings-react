import {useState, useEffect} from "react";
import axios from "axios";
import Property from "./Property";

function Listings() {
    const [listings, setListings] = useState([]);

    useEffect(() => {
  async function fetchListings() {
    try {
      const response = await axios.get("http://localhost:4000/listings", {
        headers: { Accept: "application/json" },
      });
      setListings(response.data);
    } catch (err) {
      console.error("Error fetching listings:", err);
    }
  }

  fetchListings();
}, [])

    return (
        <div>
            <ul>
                {
                    listings.map(function(i, index){
                        console.log(i)
                        return (
                            <li key={index}>
                                <Property lister={i.lister} address={i.address} beds={i.beds} baths={i.baths} catergory={i.catergory} price={i.price}/>
                            </li>
                        )
                    }
                )
                }
            </ul>  
        </div>
    )
}

export default Listings;