import {
  ADD_LISTING,
  BOOK_ROOM,
  EDIT_LISTING,
  LOGIN,
  LOGOUT,
  REMOVE_LISTING,
} from "./listingTypes";

const initialListings = {
  //current user is a single user
  user: {
    email: "",
    phoneNumber: "",
    userRooms: [],
    isHost: false,
  },
  //all listings
  listings: [
    {
      id: "i1",
      title: "Lorem ipsum dolor, sit amet consectetur .",
      email: "abiram902@gmail.com",
      rooms: 2,
      area: 1000,
      bookings: [],
      location: "vadavalli",
      image: [
        {
          file: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beige-paint-colors-for-bedroom-1555093629.jpg?crop=1xw:1xh;center,top&resize=980:*",
          id: "ia3",
        },
      ],
      minDays: 1,
      maxDays: 2,
      price: 500,
      aminities: "water, power-backup",
    },
    {
      id: "i2",
      title: "fully furnished rooms in saravanampatti",
      email: "abiram@test.com",
      rooms: 2,
      bookings: [],
      image: [
        {
          file: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beige-paint-colors-for-bedroom-1555093629.jpg?crop=1xw:1xh;center,top&resize=980:*",
          id: "ia1",
        },
      ],
      minDays: 1,
      maxDays: 2,
      area: 800,
      price: 500,
      aminities: "water, power-backup",
      location: "PN pudur",
    },
    {
      id: "i3",
      title: "Luxury villa in Rs puram",
      email: "abiram@test.com",
      rooms: 1,
      bookings: [],
      image: [
        {
          file: "https://www.thespruce.com/thmb/3FiCcsHDWeyLIH_gl9rZEss3Uu0=/1000x562/smart/filters:no_upscale()/monochromeboyroom-e786aa7542784ced8264d3dfa74af947.jpeg",
          id: "ia2",
        },
        {
          file: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edc-web-tour-natasha-bardaran-9-1607305891.jpg?crop=1.00xw:0.713xh;0,0.238xh&resize=640:*",
          id: "12b",
        },
        {
          file: "https://media-cdn.tripadvisor.com/media/photo-s/13/d8/ea/1b/a-room-at-the-beach.jpg",
          id: "12b1",
        },
      ],
      minDays: 1,
      maxDays: 2,
      area: 750,
      price: 2500,
      aminities: "water, power-backup",
      location: "saravanampatti",
    },
  ],
};

const listingReducer = (state = initialListings, action) => {
  switch (action.type) {
    case ADD_LISTING:
      return {
        user: {
          ...state.user,
          userRooms: [...state.user.userRooms, action.payload], //to render room in 'yourRooms' page
        },
        listings: state.listings.concat(action.payload), //to add the room to the listing in home
      };
    case EDIT_LISTING:
      return {
        ...state,
        listings: state.listings.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload; // replacing the edited item
          } else {
            return item;
          }
        }),
      };
    case REMOVE_LISTING:
      return {
        ...state,
        listings: state.listings.filter((item) => item.id !== action.payload),
        user: {
          ...state.user,
          userRooms: state.user.userRooms.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    case LOGIN:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      };
    case BOOK_ROOM: //booking room
      let bookedRoomId = action.payload.id;
      let editedListingArray = []; // to push the modified state
      for (let obj of state.listings) {
        if (obj.id === bookedRoomId) {
          let editedObj = {
            ...obj,

            bookings: [...obj.bookings, ...action.payload.bookings],
          };
          editedListingArray.push(editedObj);
        } else {
          editedListingArray.push(obj);
        }
      }

      return {
        ...state,
        user: {
          ...state.user,
          userRooms: [...state.user.userRooms, action.payload],
        },
        listings: [...editedListingArray],
      };
    default:
      return state;
  }
};

export default listingReducer;
