import React from 'react'
import './MailList.css'

const MailList = () => {
  return (
    <div className="mail">
        <div className="mailTitle">Save time,save money!</div>
        <span className="mailDesc">Sign up and we'll send you the best deals to you</span>
        <div className="mailInputContainer">
            <input type="text" placeholder="Your Email" />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList