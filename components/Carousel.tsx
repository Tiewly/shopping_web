import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import banner1 from "../public/imgs/banner1.jpg";
import banner2 from "../public/imgs/banner2.jpg";

function UncontrolledExample() {
  return (
    <Carousel className="w-100 carousel-size ">
      <Carousel.Item>
        <Image src={banner1} alt="banner" className="d-bloack w-100"></Image>
      </Carousel.Item>
      <Carousel.Item>
        <Image src={banner2} alt="banner" className="d-bloack w-100"></Image>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
