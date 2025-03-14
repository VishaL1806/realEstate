import React, { useContext, useState } from "react";
import "../Properties/Properties.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";

import UserDetailContext from "../../context/UserDetailContext";

const Bookings = () => {
  const { data: properties, isError , isLoading } = useProperties();

  const [filter, setFilter] = useState("");


    const { userDetails : {bookings}} = useContext(UserDetailContext)

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data..</span>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          width={80}
          height={80}
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {/* {properties?.map((property ,i) => <PropertyCard key={i} card={property} />)} */}
          {properties?.filter((property) =>
            bookings?.map((booking)=>booking.id).includes(property.id)
          )?.filter((property) =>
          property.title.toLowerCase().includes(filter.toLowerCase()) ||
          property.city.toLowerCase().includes(filter.toLowerCase()) ||  
          property.country.toLowerCase().includes(filter.toLowerCase())
        )?.map((property ,i) => <PropertyCard key={i} card={property} />)}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
