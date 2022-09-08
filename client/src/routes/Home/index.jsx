import React from "react";
import Slider from "../../components/Slider";
import Featured from "../../components/Featured";
import "./home.css";
import {TbTruckDelivery, TbBrandInstagram} from "react-icons/tb";
import { MdOutlinePayments, MdOutlineAssignmentReturn, MdOutlineContactMail } from "react-icons/md";
import FilledButton from "../../components/Buttons/FilledButton";
import OutlinedButton from "../../components/Buttons/OutlinedButton";

const Home = () => {
  return (
    <div>
      {/* --------------- Slider -------------- */}

      <Slider />

      {/* --------------- Featured Products -------------- */}

      <div className="container featured my-5 py-5">
        <h6 className="fs-6 text-center mb-2">BEST CHOICE</h6>
        <h2 className="text-center mb-5">Featured Products</h2>
        <Featured />
      </div>

      {/* --------------- Glasses Advertisement -------------- */}

      <div className="d-flex container my-5 py-5">
        <div className="col-md-5">
          <img
            className="img-fluid"
            src="./Imgs/glasses-woman.jpg"
            alt="glasses-woman"
          />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-6">
          <h6 className="fs-6 mb-3">SMART GLASSES</h6>
          <h2 className="mb-4">
            We create stylish eyewear for your perfect look.
          </h2>
          <p className="para">
            Many people like to wear fashion eyeglasses as a style accessory,
            not only for vision correction. Come and choose your perfect
            glasses!
          </p>
          <img
            className="img-fluid"
            src="./Imgs/glasses-man.jpg"
            alt="glasses-man"
          />
        </div>
      </div>

      {/* --------------- You May Also Like -------------- */}

      <div className="container featured my-5 py-5">
        <h6 className="fs-6 text-center mb-2">BEST CHOICE</h6>
        <h2 className="text-center mb-5">You May Also Like</h2>
        <Featured />
        <div className="mt-5 d-flex justify-content-center">
        <OutlinedButton title="View All" link="/"/>
        </div>
      </div>

      {/* --------------- Instagram -------------- */}

      <div className="d-flex container my-5 py-5">
        <div className="col-md-5">
          <TbBrandInstagram style={{fontSize:100, color:"#243c68"}}/>
          <h1 className="mt-4 mb-4">Get Inspired With Our Instagram</h1>
          <p className="pb-5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit placeat sapiente explicabo incidunt veniam repellendus laboriosam iure quia. Possimus necessitatibus.</p>
          <FilledButton title="View Page" link="/"/>
        </div>
        <div className="col-md-7 d-flex justify-content-end">
          <img src="./Imgs/instagram.webp" alt="instagram" width={700}/>
        </div>
      </div>

      {/* --------------- Qualities -------------- */}

      <div className="d-flex text-center container my-5 py-5">
        <div className="col-md-3 bord">
          <TbTruckDelivery className="icons mb-3"/>
          <h5>Fast Delivery</h5>
          <p>Delivery within 3-5 days.</p>
        </div>
        <div className="col-md-3 bord">
          <MdOutlinePayments className="icons mb-3"/>
          <h5>Secure Payment</h5>
          <p>Cash & Card Payment.</p>
        </div>
        <div className="col-md-3 bord">
          <MdOutlineAssignmentReturn className="icons mb-3"/>
          <h5>Money Back Guarantee</h5>
          <p>Return within 7 days.</p>
        </div>
        <div className="col-md-3">
          <MdOutlineContactMail className="icons mb-3"/>
          <h5>Online Support</h5>
          <p>Contact Us via Email.</p>
        </div>
      </div>

    </div>
  );
};


export default Home;
