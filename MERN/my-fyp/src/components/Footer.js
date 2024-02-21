import React from 'react'
import "./FooterStyle.css";
function Footer  () {
  return (
    <div>
      <section className="footer">

<div className="share">
    <a href="#" className="fab fa-facebook-f"></a>
    <a href="#" className="fab fa-twitter"></a>
    <a href="#" className="fab fa-instagram"></a>
    <a href="#" className="fab fa-linkedin"></a>
    <a href="#" className="fab fa-pinterest"></a>
</div>

<div className="links">
    <a href="/">home</a>
    <a href="/screening">vehicle screening</a>
    <a href="/log">Log</a>
    <a href="/about">about us</a>
    <a href="/contact">contact us</a>
   
</div>

<div className="credit">created by <span>    Arid Agricultural University Students</span> | all rights reserved</div>

</section>
    </div>
  )
}

export default Footer
