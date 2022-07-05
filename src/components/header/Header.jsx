import React,{useState} from 'react'
import './header.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBed,faPlane,faCar,faTaxi, faCalendarDays, faPerson} from "@fortawesome/free-solid-svg-icons"
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format, set} from "date-fns"
import {useNavigate} from 'react-router-dom'

const Header = ({type}) => {
  // opening and closing of calendar
  const[openDate,setOpenDate]=useState(false)

  // serch
  const[destination , setDestination] = useState("")


  // calendar
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  //  for adult children and room section
  const [openOptions , setOpenOptions]= useState(false)
  const [options , setOptions]=useState({
    adult:1,
    children:0,
    room:1
  })

  const handleOption=(name,operation)=>{
    setOptions((prev)=>{
      return{
        ...prev,
        [name]:operation === "i" ? options[name]+1:options[name]-1,
      }
    })
  }

  const navigate=useNavigate()

  const handleSearch=() => {
    navigate("/hotels",{state:{destination,state,options}})
  }


  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode":"headerContainer"}>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxis</span>
            </div>

        </div>
        { type!=="list" && <> 
        <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
        <p className="headerDesc">Get Rewarded for your travels - unlock instant saving of 10% or more with a free Lamabooking account</p>
        <button className="headerBtn">Sign in/Register</button>

        <div className="headerSearch">
          <div className="headerSearchItem">
            <input type="text" placeholder="Where are you going?" className="headerSearchInput" onChange={(e)=> setDestination(e.target.value)}  />
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
            <span onClick={() =>setOpenDate(!openDate)} className="headerSearchText">{`${format(state[0].startDate,"MM/dd/yyyy")} to ${format(state[0].endDate,"MM/dd/yyyy")} `}</span>
            {openDate && <DateRange
  editableDateInputs={true}
  onChange={item => setState([item.selection])}
  moveRangeOnFirstSelection={false}
  ranges={state}
  className="date"
/>}
          </div>
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
          <span onClick={()=> setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
          {openOptions && <div className="options">
            {/* Adult   */}
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
                 <button disabled={options.adult<=1} className="optionCounterButton" onClick={()=>handleOption("adult","d")}>-</button>
                 <span className="optionCounterNumber">{options.adult}</span>
                 <button className="optionCounterButton" onClick={()=>handleOption("adult","i")}>+</button>

              </div>
          

              {/* Children   */}

            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
                 <button disabled={options.children<=0} className="optionCounterButton" onClick={()=>handleOption("children","d")}>-</button>
                 <span className="optionCounterNumber">{options.children}</span>
                 <button className="optionCounterButton" onClick={()=>handleOption("children","i")}>+</button>
              </div>
             

            </div>

            {/* Rooms    */}
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
              <button disabled={options.room<=1} className="optionCounterButton" onClick={()=>handleOption("room","d")}>-</button>
              <span className="optionCounterNumber">{options.room}</span>
              <button className="optionCounterButton" onClick={()=>handleOption("room","i")}>+</button>

              </div>
          

            </div>
          </div>}
          </div>

          <div className="headerSearchItem">
             <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div> </>}
        </div>
        
    </div>
  )
}

export default Header






// for calendar date-fns
// npm i date-fns
// npm install react-date-range

// react-date-range wonderfull npm package for calendars in react   