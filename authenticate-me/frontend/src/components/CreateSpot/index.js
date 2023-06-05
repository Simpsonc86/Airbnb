import { useDispatch, useSelector } from "react-redux";
import { createSpotThunk } from "../../store/spot";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import './CreateSpot.css'
// import { useModal } from '../../context/Modal';

function CreateSpot() {
    const history = useHistory()
    const dispatch = useDispatch()
    const owner = useSelector(state => {
        console.log('state from the store', state);
        return state.session.user
    });

    //states
    const [name, setname] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [errors, setErrors] = useState({});
    // const { closeModal } = useModal();

    // validations for controlled inputs
    useEffect(() => {
        const errObj = {};
        if (!name.length) errObj.name = "Title is required"
        if (!address.length) errObj.address = "Address is required"
        if (!description.length || description.length < 30) errObj.description = "Description needs a minimum of 30 characters"
        if (!city.length) errObj.city = "City is required"
        if (!country.length) errObj.country = "Country is required"
        if (!state.length) errObj.state = "State is required"
        if (isNaN(price) || Number(price) < 1) errObj.price = "Price is required"
        if (!previewImage || (!previewImage.endsWith('.png') && !previewImage.endsWith('.jpg') && !previewImage.endsWith('.jpeg'))) errObj.previewImage = "Preview image is required"
        if (image1 && !image1.endsWith('.png') && !image1.endsWith('.jpg') && !image1.endsWith('.jpeg')) errObj.image1 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image2 && !image2.endsWith('.png') && !image2.endsWith('.jpg') && !image2.endsWith('.jpeg')) errObj.image2 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image3 && !image3.endsWith('.png') && !image3.endsWith('.jpg') && !image3.endsWith('.jpeg')) errObj.image3 = "Image URL must end in .png, .jpg, or .jpeg"
        if (image4 && !image4.endsWith('.png') && !image4.endsWith('.jpg') && !image4.endsWith('.jpeg')) errObj.image4 = "Image URL must end in .png, .jpg, or .jpeg"
        setErrors(errObj)
    }, [dispatch, name, address, description, city, country, state, price, previewImage, image1, image2, image3, image4])



    const handleSubmit = async (e) => {
        e.preventDefault();
        // let spot ={}
        if (!Object.values(errors).length) {
            // create an array for images for thunk arg if there are no errors in errObj
            let imgArr = [];

            imgArr.push({ url: previewImage, preview: true })
            if (image1) imgArr.push({ url: image1, preview: false })
            if (image2) imgArr.push({ url: image2, preview: false })
            if (image3) imgArr.push({ url: image3, preview: false })
            if (image4) imgArr.push({ url: image4, preview: false })

            //Thunk args = (spot,images,owner)
            const createdSpot = await dispatch(createSpotThunk({
                name,
                address,
                description,
                city,
                country,
                lat: 0,
                lng: 0,
                state,
                price,
            }, imgArr, owner))

            console.log('This is the created spot', createdSpot);

            // console.log('This is the spot owner', owner);

            history.push(`/spots/${createdSpot.id}`)
        }

    }
    //if user adds bad data and thunk returns errors set errors object to those errors and display in jsx


    //call thunk and save response to variable check the created spot for errors
    //if errors display them else redirect to spot details
    // when submitted, reset the errors and validate again


    return (
        <div className="form-div">
            <form onSubmit={handleSubmit}>
                <h1>Create a new Spot</h1>
                <h2>Where's your place located?</h2>
                <h3>Guest will only get your exact address once they booked a reservation</h3>
                <label>
                    Country
                    {errors.country && <span className="errors">&nbsp;{errors.country}</span>}
                    <br />
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="Country"
                    // required
                    />
                </label>
                <br />
                <label>
                    Street Address
                    {errors.address && <span className="errors">&nbsp;{errors.address}</span>}
                    <br />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                    // required
                    />
                </label>
                <br />
                <div className="city-state-form-div">
                    <label className="city-label">
                        City
                        {errors.city && <span className="errors">&nbsp;{errors.city}</span>}
                        <br />
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                        // required
                        />
                    </label>
                    <span className="comma">,</span>    
                    &nbsp;
                    <label className="state-label">
                        State
                        {errors.state && <span className="errors">&nbsp;{errors.state}</span>}
                        <br />
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                        // required
                        />
                    </label>

                </div>
                <hr />
                <h2>Describe your place to guests</h2>
                <h3>
                    Mention the best features of your space, any special amentities like  fast wifi or paraking, and what you love about the neighborhood.
                </h3>
                <label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                    // required
                    />
                    {errors.description && <p className="errors">{errors.description}</p>}
                </label>
                <hr />
                <h2>Create a title for your spot</h2>
                <h3>
                    Catch guests' attention with a spot title that highlights what makes your place special.
                </h3>
                <label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Name of your spot"
                    // required
                    />
                    {errors.name && <p className="errors">{errors.name}</p>}
                </label>
                <hr />
                <h2>Set a base price for your spot</h2>
                <h3>
                    Competitive pricing can help your listing stand out and rank higher in the search results
                </h3>
                <label>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Price per night (USD)"
                    // required
                    />
                    {errors.price && <p className="errors">{errors.price}</p>}
                </label>
                <hr />
                <h2>Liven up your spot with photos</h2>
                <h3>
                    Submit a link to at least one photo to publish your spot.
                </h3>
                <label>
                    <input
                        type="text"
                        value={previewImage}
                        onChange={(e) => setPreviewImage(e.target.value)}
                        placeholder="Preview Image URL"
                    // required
                    />
                    {errors.previewImage && <p className="errors">{errors.previewImage}</p>}
                </label>
                <br />
                <label>
                    <input
                        type="text"
                        value={image1}
                        onChange={(e) => setImage1(e.target.value)}
                        placeholder="Image URL"
                    // required
                    />
                    {errors.image1 && <p className="errors">{errors.image1}</p>}
                </label>
                <br />
                <label>
                    <input
                        type="text"
                        value={image2}
                        onChange={(e) => setImage2(e.target.value)}
                        placeholder="Image URL"
                    // required
                    />
                    {errors.image2 && <p className="errors" >{errors.image2}</p>}
                </label>
                <br />
                <label>
                    <input
                        type="text"
                        value={image3}
                        onChange={(e) => setImage3(e.target.value)}
                        placeholder="Image URL"
                    // required
                    />
                    {errors.image3 && <p className="errors">{errors.image3}</p>}
                </label>
                <br />
                <label>
                    <input
                        type="text"
                        value={image4}
                        onChange={(e) => setImage4(e.target.value)}
                        placeholder="Image URL"
                    // required
                    />
                    {errors.image4 && <p className="errors">{errors.image4}</p>}
                </label>
                <hr />
                <button type='submit' disabled={!!Object.values(errors).length}>Create Spot</button>
            </form>
        </div>

    )
}

export default CreateSpot;