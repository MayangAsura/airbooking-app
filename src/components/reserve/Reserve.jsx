import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { useFetch } from "../../hooks/useFetch.js"
import { SearchContext } from '../../context/SearchContext.js'
import axios from 'axios'
import "./reserve.css"

const Reserve = ({setOpen, hotelId}) => {
    const {data, loading, error} = useFetch(`/hotels/rooms/${hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const {dates } = useContext(SearchContext)
    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        const list = []

        while(data <= end){
            list.push(new Date(date))
            date.setDate(date.getDate() + 1)
        }
        return list
    }
    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => 
            alldates.includes(new Date(date).getTime())
        )

        return !isFound
    }
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value))
    }

    console.log('selectedRooms', selectedRooms)
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await Promise.all(
                selectedRooms.map(roomId => {
                    const res = axios.pus(`/rooms/availability/${roomId}`, {dates: alldates})
                    return res.data

                })
            )
            setOpen(false)
            navigate('/')
        } catch (error) {
            
        }
    }
    return (
        <div clasName="reserve">
            <div clasName="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => setOpen(false)}
                />
                <span>Select your rooms:
                    {data.map(item => (
                        <div className="rItem">
                            <div className="rItemInfo">
                                <div className="rTitle" >{item.title} </div>
                                <div className="rDesc">{item.desc} </div>
                                <div className="rMax">
                                    Max people: <b>{item.maxPeople} </b>
                                </div>
                                <div className="rPrice">{item.price}</div>
                                
                        </div>
                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label htmlFor="">{roomNumber.number} </label>
                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} 
                                        disabled={!isAvailable(roomNumber)}
                                    />
                                    
                                </div>
                            ))}
                        </div>
                    ))}
                </span>

                <button onClick={handleClick} className="rButton">
                    Reserve Now!
                </button>

            </div>


        </div>
    )
}

export default Reserve