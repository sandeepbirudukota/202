import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import axios from "../common/axiosInstance";
// import { HomePage } from "./HomePage";

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import MuiAlert from '@mui/material/Alert';


import moment from "moment";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const ViewArrival = () => {

    const [arrivalNextHr, setArrivalNextHr] = useState(1);
    const [arrivalType, setArrivalType] = useState('incoming');
    const [arrivalRows, setArrivalRows] = useState([]);
    const [isLoad, setLoad] = useState(true)

    useEffect(() => {
        setArrivalRows([]);
        loadArrivalFlights()
        // console.log(isLoad)

    }, [arrivalType, arrivalNextHr, isLoad]);

    const handleNextHrChange = (event) => {
        setArrivalNextHr(event.target.value);
    };


    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    function createInBoundFlightData(
        airlineName,
        flightNo,
        from,
        time,
        gateNo,
        terminal,
        baggageCarousel,
        status
    ) {
        return {
            airlineName,
            flightNo,
            from,
            time,
            gateNo,
            terminal,
            baggageCarousel,
            status
        };
    }

    const loadArrivalFlights = () => {
        axios
            .get(`/airline/get?type=${arrivalType}&hour=${arrivalNextHr}`)
            .then((res) => {
                if (res.status == 200) {
                    res.data.forEach((el) => {
                        setArrivalRows(
                            oldArray => [...oldArray,
                            createInBoundFlightData(el.airlineName, el.flightNo, el.origin, moment(el.arrivalTime).format('lll'), el?.gateNo?.gateNo, el?.gateNo?.terminal, el?.baggageCarousel,el?.status)
                            ]
                        );
                    });
                }

            })
            .catch((err) => {
                setLoad(false)
                console.log("in catch", err.response.data.error);
            })
    }


    const renderSched = (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Airline</StyledTableCell>
                        <StyledTableCell align="right">Flight No</StyledTableCell>
                        <StyledTableCell align="right">Arriving From</StyledTableCell>
                        <StyledTableCell align="right">Time</StyledTableCell>
                        <StyledTableCell align="right">Status</StyledTableCell>
                        <StyledTableCell align="right">Gate No</StyledTableCell>
                        <StyledTableCell align="right">Baggage Carousel</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        arrivalRows && arrivalRows?.length > 0 && (
                            arrivalRows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.airlineName}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.flightNo}</StyledTableCell>
                                    <StyledTableCell align="right">{row.from}</StyledTableCell>
                                    <StyledTableCell align="right">{row.time}</StyledTableCell>
                                    <StyledTableCell align="right">{row.status}</StyledTableCell>
                                    <StyledTableCell align="right">{row.terminal}{row.gateNo}</StyledTableCell>
                                    <StyledTableCell align="right">{row.baggageCarousel}</StyledTableCell>

                                </StyledTableRow>
                            )))}
                </TableBody>
            </Table>
        </TableContainer>
    );


    const renderSelectTime = (
        <Box sx={{ m: 1, maxWidth: 100 }}>
            <FormControl fullWidth>
                <InputLabel style={{fontSize:"19px"}} id="demo-simple-select-label">Next Hr</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={arrivalNextHr}
                    label="Next Hr"
                    onChange={handleNextHrChange}
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
    return (
        <Box sx={{ flexGrow: 1 }}>
            {renderSelectTime}
            {arrivalRows && arrivalRows?.length > 0 ? (

                <div style={{ display: 'flex', marginTop: '10px' }}>

                    {renderSched}
                    {isLoad}
                </div>

            ) :
                arrivalRows && arrivalRows?.length == 0 && isLoad ? (
                    <CircularProgress />
                ) : (
                    <Alert severity="info">No Data</Alert>
                )
            }
        </Box>
    )
};