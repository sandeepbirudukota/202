import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import 'react-datepicker/dist/react-datepicker.css';
// import DateTimePicker from 'react-datetime-picker';
import { addFlight, updateFlight } from '../slices/airlineSlice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';
import axios from 'axios';
// import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function AirlinesModal({ formType, modalOpen, setModalOpen, flight, name }) {

  const dispatch = useDispatch();
  var today = new Date(),
    currentMinutes = today.getHours() * 60 + today.getMinutes();
  var currentArrivalTimeHourSet = today.getHours() + 1;
  var currentArrivalTimeMinuteSet = today.getMinutes() + 3;
  var currentArrivalTimeSet = currentArrivalTimeHourSet + ':' + currentArrivalTimeMinuteSet;
  var currentDepartureTimeHourSet = today.getHours() + 2;
  var currentDepartureTimeMinuteSet = today.getMinutes() + 3;
  var currentDepartureTimeSet = currentDepartureTimeHourSet + ':' + currentDepartureTimeMinuteSet;
  // var currentTimeSet = today.getHours() + ':' + today.getMinutes();


  const [airlineName, setAirlineName] = useState(name);
  const [type, setType] = useState('');
  // const [arrivalDate, setArrivalDate] = useState('');
  // const [departureDate, setDepartureDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState();
  const [departureTime, setDepartureTime] = useState(moment());
  let [origin, setOrigin] = useState('');
  let [destination, setDestination] = useState('');
  const [flightNo, setFlightNo] = useState('');
  var disabledTime = false;

  if (type === 'outgoing') {
    origin = 'San Jose';
  }
  if (type === 'incoming') {
    destination = 'San Jose'
  }
  useEffect(() => {
    if (formType === 'update' && flight) {
      setAirlineName(flight.airlineName);
      setType(flight.type);
      // setArrivalDate(flight.arrivalDate);
      // setDepartureDate(flight.departureDate);
      setArrivalTime(flight.arrivalTime);
      setDepartureTime(flight.departureTime);
      setOrigin(flight.origin);
      setDestination(flight.destination);
      setFlightNo(flight.flightNo);
    }
    // } else {
    //   setAirlineName(name);
    //   setType('');
    //   // setArrivalDate(new Date());
    //   // setDepartureDate(new Date());
    //   // setArrivalTime(new Date());
    //   // setDepartureTime(new Date());
    //   setOrigin('');
    //   setDestination('');
    //   setFlightNo('');
    // }
  }, [formType, flight, modalOpen]);

  // if (flight) {
  //   var arrivalHour = new Date(flight.arrivalTime).getHours();
  //   const arrivalMinutes = Number(arrivalHour * 60) + Number(new Date(flight.arrivalTime).getMinutes());
  //   var departureHour = new Date(flight.departureTime).getHours();
  //   var departureMinutes = Number(departureHour * 60) + Number(new Date(flight.departureTime).getMinutes());

  //   if (formType === 'update') {
  //     if (type === 'incoming') {
  //       if (Math.abs(arrivalMinutes - currentMinutes) <= 63.5) {
  //         disabledTime = true;
  //       }
  //     }
  //     if (type === 'outgoing') {
  //       if (Math.abs(departureMinutes - currentMinutes) <= 123) {
  //         console.log(Math.abs(departureMinutes - currentMinutes))
  //         disabledTime = true;
  //       }
  //     }
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (airlineName === '' && origin === '' && destination === '' && flightNo === '' && type === "") {
      toast.error('Please enter missing info');
      return;
    }

    // if (type === 'Departure' || type === 'Arrival')
    // {
    //   if(Date.parse(arrivalTime) < Date.parse(departureTime))
    //   {
    //     toast.error('Arrival date should be greater than Departure Date.');
    //     return;
    //   }
    //   if(Date.parse(arrivalTime) === Date.parse(departureTime) && (arrivalTime <= departureTime) )
    //   {
    //     toast.error('Arrival time should be greater than Departure time.');
    //     return;
    //   }
    // }
    // if (flight) {
    //   var arrivalHour = new Date(flight.arrivalTime).getHours();
    //   const arrivalMinutes = Number(arrivalHour * 60) + Number(new Date(flight.arrivalTime).getMinutes());
    //   if (type === 'incoming' && flight?.gateNo) {
    //     if (Math.abs(arrivalMinutes - currentMinutes) <= 63.5) {
    //       toast.error('Restricted: Cannot be added, Arrival time should be greater thanor equal to ' + currentArrivalTimeSet);
    //       return;
    //     }
    //   }
    //   if (type === 'outgoing' && flight?.gateNo) {
    //     if (Math.abs(departureMinutes - currentMinutes) <= 123.5) {
    //       toast.error('Restricted: Cannot be added, Departure time should be greater than or equal to ' + currentDepartureTimeSet);
    //       return;
    //     }
    //   }
    // }
    if (airlineName && type && arrivalTime && departureTime && origin && destination && flightNo) {

      if (formType === 'add') {
        if (Date.parse(arrivalTime) !== null) {
          Date.parse(arrivalTime)
          Date.parse(departureTime)
        }
        dispatch(
          addFlight({
            airlineName,
            flightNo,
            type,
            arrivalTime,
            departureTime,
            origin,
            destination,
          })
        );
        toast.success('Flight added successfully');
        axios
          .post("/airline/add", {
            airlineName: airlineName,
            type: type,
            arrivalTime: arrivalTime,
            departureTime: departureTime,
            origin: origin,
            destination: destination,
            flightNo: flightNo,
          })
          .then(async (res) => {
            console.log('Flight added successfully');
          })
          .catch((err) => {
            console.log("in catch", err?.response?.data);
          })
      }
      if (formType === 'update') {
        if (
          flight.airlineName !== airlineName ||
          flight.type !== type ||
          flight.arrivalTime !== arrivalTime ||
          flight.departureTime !== departureTime ||
          flight.origin !== origin ||
          flight.destination !== destination ||
          flight.flightNo !== flightNo
        ) {
          // dispatch(updateFlight({ ...flight, airlineName, type, arrivalTime, departureTime, origin, destination, flightNo }));
          toast.success('Flight Updated successfully');
          let status = "EARLY";
          console.log(moment(flight.arrivalTime).format('lll') + " " + moment(arrivalTime).format('lll'))
          if (type === "incoming" && new Date(flight.arrivalTime) < new Date(arrivalTime)) {
            status = "LATE"
            console.log(status)
          }
          else if (type === "outgoing" && new Date(flight.departureTime) < new Date(departureTime)) status = "LATE"

          axios
            .put("/airline/update", {
              airlineName: airlineName,
              type: type,
              arrivalTime: arrivalTime,
              departureTime: departureTime,
              origin: origin,
              destination: destination,
              flightNo: flightNo,
              status: status
            })
            .then(async (res) => {
              console.log('Flight Updated successfully');
            })
            .catch((err) => {
              console.log("in catch", err?.response?.data);
            })
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {formType === 'add' ? 'Add' : 'Update'} Flight Schedule
              </h1>
              <label htmlFor="airlineName">
                Airline Name
                <input
                  type="text"
                  id="airlineName"
                  value={airlineName}
                  onChange={(e) => setAirlineName(e.target.value)}
                  disabled={true}
                />
              </label>
              <label htmlFor="type">
                Type
                <select
                  disabled={disabledTime}
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="outgoing">Departure</option>
                  <option value="incoming">Arrival</option>
                </select>
              </label>



              {
                type === 'incoming' && (
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        // disabled={disabledTime}
                        renderInput={(props) => <TextField {...props} />}
                        label="Arrival Time"
                        value={arrivalTime}
                        onChange={(newValue) => {
                          setArrivalTime(newValue);
                        }}
                        minDateTime={dayjs(moment(moment().add(1, 'hours')).add(3, 'minutes'))}
                      />
                    </LocalizationProvider>
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        // disabled={disabledTime}
                        renderInput={(params) => <TextField {...params} />}
                        label="Departure Time"
                        value={departureTime}
                        onChange={(newValue) => {
                          setDepartureTime(newValue);
                        }}
                        maxDate={arrivalTime}
                        minDateTime={dayjs(moment(moment().subtract(2, 'hours')).subtract(3, 'minutes'))}
                      />
                    </LocalizationProvider>

                  </div>
                )
              }
              {
                type === 'outgoing' && (

                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                      <DateTimePicker
                        renderInput={(params) => <TextField {...params} />}
                        label="Departure Time"
                        value={departureTime}
                        onChange={(newValue) => {
                          setDepartureTime(newValue);
                        }}
                        minDateTime={dayjs(moment(moment().add(2, 'hours')).add(3, 'minutes'))}
                      />

                    </LocalizationProvider>
                    <br></br>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        // disabled={disabledTime}
                        renderInput={(props) => <TextField {...props} />}
                        label="Arrival Time"
                        value={arrivalTime}
                        onChange={(newValue) => {
                          setArrivalTime(newValue);
                        }}
                        minDateTime={dayjs(moment(moment().add(3, 'hours')).add(3, 'minutes'))}
                      />
                    </LocalizationProvider>
                  </div>
                )
              }

              <p></p>
              <label htmlFor="origin">
                Origin
                <input
                  type="text"
                  id="origin"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  disabled={type === '' || type === "outgoing"}
                />
              </label>
              <label htmlFor="destination">
                Destination
                <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  disabled={type === '' || type === "incoming"}
                />
              </label>
              <label htmlFor="flightNo">
                Flight Number
                <input
                  disabled={disabledTime}
                  type="text"
                  id="flightNo"
                  value={flightNo}
                  onChange={(e) => setFlightNo(e.target.value)}
                />
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {formType === 'add' ? 'Add Schedule' : 'Update Schedule'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AirlinesModal;
