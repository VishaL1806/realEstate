import React, { useContext, useState } from "react";
import "./Property.css";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cancelBooking, getProperty } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import {  AiTwotoneCar } from "react-icons/ai";
import { FaShower } from "react-icons/fa";
import { MdMeetingRoom, MdLocationOn } from "react-icons/md";
import Map from "../../components/Map/Map";
import useAuthCheck from "../../hooks/useAuthCheck";
import { useAuth0 } from "@auth0/auth0-react";
import BookingModal from "../../components/BookingModal/BookingModal";
import UserDetailContext from "../../context/UserDetailContext";
import { Button } from "@mantine/core";
import Heart from "../../components/Heart/Heart";

const Property = () => {
  const { propertyId } = useParams();
  const {
    data: property,
    isError,
    isLoading,
  } = useQuery(["residency", propertyId], () => getProperty(propertyId));

  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useAuth0();
  const { validateLogin } = useAuthCheck();
  const {
    userDetails: { token, bookings },
    setUserDetails,
  } = useContext(UserDetailContext);
  const {mutate : cancelCurrentBooking , isLoading : isCancelInProgress}  = useMutation({
    mutationFn : ()=>cancelBooking(user.email,propertyId, token),
    onSuccess :()=>{
      setUserDetails((prev)=>({...prev,bookings : prev.bookings.filter((booking)=>booking.id!==propertyId)}))
    }
  })
  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching property details.....</span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader
            width={80}
            height={80}
            radius={1}
            color="#4066ff"
            aria-label="puff-loading"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        <div className="like">
          <Heart id={propertyId}  />
        </div>
        <img src={property?.image} alt="home image" />
        <div className="flexCenter property-details">
          <div className="flexColStart left">
            <div className="flexStart head">
              <span className="primaryText">{property?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {property?.price}
              </span>
            </div>
            <div className="flexStart facilities">
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span className="">
                  {property?.facilities?.bathrooms} Bathrooms
                </span>
              </div>
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span className="">
                  {property?.facilities?.parking} Parking
                </span>
              </div>
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span className="">
                  {property?.facilities?.bedrooms} Bedrooms
                </span>
              </div>
            </div>

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {property?.description}
            </span>

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationOn size={25} />
              <span className="secondaryText">
                {property?.address} {property?.city} {property?.country}
              </span>
            </div>

            {!bookings.map((booking) => booking.id).includes(propertyId) ? (
              <button
                className="button"
                onClick={() => validateLogin() && setModalOpened(true)}
              >
                Book your visit
              </button>
            ) : (
              <>
                <Button variant="outline" color="red" w={"100%"} onClick={()=>cancelCurrentBooking()} disabled={isCancelInProgress} >
                  <span>Cancel Booking</span>
                </Button>
                <span>
                  You have already booked for date {bookings?.filter((booking)=>booking.id===propertyId)[0].date}
                </span>
              </>
            )}

            <BookingModal
              opened={modalOpened}
              setOpened={setModalOpened}
              propertyId={propertyId}
              email={user?.email}
            />
          </div>

          <div className="map">
            <Map
              address={property?.address}
              city={property?.city}
              country={property?.country}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
