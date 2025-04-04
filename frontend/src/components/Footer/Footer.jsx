import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer'  id='footer'>
        <div className="footer-content">

            <div className="footer-content-left">
                <img src= {assets.logo} alt="" />
                <p>We believe that every meal should be a delightful experience. Our team of culinary experts uses only the freshest ingredients to craft mouth-watering dishes that are delivered right to your doorstep.</p>
                <div className="footer-social-icons">
                    <img src= {assets.facebook_icon} alt="" />
                    <img src= {assets.twitter_icon} alt="" />
                    <img src= {assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Piracy Policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-021-011-2001</li>
                    <li>Contact @tomato.com</li> 
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 © Tomato™ Ltd.All Rights reserved.
        </p>
      
    </div>
  )
}

export default Footer
