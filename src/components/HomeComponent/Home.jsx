import { useEffect, useState } from "react";
import { supabase } from "../../index.js";
import { useLogout } from "../../customHooks/useLogout";
import birdieLogo from "../../img/birdie-icon.png";
import victorImage from "../../img/victor.jpg";
import "./home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-container01">
        <div className="home-container02">
          <img src={birdieLogo} alt="image" className="home-image" />
        </div>
        <div className="home-container03">
          <span className="home-text">Birdie</span>
        </div>
        <div className="home-container04">
          <svg viewBox="0 0 1024 1024" className="home-icon">
            <path d="M128 256h768v86h-768v-86zM128 554v-84h768v84h-768zM128 768v-86h768v86h-768z"></path>
          </svg>
        </div>
      </div>
      <div className="home-container05">
        <div className="home-container06"></div>
        <div className="home-container07"></div>
        <div className="home-container08"></div>
        <div className="home-container09"></div>
        <ul className="home-ul list">
          <li className="home-li list-item">
            <div className="home-container10">
              <img src={victorImage} alt="image" className="home-image1" />
            </div>
            <div className="home-container11">
              <div className="home-container12">
                <span className="home-text1">Victor Prisacariu</span>
              </div>
              <div className="home-container13">
                <div className="home-container14">
                  <span className="home-text2">Nu uita sa scoti...</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="home-container15">
        <div className="home-container16">
          <svg viewBox="0 0 1024 1024" className="home-icon2">
            <path d="M576 706.612v-52.78c70.498-39.728 128-138.772 128-237.832 0-159.058 0-288-192-288s-192 128.942-192 288c0 99.060 57.502 198.104 128 237.832v52.78c-217.102 17.748-384 124.42-384 253.388h896c0-128.968-166.898-235.64-384-253.388z"></path>
          </svg>
          <span className="home-text3">Profile</span>
        </div>
        <div className="home-container17">
          <svg viewBox="0 0 1152 1024" className="home-icon4">
            <path d="M1088 901.166c0 45.5 26.028 84.908 64 104.184v15.938c-10.626 1.454-21.472 2.224-32.5 2.224-68.008 0-129.348-28.528-172.722-74.264-26.222 6.982-54.002 10.752-82.778 10.752-159.058 0-288-114.616-288-256s128.942-256 288-256c159.058 0 288 114.616 288 256 0 55.348-19.764 106.592-53.356 148.466-6.824 14.824-10.644 31.312-10.644 48.7zM512 0c278.458 0 504.992 180.614 511.836 405.52-49.182-21.92-103.586-33.52-159.836-33.52-95.56 0-185.816 33.446-254.138 94.178-70.846 62.972-109.862 147.434-109.862 237.822 0 44.672 9.544 87.888 27.736 127.788-5.228 0.126-10.468 0.212-15.736 0.212-27.156 0-53.81-1.734-79.824-5.044-109.978 109.978-241.25 129.7-368.176 132.596v-26.916c68.536-33.578 128-94.74 128-164.636 0-9.754-0.758-19.33-2.164-28.696-115.796-76.264-189.836-192.754-189.836-323.304 0-229.75 229.23-416 512-416z"></path>
          </svg>
          <span className="home-text4">Chats</span>
        </div>
        <div className="home-container18">
          <svg viewBox="0 0 1024 1024" className="home-icon6">
            <path d="M384 554q64 0 140 18t139 60 63 94v128h-684v-128q0-52 63-94t139-60 140-18zM640 512q-26 0-56-10 56-66 56-160 0-38-16-86t-40-76q30-10 56-10 70 0 120 51t50 121-50 120-120 50zM214 342q0-70 50-121t120-51 120 51 50 121-50 120-120 50-120-50-50-120zM712 560q106 16 188 59t82 107v128h-172v-128q0-98-98-166z"></path>
          </svg>
          <span className="home-text5">People</span>
        </div>
      </div>
    </div>
  );
};
export default Home;
