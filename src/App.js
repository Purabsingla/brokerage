import { useState, useEffect } from 'react';
import './App.css';
import Login from './Logs/Login1';
import ClippedDrawer from './MenuBar/Menubar';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './MenuBar/Navbar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Me from './Home/Something';
import Info from './Information/Combine';
import Sauda from './Sauda/Sauda';
import LedgerStationGroupTable from './Tables/LedgerTable';
import FormDialog from './Bill/BackdropGetDate';
import StickyHeadSaudaTable from './Bill/DTable';
import NatureTable from './Tables/NatureTable';
import ComodityTable from './Tables/ComodityTable';
import SaudaTable from './Tables/SaudaTable';
import TotalDalali from './TotalDalali/TotalDalali';
function App() {
  const [ledger, setledger] = useState([]);
  const [nature, setnature] = useState([]);
  const [sauda, setsauda] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setsauda(data.Sauda);
        setledger(data.Ledger);
        setnature(data.Nature);
      });
  }, []);
  const [Log, SetLog] = useState(false);
  const [open, setOpen] = useState(false);
  const [SaudaData, SetSaudaDate] = useState([]);
  const [SearchData, SetSearchData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              <Route path="/" element={<Me />} />
              <Route path="/Information" element={<Info />} />
              <Route path="/Sauda" element={<Sauda />} />
              <Route
                path="/LedgerTable"
                element={<LedgerStationGroupTable initialLedger={ledger} />}
              />
              <Route
                path="/NatureTable"
                element={<NatureTable initialNature={nature} />}
              />
              <Route path="/ComodityTable" element={<ComodityTable />} />
              <Route
                path="/Saudatable"
                element={<SaudaTable initialSauda={sauda} />}
              />
              <Route
                path="/Bill"
                element={
                  <FormDialog
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
              <Route
                path="/TotalDalali"
                element={<TotalDalali initialSauda={sauda} />}
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
