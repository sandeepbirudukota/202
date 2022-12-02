import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ViewArrival } from "./ViewArrival";
import { ViewDeparture } from "./ViewDeparture";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import LoginIcon from '@mui/icons-material/Login';

export const HomePage = () => {
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    navigate("/login");
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderHeader = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1,margin:6, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
          <Tab style={{fontSize:"20px"}}label="Arrival" {...a11yProps(0)} />
          <Tab style={{fontSize:"20px"}} label="Departure" {...a11yProps(1)} />
          <Tab
            label="Sanjose International Airport"
            sx={{ width: "30%", alignItems: "self-end", colour:"blue",fontweight : "bold",fontSize: "18px",position: "absolute", textalign:"center",right: "20%" }}
            disabled
          />
          
          <LoginIcon
            sx={{color:"blue", position: "absolute", right: "37px", width:"40px",height: "40px " }}
            onClick={handleProfileMenuOpen}
          />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <ViewArrival />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ViewDeparture />
      </TabPanel>
    </Box>
  );

  return <>{renderHeader}</>;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other} style={{backgroundColor:"lightblue"}}
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
