import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ChartComponent from './components/ChartComponents'
import PartnerQrCode from './components/PartnerQrCode'
import Reward from './components/Rewards'
import MaintenancePanel from './components/Maintenance'
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Navbar />
      <Box id="Stats" href="#Stats" sx={{ minHeight: "100vh", alignContent: "center" }}>
        <ChartComponent />
      </Box>
      <Box id="QrCode" href="#QrCode" sx={{ minHeight: "100vh", alignContent: "center" }}>
        <PartnerQrCode />
      </Box>
      <Box id="Rewards" href="#Rewards" sx={{ minHeight: "100vh", alignContent: "center" }}>
        <Reward />
      </Box>
      <Box id="Maintenance" href="#Maintenance" sx={{ minHeight: "100vh", alignContent: "center" }}>
        <MaintenancePanel />
      </Box>
    </>
  );
}

export default App