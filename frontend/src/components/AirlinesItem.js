import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteFlight } from '../slices/airlineSlice';
import styles from '../styles/modules/flightItem.module.scss';
import { getClasses } from '../utils/getClasses';
import AirlinesModal from './AirlinesModal';
import moment from "moment";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function AirlinesItem({ flight }) {
  console.log(flight)
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteFlight(flight.id));
    toast.success('Flight Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  const adt = new Date(flight.arrivalTime);
  const dtad = adt.getDate();
  const dtam = adt.getMonth() + 1;
  const dtay = adt.getFullYear();
  const dtah = adt.getHours();
  const dtamin = adt.getMinutes();

  const ddt = new Date(flight.departureTime);
  const dtdd = ddt.getDate();
  const dtdm = ddt.getMonth() + 1;
  const dtdy = ddt.getFullYear();
  const dtdh = ddt.getHours();
  const dtdmin = ddt.getMinutes();
  let position = 'NEW'
  var departureTimePrint = dtdh + ':' + dtdmin;
  var arrivalTimePrint = dtah + ':' + dtamin;
  var today = new Date(),
    currentMinutes = today.getHours() * 60 + today.getMinutes();
  const arrivalMinutes = dtah * 60 + dtamin;
  var departureMinutes = dtdh * 60 + dtdmin;

  // if (flight.type === 'Arrival')
  //   {
  //     if( Math.abs(arrivalMinutes - currentMinutes) <= 62)
  //     {
  //       position = 'Late';
  //     }
  //   }
  //   if (flight.type === 'Departure')
  //   {
  //     if( Math.abs(departureMinutes - currentMinutes) <= 122)
  //     {
  //       position = 'Late';
  //     }
  //   }

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.flightDetails}>
          <div className={styles.texts}>
            <p className={getClasses([styles.flightText])}>
              {`Flight Name: ${flight.airlineName.toUpperCase()} |`} {`Type: ${flight.type.toUpperCase()} |`} {`From: ${flight.origin} |`} {`To: ${flight.destination} |`} {`Flight Number: ${flight.flightNo}`}
            </p>
            <p className={styles.time}>
              {`Departure Timings:  ${moment(flight.departureTime).format('lll')} `}
            </p>
            <p className={styles.time}>
              {`Arrival Timings:   ${moment(flight.arrivalTime).format('lll')} `}
            </p>
            <p className={styles.time}>
              {`Status: ${flight?.status}`}
            </p>
            <p className={styles.time}>
              {`Gate: ${flight?.gateNo ? flight?.terminal + ""+ flight?.gateNo : "-"}`}
            </p>
            {flight.type === "incoming" && (
              <p className={styles.time}>
                {`Baggage Carousel: ${flight?.baggageCarousel ? flight?.baggageCarousel : "-"}`}
              </p>
            )
            }

          </div>
        </div>
        <div className={styles.flightActions}>
          {/* <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div> */}
          {
            !flight?.gateNo && flight.status != "COMPLETED" && (
              <div
                className={styles.icon}
                onClick={() => handleUpdate()}
                onKeyDown={() => handleUpdate()}
                tabIndex={0}
                role="button"
              >
                <MdEdit />
              </div>
            )
          }

        </div>
      </motion.div>
      <AirlinesModal
        formType="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        flight={flight}
      />
    </>
  );
}

export default AirlinesItem;
