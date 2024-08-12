import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import SaudaComponent1 from './UpdateSauda2';
import { format } from 'date-fns';
export default function Saudaaaa({
  handleClose,
  FetchData,
  CurrentDate,
  selectID,
}) {
  //Allocations
  let id = selectID;
  const [info, setinfo] = useState([]);
  const [Comodity, setComodity] = useState([]);
  const [Nature, setnature] = useState([]);
  const [commonAMNTeBuyer, setCommon] = useState(0);
  const [commonAMNTSeller, setCommonSeller] = useState(0);
  const [weigth, setWeigth] = useState(0);
  const [commodity, setcomodity] = useState('');
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

  useEffect(() => {
    fetch('http://localhost:3001/all')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setinfo(data.Ledger);
        setComodity(data.Comodity);
        setnature(data.Nature);
      });
  }, []);
  const [formattedDate, setDate] = useState(format(CurrentDate, 'yyyy-MM-dd'));
  const handleDateChange = (event) => {
    let inputValue = event.target.value;
    if (!/^\d{4}-\d{2}-\d{3}$/.test(inputValue)) {
      setDate(inputValue);
    }
  };
  const handleKeyDown = (event) => {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
    ];

    // Prevent editing hyphens
    if (
      !allowedKeys.includes(event.key) &&
      event.target.selectionStart === event.target.selectionEnd
    ) {
      const position = event.target.selectionStart;
      if (position === 4 || position === 7) {
        alert("something's happening");
        event.preventDefault();
      }
    }
  };

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
    console.log(formData);
    FetchData(formData);
  };
  return (
    <>
      <h1 className="text-5xl font-semibold font-PlaywriteITModerna pt-4">
        Sauda Details
      </h1>
      <SaudaComponent1
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
        handleDateChange={handleDateChange}
        handleKeyDown={handleKeyDown}
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
        <Button
          variant="contained"
          color="primary"
          sx={{ margin: 6, paddingX: 8, paddingY: 2 }}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </>
  );
}
