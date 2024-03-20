"use client";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { Package, donation } from "../../types/package";

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
}

const CalendarEvents = (props) => {
  const [myEventsList, setMyEventsList] = useState<Event[]>([]);
  const [donationDetails, setDonationDetails] = useState<donation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    axios.get("http://localhost:3000/donation").then((response) => {
      const responseData: donation[] = response.data
        ?.donationData as donation[];
      setDonationDetails(responseData);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    // Map donation details to events
    const eventsFromDonation = donationDetails.map((donationItem) => ({
      id: donationItem.amount,
      title: `${donationItem.type} ${donationItem.meal_time}`
      //start: new Date(donationItem.date), // Replace with your actual date property
      //end: new Date(donationItem.date), // Replace with your actual date property
    }));

    // Update myEventsList with the events from donation details
    setMyEventsList(eventsFromDonation);
  }, [donationDetails]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default CalendarEvents;
