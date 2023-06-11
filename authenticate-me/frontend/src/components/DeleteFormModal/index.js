// frontend/src/components/DeleteFormModal/index.js
import React from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteFormModal.css";
import { deleteSpotThunk } from "../../store/spot";
import { useHistory } from "react-router-dom";
import { getAllSpotReviewsThunk } from "../../store/reviews";
// import { useEffect } from "react";

function DeleteFormModal({spotId}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {closeModal}= useModal();
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpotThunk(spotId))
    await dispatch(getAllSpotReviewsThunk(spotId))
    closeModal();
    await history.push(`/current`)
    
  };

  return(
    <>
        <h1>Confirm Delete</h1>
        <h3>Are you sure you want to delete this spot from listings?</h3>
        <form onSubmit={handleSubmit}>
            <button type='submit'>Yes (Delete) </button>
            <button onClick={closeModal}>No</button>
        </form>
    </>

  )
}

export default DeleteFormModal;