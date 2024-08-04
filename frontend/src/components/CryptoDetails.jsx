import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";

import { fetchCryptoDetails } from "../redux/features/cryptoSlice";

const selectCryptoDetails = state => state.crypto.cryptoDetails;
const selectCryptoById = createSelector(
  [selectCryptoDetails, (_, id) => id],
  (cryptoDetails, id) => cryptoDetails[id] || {}
);

const CryptoDetails = () =>{
  const { id } = useParams();
  const dispatch = useDispatch();
  const details = useSelector(state => selectCryptoById(state, id));

  useEffect(() =>{
    if(id && !details.name){
      dispatch(fetchCryptoDetails(id));
    }
  }, [dispatch, id, details.name]);

  return(
    <section className="container mx-auto p-4">
      {details && details.name && (
        <>
          <h1 className="text-2xl font-bold mb-4">{details.name}</h1>
          <p>Symbol: {details.symbol}</p>
          <p>Description: {details.description}</p>
        </>
      )}
      {!details.name && <div>Loading...</div>}
    </section>
  );
};

export default CryptoDetails;