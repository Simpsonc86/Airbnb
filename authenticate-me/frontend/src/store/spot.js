import { csrfFetch } from "./csrf";

//redux
//type string
const GET_ALL_SPOTS = 'spot/getAllSpots';
const GET_ONE_SPOT = 'spot/getSpot';
const CREATE_SPOT = 'spot/createSpot'

//action creator
const getAllSpots = (spots) => {
    // console.log(' all spots: ',spots);
    return {
        type: GET_ALL_SPOTS,
        payload: spots
    }
}

const getSpot = (spot) => {
    return {
        type: GET_ONE_SPOT,
        payload: spot
    }
}

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        payload: spot
    }
}
//thunk action creator
export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots');

    if (res.ok) {
        const data = await res.json();
        // console.log(data);
        dispatch(getAllSpots(data));
        return data;
    }
}

export const getSpotThunk = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`);
    if (res.ok) {
        const data = await res.json();
        // console.log('res data from thunk',data);
        dispatch(getSpot(data));
        return data;
    }
}

export const createSpotThunk = (spot) => async (dispatch)=>{
    
    // fetch from api
    const res = await csrfFetch(`/api/spots`, {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(spot)
    });
    console.log('response from fetch',res);

    if(res.ok){
        const createdSpot = await res.json();
        //iterate through spot images

        console.log('this is the created spot',createdSpot);
        await dispatch(createSpot(createdSpot))
        return createdSpot;
    }else{
        const createdSpot = await res.json();
        return createdSpot;
    }
}
//reducer: case in the reducer for all spots

const initialState = { spots: {}, oneSpot: {} }


const spotReducer = (state = initialState, action) => {
    let newState;
    console.log('action from spotReducer', action);
    switch (action.type) {
        case GET_ALL_SPOTS: {
            //normalize spot data
            newState = { spots: {}, oneSpot: {} }
            // console.log('allspots',action.payload.Spots);
            action.payload.Spots.forEach(spot => {
                newState.spots[spot.id] = spot
            });

            // console.log('newState :',newState);
            return newState;
        }
        case GET_ONE_SPOT: {
            const spot = action.payload
            newState = { spots: {}, oneSpot: { ...spot } }
            // newState.oneSpot= spot;
            console.log('get one spot', newState);
            return newState;
        }
        case CREATE_SPOT:{
            const spot = action.payload
            newState = { spots:{},oneSpot:{...spot}}
            console.log('create a spot',newState);
            return newState;
        }
        default: {
            return state;
        }
    }
}

export default spotReducer;

