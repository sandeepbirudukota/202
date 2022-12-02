const { type } = require('express/lib/response');
const flight = require('../model/flight');
const User = require('../model/user');
const moment = require('moment');
const gate = require('../model/gate');
const mongoose = require("mongoose");
const baggageCarousel = require('../model/baggageCarousel');
class Airline {
  static getFlightDetails = async (flightType, nextHour) => {
    // console.log(moment().subtract(54, 'hours').format('lll') + " " + moment().subtract(nextHour, 'hours').format('lll'));
    try {
      let flights;
      if (flightType == "incoming") {
        flights = await flight.find({
          type: flightType,
          arrivalTime: {
            $gte: moment().format('lll'),
            $lt: moment().add(nextHour, 'hours').format('lll'),
          },
        }).populate('gateNo');
      }
      else {
        flights = await flight.find({
          type: flightType,
          departureTime: {
            $gte: moment().format('lll'),
            $lt: moment().add(nextHour, 'hours').format('lll'),
          },
        }).populate('gateNo');
      }

      // console.log(flights)

      if (flights?.length > 0) {
        return flights;
      }
    } catch (err) {
      console.log(err);
      console.log(
        'Some unexpected error occured while fetching flight details'
      );
    }
  };

  static getFlightDetailsForAirline = async (name) => {
    try {
      let flights;
      flights = await flight.find({
        airlineName: name
      }).populate('gateNo');

      if (flights?.length > 0) {
        return flights;
      }
    } catch (err) {
      console.log(err);
      console.log(
        'Some unexpected error occured while fetching flight details'
      );
    }
  };
  static addFlight = async (data) => {
    try {
      const query = {
        id: data.id,
        airlineName: data.airlineName,
        flightNo: data.flightNo,
        type: data.type,
        arrivalTime: data.arrivalTime,
        departureTime: data.departureTime,
        origin: data.origin,
        destination: data.destination,
        // username: data.username,
      };
      // let foundUser = await flight.findOne({
      //   airlineName: query['airlineName'],
      //   flightNo: query['flightNo'],
      // });
      let foundUser = await flight.findOne(query);
      //       console.log(foundUser);
      if (foundUser) {
        console.log('Flight Details Already Exists..');
        return false;
      } else {
        const newFlight = new flight(data);
        await newFlight.save();
        return { newFlight };
      }
    } catch (err) {
      console.log(err);
      console.log('Some unexpected error occured while Adding Flight');
    }
  };

  //Update Flight Functionality
  static updateFlight = async (data) => {
    try {
      const query = {
        airlineName: data.airlineName,
        flightNo: data.flightNo,
        origin: data.origin,
        destination: data.destination,
        type: data.type,
        // username: data.username,
      };
      let foundUser = await flight.findOneAndUpdate(query, data, {
        new: true,
      });
      //       console.log(foundUser);
      if (foundUser) {
        console.log('Flight Details Updated');
        await foundUser.save();
        return { foundUser };
      } else {
        console.log('No Flight found with given details....');
        return false;
      }
    } catch (err) {
      console.log(err);
      console.log('Some unexpected error occured while Updating Flight');
    }
  };


  static randomGateAssignment = async () => {
    // const f = await flight.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         // {
    //         //   "departureTime": { $gte: new Date(moment().add(120, 'minutes')), $lt: new Date(moment().add(122, 'minutes')) },
    //         //   // "gateNo": {$ne: true},
    //         //   "type": "outgoing"
    //         // },
    //         // {
    //         //   "arrivalTime": { $lt: new Date(moment(Date.now())) },
    //         //   // "gateNo": {$ne: true},
    //         //   "type": "incoming"
    //         // }
    //         {
    //           "departureTime": { $gte: new Date(moment().add(120, 'minutes')), $lt: new Date(moment().add(122, 'minutes')) },
    //           "gateNo": { $ne: true },
    //           "type": "outgoing"
    //         },
    //         {
    //           "arrivalTime": { $gte: new Date(moment().add(60, 'minutes')), $lt: new Date(moment().add(62, 'minutes')) },
    //           "gateNo": { $ne: true },
    //           "type": "incoming"
    //         }
    //       ]
    //     }
    //   }
    // ])

    // console.log(f)
    const flights = await flight.aggregate([
      {
        $match: {

          $or: [
            {
              "departureTime": { $gte: new Date(moment().add(120, 'minutes')), $lt: new Date(moment().add(123, 'minutes')) },
              "gateNo": { $ne: true },
              "type": "outgoing"
            },
            {
              "arrivalTime": { $gte: new Date(moment().add(60, 'minutes')), $lt: new Date(moment().add(63, 'minutes')) },
              "gateNo": { $ne: true },
              "type": "incoming"
            }
          ]

        }
      },
      {
        $group: {
          _id: {
            id: "$_id",
            type: "$type",
            status: "$status",
            // // gate: "$gateNo",
            flightNo: "$flightNo",
            arrivalTime: "$arrivalTime",
            departureTime: "$departureTime"
          },
        }
      },
      {
        $group: {
          _id: "$_id.type",
          data: {
            $push: {
              id: "$_id.id",
              status: "$_id.status",
              // gateNo: "$_id.gate",
              flightNo: "$_id.flightNo",
              arrivalTime: "$_id.arrivalTime",
              departureTime: "$_id.departureTime"
            }
          }
        }
      },
      {
        $unwind: '$data',
      },
      {
        $sort: {
          'data.arrivalTime': 1,
          'data.departureTime': 1,
        }
      },
      {
        $group: {
          _id: '$_id',
          data: {
            $push: '$data',
          }
        }
      }
    ]);

      console.log("testing");
      console.log(flights);

    const arrivalGates = await gate.find({
      "to": null,
      "from": null,
      "gateEnabled": true,
      "terminal": "X"
    }
    );

    const departureGates = await gate.find({
      "to": null,
      "from": null,
      "gateEnabled": true,
      "terminal": "Y"
    }
    );
    // console.log(arrivalGates.length)
    // console.log(departureGates.length)
    let upateFlightArr = [];
    let updateArrivalGates = [];
    let updateDepartureGates = [];

    for (let i = 0; i < flights.length; i++) {
      console.log(flights[i])
      if (flights[i]._id == "incoming" && flights[i]?.data.length > 0 && arrivalGates.length > 0) {
        let n = flights[i]?.data.length > arrivalGates.length ? arrivalGates.length : flights[i]?.data.length;
        console.log("N=" + n)
        for (let j = 0; j < n; j++) {

          flights[i].data[j].gateNo = arrivalGates[j]._id;
          arrivalGates[j].from = new Date(flights[i].data[j].arrivalTime);
          arrivalGates[j].to = new Date(moment(flights[i].data[j].arrivalTime).add(1, 'hours'))
          arrivalGates[j].flight = flights[i].data[j].flightNo
          if (flights[i]?.data[j].status == "NEW")
            flights[i].data[j].status = "ON TIME";

          upateFlightArr.push({
            updateOne: {
              filter: {
                _id: mongoose.Types.ObjectId(flights[i].data[j].id),
              },
              update: {
                $set: {
                  "status": flights[i].data[j].status,
                  "gateNo": flights[i].data[j].gateNo
                },
              },
            },
          });
          updateArrivalGates.push({
            updateOne: {
              filter: {
                _id: mongoose.Types.ObjectId(arrivalGates[j]._id),
              },
              update: {
                $set: {
                  "to": arrivalGates[j].to,
                  "from": arrivalGates[j].from,
                  "flight": arrivalGates[j].flight
                },
              },
            },
          });

        }
      }

      else if (flights[i]._id == "outgoing" && flights[i]?.data.length > 0 && departureGates.length > 0) {
        let n = flights[i]?.data.length > departureGates.length ? departureGates.length : flights[i]?.data.length;

        for (let j = 0; j < n; j++) {
          flights[i].data[j].gateNo = departureGates[j]._id;
          departureGates[j].from = new Date(moment(flights[i].data[j].departureTime).subtract('1', 'hours'));
          departureGates[j].to = new Date(flights[i].data[j].departureTime)
          departureGates[j].flight = flights[i].data[j].flightNo
          console.log(flights[i].data[j])
          if (flights[i]?.data[j].status == "NEW")
            flights[i].data[j].status = "ON TIME";
          upateFlightArr.push({
            updateOne: {
              filter: {
                _id: mongoose.Types.ObjectId(flights[i].data[j].id),
              },
              update: {
                $set: {
                  "status": flights[i].data[j].status,
                  "gateNo": flights[i].data[j].gateNo
                },
              },
            },
          });
          updateDepartureGates.push({
            updateOne: {
              filter: {
                _id: mongoose.Types.ObjectId(departureGates[j]._id),
              },
              update: {
                $set: {
                  "to": departureGates[j].to,
                  "from": departureGates[j].from,
                  "flight": departureGates[j].flight
                },
              },
            },
          });
        }
      }



    }

    
   
    let updateGates = [...updateArrivalGates, ...updateDepartureGates]
    const promiseUpateFlightArr = flight.bulkWrite(upateFlightArr);
    const promiseUpdateGates = gate.bulkWrite(updateGates)
  
    Promise.all([promiseUpateFlightArr, promiseUpdateGates]).then((values) => {
      console.log("Scheduler work done")
    });

  }



  // deallocate flights and gates
  static randomGateDeallocate = async () => {

    let upateFlights = [];
    let updateGates = [];
    let updatebagCarousel = [];

    const flightsComp = await flight.find(
      {
        $or: [
          {
            type: "incoming",
            arrivalTime: {
              $lt: new Date(moment(Date.now()).subtract('1', 'hours')),
            },
            gateNo: { $ne: null },
            status: { $ne: "COMPLETED" },
            // baggageCarousel: { $ne: null },
          },
          {
            type: "outgoing",
            departureTime: {
              $lt: new Date(Date.now()),
            },
            gateNo: { $ne: null },
            status: { $ne: "COMPLETED" }
          }
        ]
      }
    );
    // const flightsLate = await flight.find(
    //   {
    //     status: "LATE",
    //     gateNo: { $ne: null }
    //   }
    // )

    let baggageCar = [];
    const gatesFrom = await gate.find(
      {
        'to': { $lt: new Date(Date.now()) }
      }
    );
    // console.log("gates")
    // console.log(gatesFrom)

    for (let i = 0; i < flightsComp.length; i++) {
      if(flightsComp[i]?.baggageCarousel) baggageCar.push(flightsComp[i]?.baggageCarousel)
      upateFlights.push({
        updateOne: {
          filter: {
            _id: mongoose.Types.ObjectId(flightsComp[i]._id),
          },
          update: {
            $set: {
              "status": "COMPLETED",
              "gateNo": null,
              // "baggageCarousel": null
            },
            $unset: { "baggageCarousel": "" }
          }

        }
      });
    }
    // for (let i = 0; i < flightsLate.length; i++) {
    //   const gatesforLateFlight = await gate.find(
    //     {
    //       _id: mongoose.Types.ObjectId(flightsLate[i]?.gateNo)
    //     }
    //   );
    //   lateFlightsGate.add(gatesforLateFlight)
    //   upateFlights.push({
    //     updateOne: {
    //       filter: {
    //         _id: mongoose.Types.ObjectId(flightsLate[i]._id),
    //       },
    //       update: {
    //         $set: {
    //           "status": "COMPLETED",
    //           "gateNo": null,
    //         },
    //         $unset: { "baggageCarousel": "" }
    //       },
    //     },
    //   });
    // }

    // console.log(baggageCar)

    for (let i = 0; i < baggageCar.length; i++) {
      updatebagCarousel.push({
        updateOne: {
          filter: {
            carouselNo: baggageCar[i].substring(1),
            terminal: baggageCar[i].substring(0, 1)
          },
          update: {
            $set: {
              "assigned": false
            },
          },
        },
      });
    }
    // const gates = [...gatesFrom, ...lateFlightsGate];
    const gates = gatesFrom;
    for (let i = 0; i < gates.length; i++) {
      updateGates.push({
        updateOne: {
          filter: {
            _id: mongoose.Types.ObjectId(gates[i]._id),
          },
          update: {
            $set: {
              "to": null,
              "from": null,
              "flight": null
            },
          },
        },
      });
    }
 
    const promiseUpdateFlights = flight.bulkWrite(upateFlights);
    const promiseUpdateGates = gate.bulkWrite(updateGates);
    const promiseUpdatebagCarousel = baggageCarousel.bulkWrite(updatebagCarousel);
    Promise.all([promiseUpdateFlights, promiseUpdateGates, promiseUpdatebagCarousel]).then((values) => {
      console.log("Deallocation done by scheduler");
    });
    // if (upateFlights.length > 0)
    //   await flight.bulkWrite(upateFlights);
    // if (updateGates.length > 0)
    //   await gate.bulkWrite(updateGates)

    // if (updatebagCarousel.length > 0)
    //   await baggageCarousel.bulkWrite(updatebagCarousel)
  }

}

module.exports.Airline = Airline;
