import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addListing, editListing } from "../../redux/listings/listingAction";
import styles from "./AddListing.module.css";
import uuid from "uuid/dist/v1";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

function AddListing() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [uploaded, setUploaded] = useState([]); //state for image upload

  const { id } = useParams(); //using this component to add and edit listing

  const listing = useSelector((state) => state.listings); //pulling data from redux store
  const email = useSelector((state) => state.user.email);

  const [listingFormData, setListingFormData] = useState({
    //controlled form state
    title: "",
    rooms: 1,
    minDays: 1,
    maxDays: 1,
    location: "",
    area: "",
    aminities: "",
    price: null,
  });

  const [errMsg, setErrMsg] = useState({});
  //using useeffect to check whaeter editing or creating and if editing populating fields with value from store
  useEffect(() => {
    if (id) {
      let fi = listing.filter((item) => item.id === id);

      setListingFormData(fi[0]);
      setUploaded(fi[0].image);
    } else {
      return;
    }
  }, [id, listing]);

  const handleChange = (e) => {
    //using single handleChange for multiple input fields by obj de-structuring
    const { value, name } = e.target;
    setListingFormData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  //handle the image upload seperately to keep the above handleChange functon simple
  function handleUpload(e) {
    const files = e.target.files;

    for (let file of files) {
      setUploaded((prev) => [
        ...prev,
        { file: URL.createObjectURL(file), id: uuid() }, //using URL.createObject to convert image into a string
      ]);
    }
  }

  const removeSelectedImage = (e, id) => {
    //removing uploaded image from the preview by click event
    setUploaded((prev) => prev.filter((item) => item.id !== id));
  };

  const selectedImages = uploaded.map(
    (
      item // helper const to keep the jsx lean
    ) => (
      <img
        onClick={(e) => removeSelectedImage(e, item.id)}
        src={item.file}
        key={item.id}
        alt="lohi"
      />
    )
  );

  const validateForm = () => {
    // form validation
    let valid = true;
    if (
      listingFormData.title.trim().length < 2 ||
      listingFormData.title.trim().length >= 152
    ) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        title:
          "invalid title, the title should've maximum 150 letters and a miminimum of 2 letters",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        title: "",
      }));
    }
    if (listingFormData.rooms < 1 || listingFormData.rooms >= 5) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        rooms: "rooms should be between 1-5",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        rooms: "",
      }));
    }
    if (listingFormData.minDays < 1) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        minDays: "minimum day should be atleast 1",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        minDays: "",
      }));
    }
    if (listingFormData.location.trim().length < 1) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        location: "please enter the location of the room",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        location: "",
      }));
    }
    if (uploaded.length < 1) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        images: "please upload one or more pictures of the room",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        images: "",
      }));
    }
    if (listingFormData.price < 1) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        price: "please enter the rent",
      }));
    } else {
      setErrMsg((prev) => ({
        ...prev,
        price: "",
      }));
    }
    if (listingFormData.area < 200) {
      valid = false;
      setErrMsg((prev) => ({
        ...prev,
        area: "area should be atleast 200sqft",
      }));
    }

    return valid;
  };

  const handleSubmit = (e) => {
    //submitting the form data and checking validity before submiting
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    let item = {
      //object to pass into action creator
      ...listingFormData,
      image: uploaded,
      id: uploaded[0].id,
      email: email,
    };
    // id is from url params, used terenery operator to dispatch right action
    id
      ? dispatch(editListing({ ...item, id: id }))
      : dispatch(addListing({ ...item, bookings: [] }));
    history.push("/");
  };

  return (
    <div>
      <h1 className={styles["addlisting-title"]}>Add Listing</h1>
      <form onSubmit={handleSubmit} className={styles["addlisting-form"]}>
        <label className={styles["customField"]}>
          <input
            type="text"
            value={listingFormData.title}
            onChange={handleChange}
            name="title"
            required
            placeholder="Describe in 10 words or less"
          />
          <span className={styles["placeHolder"]}>Title</span>
        </label>
        <p className={styles.errmsg}>{errMsg.title}</p>
        <label className={styles["customField"]}>
          <input
            type="number"
            name="rooms"
            value={listingFormData.rooms}
            onChange={handleChange}
            required
            placeholder="Number of rooms available to rent"
          />
          <span className={styles["placeHolder"]}>Rooms</span>
        </label>
        <p className={styles.errmsg}>{errMsg.rooms}</p>

        <label className={styles["customField"]}>
          <input
            type="number"
            name="area"
            value={listingFormData.area}
            onChange={handleChange}
            required
            placeholder="total carpet area in sq ft"
          />
          <span className={styles["placeHolder"]}>Area in sqft</span>
        </label>
        <p className={styles.errmsg}>{errMsg.area}</p>

        <label className={styles["customField"]}>
          <input
            type="text"
            value={listingFormData.location}
            name="location"
            onChange={handleChange}
            required
            placeholder={"Location of the house"}
          />
          <span className={styles["placeHolder"]}>Location</span>
        </label>
        <p className={styles.errmsg}>{errMsg.location}</p>

        <div className={styles.minmax}>
          <label className={styles.customField}>
            <input
              type="number"
              name={"minDays"}
              value={listingFormData.minDays}
              onChange={handleChange}
              placeholder="Minimum days of Stay"
            />
            <span className={styles["placeHolder"]}>Min days</span>
          </label>

          <label className={styles.customField}>
            <input
              type="number"
              name={"maxDays"}
              value={listingFormData.maxDays}
              onChange={handleChange}
              placeholder="Maximum days of stay"
            />
            <span className={styles["placeHolder"]}>Max days</span>
          </label>
        </div>
        <p className={styles.errmsg}>{errMsg.minDays}</p>
        <label className={styles["customField"]}>
          <input
            type="textarea"
            name="aminities"
            value={listingFormData.aminities}
            onChange={handleChange}
            required
            placeholder={"Add aminities seperated by commas"}
          />
          <span className={styles["placeHolder"]}>Aminities</span>
        </label>
        <p className={styles.errmsg}>{errMsg.aminities}</p>

        <label className={styles["customField"]}>
          <input
            type="number"
            name="price"
            value={listingFormData.price}
            onChange={handleChange}
            required
            placeholder={"Price per day in Rupees"}
          />
          <span className={styles["placeHolder"]}>price</span>
        </label>
        <p className={styles.errmsg}>{errMsg.price}</p>

        <label className={styles.customField}>
          {" "}
          choose a picture:
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
          />
        </label>
        <p className={styles.errmsg}>{errMsg.images}</p>
        {uploaded.length >= 1 && (
          <div className={styles.uploadedimg}>
            <span className={styles.clicktoremove}>
              click on the image to remove
            </span>
            {selectedImages}
          </div>
        )}
        <input
          type="submit"
          value="Submit"
          className={`${styles.customField} ${styles.submitbtn}`}
        />
      </form>
    </div>
  );
}

export default AddListing;
