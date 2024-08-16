import { useState } from 'react';
import './App.css';
import Login from './Logs/Login1';
import ClippedDrawer from './MenuBar/Menubar';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './MenuBar/Navbar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Home from './Home/Home';
import CombineInfo from './Information/CombineInfo';
import Sauda from './Sauda/Sauda';
import LedgerStationGroupTable from './Tables/LedgerStationGroupTable';
import BackdropGetDate from './Bill/BackdropGetDate';
import StickyHeadSaudaTable from './Bill/StickyHeadSaudaTable';
import NatureTable from './Tables/NatureTable';
import ComodityTable from './Tables/ComodityTable';
import SaudaTable from './Tables/SaudaTable';
import TotalDalali from './TotalDalali/TotalDalali';
import TotalDalaliByDate from './TotalDalali/TotalDataliByDate';
import TotalDalaliFinal from './TotalDalali/TotalDalaliFinal';

function App() {
  const [Log, SetLog] = useState(false);
  const [open, setOpen] = useState(false);
  const [SaudaData, SetSaudaDate] = useState([]);
  const [SearchData, SetSearchData] = useState([]);
  const [TD, setTD] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDalaliData = (Data) => {
    setTD(Data);
  };

  const handleData = (Data) => {
    SetSaudaDate(Data);
  };

  const handleSearch = (Data) => {
    SetSearchData(Data);
  };
  return (
    <div className="App">
      {Log ? (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar />
          <ClippedDrawer handleClickOpen={handleClickOpen} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Information" element={<CombineInfo />} />
              <Route path="/Sauda" element={<Sauda />} />
              <Route
                path="/LedgerTable"
                element={<LedgerStationGroupTable />}
              />
              <Route path="/NatureTable" element={<NatureTable />} />
              <Route path="/ComodityTable" element={<ComodityTable />} />
              <Route path="/Saudatable" element={<SaudaTable />} />
              <Route
                path="/Bill"
                element={
                  <BackdropGetDate
                    open={open}
                    handleClose={handleClose}
                    handleData={handleData}
                    handleSearch={handleSearch}
                  />
                }
              />
              <Route
                path="/Bill/saudaData"
                element={
                  <StickyHeadSaudaTable
                    SaudaData={SaudaData}
                    SearchData={SearchData}
                  />
                }
              />
              <Route path="/TotalDalali" element={<TotalDalali />} />
              <Route
                path="/TotalDalali_V2"
                element={
                  <TotalDalaliByDate
                    open={open}
                    handleClose={handleClose}
                    handleData={handleDalaliData}
                  />
                }
              />
              <Route
                path="/TotalFinalDalali"
                element={<TotalDalaliFinal gettingData={TD} />}
              />
            </Routes>
          </Box>
          {/*  */}
        </Box>
      ) : (
        <Login SetLog={SetLog} />
      )}
    </div>
  );
}

export default App;
