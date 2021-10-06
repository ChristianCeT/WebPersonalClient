import React from "react";
import LogoWhite from "../../../../assets/img/png/LogoChris.png";
import SocialLinks from "../../SocialLinks";

import "./MyInfo.scss";
export default function MyInfo() {
  return (
    <div className='my-info'>
      <img src={LogoWhite} alt='Christian Cervantes'></img>
      <h4>
        Entra al mundo del desarrollo web, disfruta el contenido que hay aquí.
      </h4>
      <SocialLinks></SocialLinks>
    </div>
  );
}
