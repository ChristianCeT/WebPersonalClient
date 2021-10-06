import React from "react";
import { ReactComponent as YouTubeIcon } from "../../../assets/img/svg/youtube.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/img/svg/twitter.svg";
import { ReactComponent as FacebookIcon } from "../../../assets/img/svg/facebook.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/img/svg/linkedin.svg";

import "./SocialLinks.scss";
export default function SocialLinks() {
  return (
    <div className='social-links'>
      <a
        href='https://www.youtube.com/channel/UC40DYOy9SbPeTQDE5Jz5x9A/featured'
        className='youtube'
        target='_blank'
        rel='noreferrer'
      >
        <YouTubeIcon></YouTubeIcon>
      </a>

      <a
        href='https://twitter.com/ChristianCe11'
        className='twitter'
        target='_blank'
        rel='noreferrer'
      >
        <TwitterIcon></TwitterIcon>
      </a>

      <a
        href='https://www.facebook.com/AtnatChryss/'
        className='facebook'
        target='_blank'
        rel='noreferrer'
      >
        <FacebookIcon></FacebookIcon>
      </a>

      <a
        href='https://www.linkedin.com/in/christian-alvaro-cervantes-tanta-b346191aa/'
        className='linkedin'
        target='_blank'
        rel='noreferrer'
      >
        <LinkedinIcon></LinkedinIcon>
      </a>
    </div>
  );
}
