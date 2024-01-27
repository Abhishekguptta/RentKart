import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./Item";
import FallImg from '../images/house.svg';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1 },
  { width: 768, itemsToShow: 1 },
  { width: 1200, itemsToShow: 1 },
];
export default function ShowCarousel({roomData}) {
  return (
    <>
      <div className="container">
        <div className="jss1104 jss1105">
          <h1 class="MuiTypography-root MuiTypography-h6" style={{ paddingLeft: "75px" }}>{roomData.name}</h1>
          <div style={{ paddingRight: "75px" }}>
            <button type="button" style={{ borderStyle: "none" ,  padding: "10px" , borderWidth: "0px" }}>
              <span >Shortlist</span>&nbsp;
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button></div>
        </div>
        <br />
        <div>
          <Carousel breakPoints={breakPoints} enableAutoPlay={true} autoPlaySpeed={2000} enableSwip={true}>
            <Item><img src={FallImg} alt="" className="object-fit" /></Item>
            <Item><img src={FallImg} alt="" className="object-fit" /></Item>
            <Item><img src={FallImg} alt="" className="object-fit" /></Item>
            <Item><img src={FallImg} alt="" className="object-fit" /></Item>
            <Item><img src={FallImg} alt="" className="object-fit" /></Item>
            <Item><img src={FallImg} alt="" className="object-fit" /></Item>
          </Carousel>
        </div>
        <br />
        <br />
      </div>
    </>
  );
}

