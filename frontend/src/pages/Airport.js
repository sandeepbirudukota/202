import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import axios from "../common/axiosInstance";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Switch from "@mui/material/Switch";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { orange } from "@mui/material/colors";

export const Airport = () => {
    const [gates, setGates] = useState([]);
    const [flights, setFlights] = useState([]);
    const [flightCarousel, setFlightCarousel] = useState("");
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setGates([]);
        setFlights([]);
        loadGatesData();
        loadFlightsData();
    }, []);

    const Demo = styled("div")(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const handleFlightChange = (flight) => {
        console.log(flight);
        //setFlightCarousel(flight);
    };

    const StyledTableRow = styled(TableRow)(() => ({
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const StyledButton = styled(Button)(() => ({
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    const generate = (element) => {
        return gates.map((value) =>
            React.cloneElement(element, {
                key: value,
            })
        );
    };
    function createLoadGateData(gateNo, terminal, gateEnabled, flight) {
        return {
            gateNo,
            terminal,
            gateEnabled,
            flight,
        };
    }

    function createInBoundFlightData(
        airlineName,
        flightNo,
        from,
        time,
        gateNo,
        carousel
    ) {
        return {
            airlineName,
            flightNo,
            from,
            time,
            gateNo,
            carousel,
        };
    }

    const loadGatesData = () => {
        axios
            .get(`/gates/getGateDetails`)
            .then((res) => {
                if (res.status == 200) {
                    res.data.gates.forEach((el) => {
                        setGates((oldArray) => [
                            ...oldArray,
                            createLoadGateData(
                                el?.gateNo,
                                el?.terminal,
                                el?.gateEnabled,
                                el?.flight
                            ),
                        ]);
                    });
                }
                // }
            })
            .catch((err) => {
                console.log("in catch", err);
            });
    };

    const setGatesData = (gateNo, terminal, type) => {
        console.log(gateNo + " " + terminal);
        axios
            .post(`/airport/gateMaintenance`, {
                gate: gateNo,
                type: type,
                terminal: terminal,
            })
            .then((res) => {
                if (res.status == 200) {
                    console.log(res.data);
                    const newState = gates.map((obj) => {
                        if (
                            obj.gateNo === res.data.gate.gateNo &&
                            obj.terminal == res.data.gate.terminal
                        ) {
                            return { ...obj, gateEnabled: res.data.gate.gateEnabled };
                        }
                        return obj;
                    });

                    setGates(newState);
                    toast.success("Gate " + terminal + "" + gateNo + " set to " + type);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.error);
                console.log("in catch", err);
            });
    };

    const loadFlightsData = () => {
        // axios
        //     .get(`/airline/getFlightDetails?type=outgoing&hour=2`)
        //     .then((res) => {
        //         if (res.status == 200) {
        //             res.data.flights.forEach((el) => {
        //                 let gateNo;
        //                 if (el.gateNo != null) {
        //                     gateNo = el.gateNo.gateNo;
        //                 }
        //                 else {
        //                     gateNo = "No gate assigned yet"
        //                 }

        //                 setFlights(
        //                     oldArray => [...oldArray,
        //                     createInBoundFlightData(el.airlineName, el.flightNo, el.origin + " - " + el.destination, moment(el.departureTime).format('lll'), gateNo, el.baggageCarousel)
        //                     ]
        //                 );
        //             });
        //         }

        //     })
        //     .catch((err) => {
        //         console.log("in catch", err.response.data.error);
        //     })

        axios
            .get(`/airline/get?type=incoming&hour=2`)
            .then((res) => {
                if (res.status == 200) {
                    res.data.forEach((el) => {
                        console.log(el);
                        setFlights((oldArray) => [
                            ...oldArray,
                            createInBoundFlightData(
                                el.airlineName,
                                el.flightNo,
                                el.origin + " - " + el.destination,
                                moment(el.arrivalTime).format("lll"),
                                el.gateNo ? el.gateNo : "No gate assigned yet",
                                el.baggageCarousel
                            ),
                        ]);
                    });
                }
            })
            .catch((err) => {
                console.log("in catch", err.response.data.error);
                // toast.error(err.response.data.error);
            });
    };

    const assignCarousel = (event, flight) => {
        event.preventDefault();
        console.log(flight);
        axios
            .post(`/airport/setCarousel`, {
                flightNo: flight.flightNo,
                gateNo: flight?.gateNo?._id,
            })
            .then((res) => {
                console.log(res);
                const newState = flights.map((obj) => {
                    if (
                        obj.flightNo === res.data.flightNo &&
                        obj.gateNo._id == res.data.gateNo
                    ) {
                        return { ...obj, carousel: res.data.baggageCarousel };
                    }
                    return obj;
                });
                setFlights(newState);
            })
            .catch((err) => {
                console.log("in catch", err.response.data.error);
            });
    };

    const handleProfileMenuOpen = (event) => {
        localStorage.clear()
        navigate("/");
    };

    const handleGateToggle = (row) => {
        if (row.flight) {
            toast.error("Flight #" + row?.flight + " has occupied " + row.terminal + "" + row.gateNo);
            return;
        }
        setGatesData(row.gateNo, row.terminal, !row.gateEnabled);
    };
    const styles = theme => ({
        listItemText:{
          fontSize:'0.7em',//Insert your required size
        }
      });

    const content = (
        <Grid item xs={12} md={6}  style={{fontSize:"50px", backgroundColor:"orangered"}} sx={{ width: "100%", fontSize: "100px" }}>
            <Typography sx={{ mt: 2, mb: 2 ,textTransform: 'capitalize'}} align="center" fontweight="Bold" variant="h3" component="div">
                 Gate Access Controller
            </Typography>
            <Demo>

                <List style={{fontSize:"20px", backgroundColor:"gray"}} dense={dense}>

                    <StyledTableCell style={{fontSize:"20px",backgroundColor:"greenyellow"}} sx={{ width: "6%"}} variant="h5">Terminal No</StyledTableCell>
                    <StyledTableCell style={{fontSize:"20px",backgroundColor:"greenyellow"}}  align="right" sx={{ width: "2%"}} fontSize="h2">Gate No</StyledTableCell>
                    <StyledTableCell style={{fontSize:"20px",backgroundColor:"greenyellow"}}  align="right" sx={{ width: "6%"}} variant="h1">Active/Deactive</StyledTableCell>
                    {gates.map((row, index) => (
                        <ListItem 

                            key={index}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    {/* <Switch
                                        checked={row.gateEnabled}
                                        onChange={() => handleGateToggle(row)}
                                        inputProps={{ "aria-label": "controlled" }}
                                        defaultChecked color="secondary"
                                        
                                    // disabled ={!!row.flight}
                                    /> */}
                                     <Checkbox
                                        edge="start"
                                        checked={row.gateEnabled}
                                        onChange={() => handleGateToggle(row)}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': "controlled" }}
                                        style ={{
                                            color: "#00e676",
                                            width:"55px"
                                          }}
                                        //defaultChecked color="secondary"

                                      />
                                </IconButton>
                            }
                        >
                            <ListItemText 
                                 primaryTypographyProps={{fontSize: '17px'}} 

                                primary={ "Terminal  " +row.gateNo}
                                secondary={secondary ? "Secondary text" : null}
                            />
                            <ListItemText
                             primaryTypographyProps={{fontSize: '17px'}} 

                                primary={"Gate "+row.terminal}
                                secondary={secondary ? "Secondary text" : null}
                            />
                        </ListItem>
                    ))}
                </List>
            </Demo>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        fontSize: "2rem",
                        color: "orange",
                        background:"black"

                    },
                }}
            />
        </Grid>
    );

    const baggage = (
        <Box sx={{ flexGrow: 1 }}>
            <div style={{ display: "flex", marginTop: "10px" }}>
                <TableContainer component={Paper}>
                    <Table style={{backgroundColor:"green"}} sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead >
                            <TableRow>
                                <StyledTableCell style={{fontSize:"20px"}}>Airline</StyledTableCell>
                                <StyledTableCell style={{fontSize:"20px"}} align="center">Flight No</StyledTableCell>
                                <StyledTableCell style={{fontSize:"20px"}} align="center">Flight Details </StyledTableCell>
                                <StyledTableCell style={{fontSize:"20px"}} align="center">Time</StyledTableCell>
                                <StyledTableCell style={{fontSize:"20px"}} align="center">Gate Number</StyledTableCell>
                                <StyledTableCell style={{fontSize:"20px"}} align="center">Carousel</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {flights &&
                                flights?.length > 0 &&
                                flights.map((row) => (
                                    <StyledTableRow style={{fontSize:"16px", backgroundColor:"gray"}} key={row.name}>
                                        <StyledTableCell style={{fontSize:"16px"}} component="th" scope="row">
                                            {row.airlineName}
                                        </StyledTableCell>
                                        <StyledTableCell style={{fontSize:"16px"}} align="center">
                                            {row.flightNo}
                                        </StyledTableCell>
                                        <StyledTableCell style={{fontSize:"16px"}} align="center">{row.from}</StyledTableCell>
                                        <StyledTableCell style={{fontSize:"16px"}} align="center">{row.time}</StyledTableCell>
                                        <StyledTableCell style={{fontSize:"16px"}} align="center">
                                            {"Gate " + row?.gateNo.gateNo}
                                        </StyledTableCell>

                                        {row.gateNo != "No gate assigned yet" && !row.carousel && (
                                            <StyledTableCell align="center">
                                                {" "}
                                                <Button
                                                    type="submit"
                                                    onClick={(event) => assignCarousel(event, row)}
                                                    variant="contained"
                                                    style={{height:"50px", color:"black", fontSize:"16px", backgroundColor:"#FFDB58"}}
                                                >
                                                    {" "}
                                                    ADD CAROUSEl{" "}
                                                </Button>
                                            </StyledTableCell>
                                        )}

                                        <StyledTableCell align="right">
                                            {row.carousel && row.carousel}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    );

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const renderHeader = (
        <Box sx={{ width: "100%" }}>
            <Box style={{backgroundColor: "#FFDB58", color: "black"}} sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab style={{fontSize:"20px",color:"black"}} label="Gate Maintenance" {...a11yProps(0)} />
                    <Tab style={{fontSize:"20px",color:"black"}} label="Baggage Carousel" {...a11yProps(1)} />
                    <Button
                        variant="outlined"
                        onClick={handleProfileMenuOpen}
                        sx={{
                            position: "absolute",
                            right: "37px",
                            height: "40px ",
                            top: "4px",
                            fontSize:"20px"
                        }}
                    >
                        LogOut
                    </Button>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {content}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {baggage}
            </TabPanel>
        </Box>
    );

    return <Box sx={{ flexGrow: 1 }}>{renderHeader}</Box>;
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
