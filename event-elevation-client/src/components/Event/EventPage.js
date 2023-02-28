import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { redirect, useParams, useHistory } from 'react-router-dom'
import { BASE_URL } from '../../config';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faCalendarAlt, faClock, faCalendarCheck, faLocationDot, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';


function EventPage() {
    const { eventId } = useParams();
    // console.log('Event Id : ', eventId);
    const [event, setEvent] = useState({});
    const [eventTags, setEventTags] = useState([]);
    const [endTime, setEndTime] = useState();
    function getEndDate(startDate, startTime, durationHours) {
        const endTime = new Date(
            startDate.slice(0, 4),
            startDate.slice(5, 7),
            startDate.slice(8, 10),
            startTime.slice(0, 2) + durationHours,
            startTime.slice(3, 5)
        );
        // console.log(endTime.toTimeString())
        return endTime;
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(BASE_URL + '/api/EventDetails/' + eventId).then(res => {
                setEvent(res.data);
                let et = getEndDate(res.data.startDate, res.data.startTime, res.data.totalHours);
                setEndTime(et);
                console.log('Event : ', res.data);
                return res;
            }).catch(error => {
                if (error.response.status === 404) {
                    console.log('404')
                    window.location.href = '/404'
                    return;
                }
            });
            const resTags = await axios.get(BASE_URL + '/api/EventsTags/event/' + eventId);
            setEventTags(resTags.data);
            console.log('Event tags : ', resTags.data);
        }
        fetchData();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row justify-content-center">
                    <div style={{ textAlign: 'left', marginTop: '45px' }} className="col-md-12">
                        <h1>{event.name}</h1>
                        <div className='col-10'>
                            {
                                eventTags && eventTags.map((tag) => <span key={tag.id} className='badge mt-2 mx-1' style={{ backgroundColor: '#e1ebf7', color: '#1a91eb', fontSize: '15px' }}>{tag.name}</span>)
                            }
                        </div>
                        <hr />
                    </div>
                    <div className='col-12 mt-5 px-5'>
                        <img className='col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12' src={'https://miro.medium.com/max/450/1*E2GBhUH4dIkshPAg7SiB2w.png'} alt={'poster of event'} />
                    </div>
                </div>
                <div className='row justify-content-center mt-sm-3 mx-sm-4 mt-5 mx-3'>
                    <div style={{ textAlign: 'left' }} className="col-12 mt-4">
                        <h4><FontAwesomeIcon icon={faHashtag} /> What is {event.name} ?</h4>
                        <p className='col-12 pt-2 px-4'>{event.description}</p>
                    </div>
                </div>
                <hr />
                <div className='row justify-content-center mt-sm-3 mx-sm-4 mt-4 mx-3'>
                    <div style={{ textAlign: 'left' }} className="col-12">
                        <h4><FontAwesomeIcon icon={faHashtag} /> Date and Time</h4>
                        <div className='mx-sm-5 mt-3 mx-2'>
                            <div><h6><FontAwesomeIcon icon={faCalendarCheck} /> Starting Date and Time</h6></div>
                            <div className="event-schedule-container mx-4">
                                <div className="event-schedule-item">
                                    <div className="schedule-date">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <span> {event.startDate && event.startDate.slice(0, 10)}</span>
                                    </div>
                                    <div className="schedule-time">
                                        <FontAwesomeIcon icon={faClock} />
                                        <span> {event.startTime}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mx-sm-5 mt-3 mx-2'>
                            <div><h6><FontAwesomeIcon icon={faCalendarCheck} /> Ending Date and Time</h6></div>
                            <div className="event-schedule-container mx-4">
                                <div className="event-schedule-item">
                                    <div className="schedule-date">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        <span> {endTime && endTime.toLocaleDateString()}</span>
                                    </div>
                                    <div className="schedule-time">
                                        <FontAwesomeIcon icon={faClock} />
                                        <span> {endTime && endTime.toTimeString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />

                <div className='row justify-content-center mt-sm-3 mx-sm-4 mt-5 mx-3'>
                    <div style={{ textAlign: 'left' }} className="col-12 mt-4">
                        <h4><FontAwesomeIcon icon={faHashtag} /> Location and Mode of event</h4>
                        <p className='col-12 pt-2 px-4'><FontAwesomeIcon icon={faLocationDot} /> {event.location}</p>
                        <p className='col-12 px-4'><FontAwesomeIcon icon={faGlobe} /> {event.mode}</p>
                    </div>
                </div>
                <hr />
                <div className='row justify-content-center mt-sm-3 mx-sm-4 mt-5 mx-3'>
                    <div style={{ textAlign: 'left' }} className="col-12 mt-4">
                        <h4><FontAwesomeIcon icon={faHashtag} /> Who are Organizing this event?</h4>
                        <p className='col-12 pt-2 px-4'><FontAwesomeIcon icon={faUser} /> {event.organiser}</p>
                        <p className='col-12 px-5'>{event.organiserDescription
                        }</p>
                    </div>
                </div>
                <hr />
                {
                    event.sponsors &&
                    <div className='row justify-content-center mt-sm-3 mx-sm-4 mt-5 mx-3'>
                        <div style={{ textAlign: 'left' }} className="col-12 mt-4">
                            <h4><FontAwesomeIcon icon={faHashtag} /> Who are Organizing this event?</h4>
                            <p className='col-12 pt-2 px-4'><FontAwesomeIcon icon={faUser} /> {event.organiser}</p>
                            <p className='col-12 px-5'>{event.organiserDescription
                            }</p>
                        </div>
                        <hr />
                    </div>
                }
            </div>
            <div className='mt-5'>
                <Footer />
            </div>
        </div>
    )
}

export default EventPage