import React from 'react'
import Link from 'next/link'
import '../styles/main.scss'
import { Button } from '@material-ui/core';
import axios from 'axios';

import { GOOGLE_API_KEY, CALENDAR_ID } from '../secret/google-calendar-assets.json';

async function testApiCall() {
    const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GOOGLE_API_KEY}`)
    const events = response.data.items;
    console.log("aseasdf", events)
    return events;
}

const testDisplay = () => {
    const events = testApiCall()
    events.map(e => {
        return <li> {e.summary} hello </li>
    })
}

export default function MainPage() {
    const values = testApiCall();
    console.log(values);
    return (
        <React.Fragment>
            <div>
                <h1>Reduce your carbon footprint</h1>
                <ul>
                    <li><Link href='/calendar'><Button color="primary"><a>Calculate my footprint</a></Button></Link></li>
                    <li><Link href='/view'><a>b</a></Link></li>
                    {testDisplay}
                </ul>
            </div>
        </React.Fragment>
    );
}