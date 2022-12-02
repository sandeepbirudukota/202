import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
// import AppContent from './components/AppContent';
// import AppHeader from './components/AppHeader';
import styles from '../styles/modules/app.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from '../components/Button';
import AirlinesModal from '../components/AirlinesModal';
import AirlinesItem from '../components/AirlinesItem';
import { updateFilterStatus } from '../slices/airlineSlice';
import stylus from '../styles/modules/title.module.scss';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export const AirlinesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.flight.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();
  const flightList = useSelector((state) => state.flight.flightList);
  const filterType = useSelector((state) => state.flight.filterStatus);

  const [flightLists, setFlightLists] = useState([])
  const navigate = useNavigate();

  const sortedFlightList = [...flightLists];
  sortedFlightList.sort((a, b) => new Date(b.arrivalTime) - new Date(a.arrivalTime));
  const filteredFlightList = sortedFlightList.filter((item) => {
    if (filterType === 'all') {
      return true;
    }
    return item.type === filterStatus;
  });
  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };
  const name = localStorage.getItem('name')
  function createFlightData(
    airlineName,
    flightNo,
    type,
    origin,
    destination,
    gateNo,
    terminal,
    arrivalTime,
    departureTime,
    status,
    baggageCarousel
  ) {
    return {
      airlineName,
      flightNo,
      type,
      origin,
      destination,
      gateNo,
      terminal,
      arrivalTime,
      departureTime,
      status,
      baggageCarousel
    };
  }
  useEffect(() => {
    if (name === 'null') navigate('/')
    setFlightLists([])
    loadlFlights()


  }, [])

  const loadlFlights = () => {
    axios
      .get(`/airline/getByName?name=${name}`)
      .then((res) => {
        if (res.status == 200) {
          res.data.forEach((el) => {
            setFlightLists(
              oldArray => [...oldArray,
              createFlightData(el.airlineName, el.flightNo, el.type, el.origin, el.destination, el?.gateNo?.gateNo, el?.gateNo?.terminal, el?.arrivalTime, el?.departureTime, el?.status, el?.baggageCarousel)
              ]
            );
          });
        }

      })
      .catch((err) => {
        console.log("in catch", err.response.data.error);
      })
  }
  const handleProfileMenuOpen = (event) => {
    localStorage.clear()
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <Button style={{
          margin: '2px',
          float: 'right'
        }}
          variant="outlined"
          onClick={handleProfileMenuOpen}

        >
          Log Out
        </Button>
        <p className={stylus.title}>
          {name} Airlines Dashboard
        </p>

        <div className={styles.app__wrapper}>
          <div className={styles.appHeader}>
            <Button variant="Secondary" onClick={() => setModalOpen(true)}>
              Add Flight Details
            </Button>
            <SelectButton
              id="status"
              onChange={(e) => updateFilter(e)}
              value={filterStatus}
            >
              <option value="all">All</option>
              <option value="incoming">Departure Flight Details</option>
              <option value="outgoing">Arrival Flight Details</option>
            </SelectButton>
            <AirlinesModal formType="add" modalOpen={modalOpen} setModalOpen={setModalOpen} name={localStorage.getItem("name")} />
          </div>
          <motion.div
            className={styles.content__wrapper}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredFlightList && filteredFlightList.length > 0 ? (
                filteredFlightList.map((flight) => (
                  // <motion.div key={flight.id} variants={child}>
                  <AirlinesItem key={flight.id} flight={flight} />
                  // </motion.div>
                ))
              ) : (
                <motion.p variants={child} className={styles.emptyText}>
                  No Flights
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  )
}

