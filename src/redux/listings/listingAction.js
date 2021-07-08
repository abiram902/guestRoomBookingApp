import {
  ADD_LISTING,
  EDIT_LISTING,
  LOGIN,
  REMOVE_LISTING,
  LOGOUT,
  BOOK_ROOM,
} from "./listingTypes";

export const addListing = (item) => {
  return {
    type: ADD_LISTING,
    payload: item,
  };
};

export const editListing = (item) => {
  return {
    type: EDIT_LISTING,
    payload: item,
  };
};

export const removeListing = (id) => {
  return {
    type: REMOVE_LISTING,
    payload: id,
  };
};

export const login = (item) => {
  return {
    type: LOGIN,
    payload: item,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    payload: { email: "", phoneNumber: "", userRooms: [], isHost: false },
  };
};

export const bookRoom = (room) => {
  return {
    type: BOOK_ROOM,
    payload: room,
  };
};
