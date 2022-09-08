import React from "react";
import "./card.css";
import {
  MdOutlineShoppingCart,
  MdFavoriteBorder,
  MdOutlineArrowForward,
  MdOutlineStar,
} from "react-icons/md";

const Card = (props) => {
  return (
    <div>
      <div className="cards px-4">
        <div className="cards-img">
          <img className="img-fluid" src={props.img} alt="" />
        </div>
        <div className="icons">
          <MdOutlineShoppingCart className="card-icons mx-2" />
          <MdFavoriteBorder className="card-icons mx-2" />
          <MdOutlineArrowForward className="card-icons mx-2" />
        </div>
        <h5 className="fs-4 pt-3">{props.title}</h5>
        <h6 className="fs-5 text-black-50">Rs. {props.price}</h6>
        <div className="rating d-flex">
          <MdOutlineStar className="star" />
          <MdOutlineStar className="star" />
          <MdOutlineStar className="star" />
          <MdOutlineStar className="star" />
          <MdOutlineStar className="star" />
        </div>
      </div>
    </div>
  );
};

export default Card;
