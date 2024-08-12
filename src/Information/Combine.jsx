import Comodity from './Comodity';
import Ledger from './Ledger';
import Nature from './Nature';
import Divider from '@mui/material/Divider';
export default function Info() {
  return (
    <>
      <div className="flex flex-col">
        <Comodity />
        <Divider />
        <Nature />
        <Divider />
        <Ledger />
      </div>
    </>
  );
}
