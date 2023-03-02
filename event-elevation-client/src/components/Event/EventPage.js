import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { redirect, useParams, useHistory } from 'react-router-dom'
import { BASE_URL } from '../../config';
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faCalendarAlt, faClock, faCalendarCheck, faLocationDot, faGlobe, faUser, faShareNodes, faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import EditEventModel from './EditEventModel';
import AddTags from './AddTags';


function EventPage() {
    const { eventId } = useParams();
    // console.log('Event Id : ', eventId);
    const [event, setEvent] = useState({});
    const [eventTags, setEventTags] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            await axios.get(BASE_URL + '/api/EventDetails/' + eventId).then(res => {
                setEvent(res.data);
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
    
    const deleteCurrentEvent = async () => {
        if (event) {
            await axios.get(BASE_URL + '/api/EventsTags/event/' + event.id)
                .then(res => {
                    res.data.map(async (eventTags) => {
                        await axios.delete(BASE_URL + '/api/EventsTags/' + eventTags.id)
                            .then(res => {
                                console.log('Event Tags Deleted');
                            }).catch(error => {
                                console.log('Error in deleting event tags');
                            })
                    })
                }).catch(error => {
                    console.log('ERROR FETCHING EVENT TAGS : ', error.message);
                });

            axios.delete(BASE_URL + '/api/EventDetails/' + event.id)
                .then(res => {
                    toast.success('Event Deleted');
                    console.log('Event Deleted');
                    window.location.href = '/allevents';
                }).catch(error => {
                    toast.success('Error in deleting event');
                    console.log('ERROR DELETING EVENT : ', error.message);
                });
        } else {
            toast.error('There is no any event to delete');
        }

    }

    return (
        <div>
            <Navbar />
            <div className="container">

                <div className="row justify-content-center">
                    <div style={{ textAlign: 'left', marginTop: '45px' }} className="col-md-12">
                        <h1>{event.name}<a className='btn' onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            toast.info('Link Copied to Clipboard');
                        }}><FontAwesomeIcon style={{ height: '25px', backgroundColor: '#e1ebf7' }} icon={faShareFromSquare} /></a></h1>
                        <div className='col-10'>
                            {
                                eventTags && eventTags.map((tag) => <span key={tag.id} className='badge mt-2 mx-1' style={{ backgroundColor: '#e1ebf7', color: '#1a91eb', fontSize: '15px' }}>{tag.name}</span>)
                            }
                        </div>
                        <hr />
                        <div className='col-12'>
                            <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addTagsModal" style={{width:'90px',height:'28px',padding:0,margin:0}}>Add tags</button>
                            <AddTags />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-2 col-md-3 col-sm-4 mt-4">
                            <button className="col-12 btn btn-success" data-bs-toggle="modal" data-bs-target="#editEventModel">Edit Event</button>
                            
                            <EditEventModel currentEvent={event}/>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-4 offset-lg-8 offset-md-6 offset-sm-4 mt-4">
                            <button className="col-12 btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteEventModel">Delete Event</button>

                            <div className="modal fade" id="deleteEventModel" tabIndex="-1" aria-labelledby="deleteEventLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        {/* <div className="modal-header">
                                            <h5 className="modal-title" id="deleteEventLabel">Deleting</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div> */}
                                        <div className="modal-body">
                                            <h4>Are you sure you want to delete this event?</h4>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-danger" onClick={(deleteCurrentEvent)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <CreateEventModel /> */}
                        </div>
                    </div>
                    <div className='col-12 mt-5 px-5'>
                        {
                            event.image && <img className='col-xl-10 col-lg-10 col-md-10 col-sm-12 col-12' src={BASE_URL + '/api/EventDetails/event-poster/' + event.image} alt={'poster of event'} />
                        }
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
                                        <span> {event.endDate && event.endDate.slice(0, 10)}</span>
                                    </div>
                                    <div className="schedule-time">
                                        <FontAwesomeIcon icon={faClock} />
                                        <span> {event.endTime}</span>
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