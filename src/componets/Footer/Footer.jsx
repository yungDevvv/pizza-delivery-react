import React from 'react'
import './footer.scss'
function Footer() {
  return (
    <footer className='footer d-a unselectable'>
       <div className="footer-body d-a">
          <div className="footer-info d-a">
             <p>REACT PIZZA © 2022 </p>
             <ul className='d-a'>
                <li>Legal information</li>
                <li>Calorie content and composition</li>
                <li>Help</li>
                <li>Contact us</li>
             </ul>
          </div>
          <ul className="footer-social d-a">
            <li className='d-a-c'><img src="img/icons/facebook.svg" alt="facebook" /></li>
            <li className='d-a-c'><img src="img/icons/instagram.svg" alt="instagram" /></li>
            <li className='d-a-c'><img src="img/icons/twitter.svg" alt="twitter" /></li>
            <li className='d-a-c'><img src="img/icons/youtube.svg" alt="youtube" /></li> 
          </ul>
       </div>
    </footer>
  )
}

export default Footer