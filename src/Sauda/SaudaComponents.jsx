import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
export default function SaudaComponent({
  id,
  info,
  Comodity,
  Nature,
  commonAMNTeBuyer,
  commonAMNTSeller,
  Comission,
  Comissio2,
  Rates,
  selectedData,
  selectedDataSeller,
  selectedDataNature,
  selectedDataNatureS,
  formattedDate,
  handleChange,
  handleChange2,
  handleQunatity,
  quantity,
  handledatechange,
  handleAutocompleteChange,
  handleAutocomplete,
  handleAutocompleteNature,
  handleAutocompleteNatureSeller,
  handleBuyerRateChange,
  handleSellerRateChange,
  handleWeightChange,
  weigth,
  handleComodity,
}) {
  return (
    <div className="flex flex-row">
      <div className="Left w-[80%] ">
        <TextField
          disabled
          id="outlined-disabled"
          label="Sauda Number"
          type="number"
          variant="outlined"
          value={id}
          sx={{ width: 400, margin: 2 }}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Comodity}
          getOptionLabel={(info) => info.comodity}
          sx={{ width: 400, marginY: 2, marginLeft: 13 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Comodity"
              InputProps={{
                ...params.InputProps,
                name: 'buyerLedger',
              }}
            />
          )}
          onChange={handleComodity}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={info}
          getOptionLabel={(info) => info.ledger}
          sx={{ width: 400, marginTop: 4, marginBottom: 2, marginLeft: 13 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Buyer"
              InputProps={{
                ...params.InputProps,
                name: 'buyerLedger',
              }}
            />
          )}
          onChange={handleAutocompleteChange}
        />
        <TextField
          id="outlined-Rate"
          label="Rate"
          variant="outlined"
          type="number"
          value={Rates.buyerRate}
          sx={{ width: 400, margin: 2 }}
          onChange={handleBuyerRateChange}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Nature}
          getOptionLabel={(Nature) => Nature.nature}
          sx={{ width: 400, marginY: 2, marginLeft: 13 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nature"
              InputProps={{
                ...params.InputProps,
                name: 'buyerLedger',
              }}
            />
          )}
          onChange={handleAutocompleteNature}
        />
        <Box sx={{ maxWidth: 400, marginLeft: 13 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Comission</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Comission}
              label="Comission"
              onChange={handleChange}
            >
              {/* <MenuItem>--None--</MenuItem> */}
              <MenuItem value={'Yes'}>Yes</MenuItem>
              <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={info}
          getOptionLabel={(info) => info.ledger}
          name="Seller"
          sx={{ width: 400, marginY: 2, marginLeft: 13 }}
          renderInput={(params) => <TextField {...params} label="Seller" />}
          onChange={handleAutocomplete}
        />
        <TextField
          id="outlined-Rate"
          label="Rate"
          variant="outlined"
          type="number"
          sx={{ width: 400, margin: 2 }}
          value={Rates.sellerRate}
          onChange={handleSellerRateChange}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={Nature}
          getOptionLabel={(Nature) => Nature.nature}
          sx={{ width: 400, marginY: 2, marginLeft: 13 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Nature"
              InputProps={{
                ...params.InputProps,
                name: 'buyerLedger',
              }}
            />
          )}
          onChange={handleAutocompleteNatureSeller}
        />
        <Box sx={{ maxWidth: 400, marginLeft: 13 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Comission</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={Comissio2}
              label="Comission"
              onChange={handleChange2}
            >
              {/* <MenuItem>--None--</MenuItem> */}
              <MenuItem value={'Yes'}>Yes</MenuItem>
              <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          id="outlined-Weigth"
          label="Weigth"
          variant="outlined"
          value={weigth}
          sx={{ width: 400, margin: 2 }}
          onChange={handleWeightChange}
        />
      </div>
      <div className="Right w-[80%] ">
        <TextField
          id="outlined-Date"
          label="Date"
          variant="outlined"
          value={formattedDate}
          onChange={handledatechange}
          sx={{ width: 400, margin: 2 }}
        />
        <TextField
          id="outlined-Quantity"
          label="Quantity"
          variant="outlined"
          type="number"
          value={quantity}
          sx={{ width: 400, margin: 2 }}
          onChange={handleQunatity}
        />
        <TextField
          disabled
          id="outlined-Station"
          label="Station"
          variant="outlined"
          value={selectedData.station}
          sx={{ width: 400, marginTop: 2, marginX: 2, marginBottom: 13 }}
        />
        <TextField
          disabled
          id="outlined-Comrate"
          label="Common Rate"
          variant="outlined"
          value={selectedDataNature.rate}
          sx={{ width: 400, margin: 2 }}
        />
        <TextField
          disabled
          id="outlined-Comamnt"
          label="Common Amount"
          variant="outlined"
          value={commonAMNTeBuyer}
          sx={{ width: 400, margin: 2 }}
        />
        <TextField
          disabled
          id="outlined-Sattion1"
          label="Station"
          variant="outlined"
          value={selectedDataSeller.station}
          sx={{ width: 400, marginTop: 2, marginX: 2, marginBottom: 13 }}
        />
        <TextField
          disabled
          id="outlined-cmr"
          label="Common Rate"
          variant="outlined"
          value={selectedDataNatureS.rate}
          sx={{ width: 400, margin: 2 }}
        />
        <TextField
          disabled
          id="outlined-cma"
          label="Common Amount"
          variant="outlined"
          value={commonAMNTSeller}
          sx={{ width: 400, margin: 2 }}
        />
      </div>
    </div>
  );
}
