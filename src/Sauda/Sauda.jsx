import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import SaudaComponent from './SaudaComponents';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { format } from 'date-fns';

export default function Sauda() {
  //Allocations
  const [id, setid] = useState(0);
  const [info, setinfo] = useState([]);
  const [Comodity, setComodity] = useState([]);
  const [Nature, setnature] = useState([]);
  const [commonAMNTeBuyer, setCommon] = useState(0);
  const [commonAMNTSeller, setCommonSeller] = useState(0);
  const [weigth, setWeigth] = useState(0);
  const [commodity, setcomodity] = useState('');
  const [AnotherOpen, setAnotherOpen] = useState(false);
  const [open, setOpen] = useState(false);

  //getting Qunatity
  const [quantity, setQuantity] = useState(0);

  //Handling Comission
  const [Comission, setComission] = useState('');
  const [Comissio2, setComissio2] = useState('');
  const handleChange = (event) => {
    setComission(event.target.value);
    if (event.target.value === 'Yes') {
      console.log('if Working');
      setCommon(selectedDataNature.rate * quantity);
    } else {
      console.log('Not working Comission = ', event.target.value);
    }
    //  &&
    // console.log(commonAMNTeBuyer);
  };
  const handleChange2 = (event) => {
    setComissio2(event.target.value);
    event.target.value === 'Yes' &&
      setCommonSeller(selectedDataNatureS.rate * quantity);
  };
  const handleQunatity = (event) => {
    setQuantity(event.target.value);
  };

  //Handling Comodity
  const handleComodity = async (event, newValue) => {
    if (newValue) {
      setcomodity(newValue);
    } else {
      setcomodity('');
    }
  };

  //Handling Common Rates
  const [Rates, setRates] = useState({
    buyerRate: '',
    sellerRate: '',
  });

  //Handling Diabled Columns
  const [selectedData, setSelectedData] = useState({
    ledger: '',
    station: '',
    grop: '',
  });
  const [selectedDataSeller, setSelectedDataSeller] = useState({
    ledger: '',
    station: '',
    grop: '',
  });
  const [selectedDataNature, setSelectedNature] = useState({
    nature: '',
    rate: 0,
    calculatedby: '',
  });
  const [selectedDataNatureS, setSelectedNatureS] = useState({
    nature: '',
    rate: 0,
    calculatedby: '',
  });

  //Events
  function handledateChange(event) {
    let inputValue = event.target.value;
    if (!/^\d{4}-\d{2}-\d{3}$/.test(inputValue)) {
      setDate(inputValue);
    }
  }
  const date = new Date();
  const [formattedDate, setDate] = useState(format(date, 'yyyy-MM-dd'));
  useEffect(() => {
    fetch('http://localhost:3001/all')
      .then((response) => response.json())
      .then((data) => {
        setid(
          data.Sauda.length !== 0 ? data.Sauda[data.Sauda.length - 1].id + 1 : 1
        );
        setinfo(data.Ledger);
        setComodity(data.Comodity);
        setnature(data.Nature);
      });
  }, []);

  //Handling AutoComplete ^-^ Buyer
  const handleAutocompleteChange = async (event, newValue) => {
    if (newValue) {
      setSelectedData(newValue);
    } else {
      setSelectedData({
        ledger: '',
        station: '',
        grop: '',
      });
    }
  };

  //Handling AutoComplete ^-^ Seller
  const handleAutocomplete = async (event, newValue) => {
    if (newValue) {
      setSelectedDataSeller(newValue);
    } else {
      setSelectedData({
        ledger: '',
        station: '',
        grop: '',
      });
    }
  };

  //Handling AutoComplete ^-^ Nature from Buyer Side
  const handleAutocompleteNature = async (event, newValue) => {
    if (newValue) {
      setSelectedNature(newValue);
    } else {
      setSelectedNature({
        nature: '',
        rate: 0,
        calculatedby: '',
      });
    }
  };

  //Handling AutoComplete ^-^ Nature from Buyer Side
  const handleAutocompleteNatureSeller = async (event, newValue) => {
    if (newValue) {
      setSelectedNatureS(newValue);
    } else {
      setSelectedNatureS({
        nature: '',
        rate: 0,
        calculatedby: '',
      });
    }
  };

  //Handle Rates
  const handleBuyerRateChange = async (event) => {
    const newBuyerRate = event.target.value;
    setRates((prevRates) => ({
      ...prevRates,
      buyerRate: newBuyerRate,
      sellerRate: newBuyerRate, // Automatically fill seller's rate with buyer's rate
    }));
  };

  const handleSellerRateChange = async (event) => {
    const newSellerRate = event.target.value;
    setRates((prevRates) => ({
      ...prevRates,
      sellerRate: newSellerRate, // Allow independent change of seller's rate
    }));
  };

  //Handling Weight
  const handleWeightChange = async (event) => {
    setWeigth(event.target.value);
  };

  //cheking form data is empty or not
  function checkFormData(formData) {
    for (const key in formData) {
      if (
        key !== 'weigth' &&
        (formData[key] === undefined || formData[key] === 0)
      ) {
        return true;
      }
    }
    if (formData[weigth] === 0 || formData[weigth] !== 0) {
      return false;
    }
  }

  //Storing Information
  const handleClick = () => {
    var formData = {
      date: formattedDate,
      comodity: commodity.comodity,
      quantity: Number(quantity),
      buyer: selectedData.ledger,
      brate: Number(Rates.buyerRate),
      bnature: selectedDataNature.nature,
      bamount: commonAMNTeBuyer,
      btype: 'B',
      seller: selectedDataSeller.ledger,
      srate: Number(Rates.sellerRate),
      snature: selectedDataNatureS.nature,
      samount: commonAMNTSeller,
      stype: 'S',
      weigth: Number(weigth),
    };
    checkFormData(formData)
      ? setAnotherOpen(true)
      : fetch('http://localhost:3001/sauda', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.response) {
              handleClickSauda();
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Failed to submit the form');
          });
  };
  const handleClickSauda = () => {
    setOpen(true);
    setComission('');
    setComissio2('');
    setQuantity(0);
  };

  const handleClose = () => {
    setAnotherOpen(false);
    setOpen(false);
  };
  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4 flex justify-center">
        Sauda Details
      </h1>
      <SaudaComponent
        id={id}
        info={info}
        Comodity={Comodity}
        Nature={Nature}
        commonAMNTeBuyer={commonAMNTeBuyer}
        commonAMNTSeller={commonAMNTSeller}
        Comission={Comission}
        Comissio2={Comissio2}
        Rates={Rates}
        selectedData={selectedData}
        selectedDataSeller={selectedDataSeller}
        selectedDataNature={selectedDataNature}
        selectedDataNatureS={selectedDataNatureS}
        formattedDate={formattedDate}
        handleChange={handleChange}
        handleChange2={handleChange2}
        handleQunatity={handleQunatity}
        handleAutocomplete={handleAutocomplete}
        handleAutocompleteChange={handleAutocompleteChange}
        handleAutocompleteNature={handleAutocompleteNature}
        handleAutocompleteNatureSeller={handleAutocompleteNatureSeller}
        handleBuyerRateChange={handleBuyerRateChange}
        handleSellerRateChange={handleSellerRateChange}
        handleWeightChange={handleWeightChange}
        weigth={weigth}
        handleComodity={handleComodity}
        quantity={quantity}
        handledatechange={handledateChange}
      />
      <div className="flex justify-center">
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 6, paddingX: 8, paddingY: 2 }}
          onClick={handleClick}
        >
          Save
        </Button>
      </div>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={4000}>
        <Alert variant="filled" severity="success">
          Insert Sucessfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={AnotherOpen}
        onClose={handleClose}
        autoHideDuration={4000}
      >
        <Alert variant="filled" severity="error">
          Please Enter All Values
        </Alert>
      </Snackbar>
    </>
  );
}
