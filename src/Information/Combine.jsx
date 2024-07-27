import Comodity from './Comodity';
import Ledger from './Ledger';
import Nature from './Nature';
import Divider from '@mui/material/Divider';
// import { useRef } from 'react';
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
