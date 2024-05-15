import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/swiper.css";
import "./Residencies.css";
import {PuffLoader} from 'react-spinners'
import { sliderSettings } from "../../utils/common";
import PropertyCard from "../PropertyCard/PropertyCard";
import useProperties from "../../hooks/useProperties";

const Residencies = () => {

  const { data: properties, isError, isLoading } = useProperties();
  if(isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data..</span>
      </div>
    );
  }
  if(isLoading) {
    return ( <div className="wrapper flexCenter" style={{height :'60vh'}}>
        <PuffLoader width={80} height={80} radius={1} color="#4066ff" aria-label="puff-loading" />
      </div>
    )
  }
  return (
    <section className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>

        <Swiper {...sliderSettings}>
          <SliderButtons></SliderButtons>
          {properties?.slice(0,8).map((card, i) => (
            <SwiperSlide key={i}>
             <PropertyCard  card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Residencies;

const SliderButtons = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={()=>swiper.slidePrev()}>&lt;</button>
      <button onClick={()=>swiper.slideNext()}>&gt;</button>
    </div>
  );
};
