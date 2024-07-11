import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import getLibros from "../service/getLibros";
import Card from "./card-libro";

export default function HomeCarousel() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    getLibros().then((data) => {
      setLibros(data);
    });
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {libros.map((product) => (
        <div className="col-md-12 mx-auto" key={product.id}>
          <Card {...product} />
        </div>
      ))}
    </Slider>
  );
}
