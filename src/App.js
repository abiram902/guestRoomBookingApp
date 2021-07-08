import Cards from "./Components/Cards/Cards";
import "./App.css";
import Header from "./Components/Header/Header";
import { useSelector } from "react-redux";
import Login from "./Components/Login/Login";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddListing from "./Components/Host/AddListing";
import GotoAddListing from "./Components/Host/GotoAddListing";
import GuestRoom from "./Components/Guest/GuestRoom";
import Logout from "./Components/Logout/Logout";
import Footer from "./Components/Footer/Footer";
import YourRooms from "./Components/Guest/YourRooms";

function App() {
  const [isLoginVisible, setIsLoginVisible] = useState(false); // modal overlay visiblity handling
  const isLoggedIn = useSelector((state) => state.user.email);
  const isHost = useSelector((state) => state.user.isHost);

  const toggleLogin = () => {
    setIsLoginVisible((prevState) => !prevState);
  };

  const componentToRender =
    isLoggedIn.length > 5 ? (
      <Logout toggleLogin={toggleLogin} email={isLoggedIn} />
    ) : (
      <Login toggleLogin={toggleLogin} />
    );
  return (
    <Router>
      <div className="App">
        {isLoginVisible && componentToRender}
        <Header toggleLogin={toggleLogin} />

        <Switch>
          <Route path="/guestRoomBookingApp/addlisting">
            <AddListing />
          </Route>
          <Route path="/room/:id" component={GuestRoom} />
          <Route path="/editListing/:id" component={AddListing} />
          <Route path="/yourrooms/" component={YourRooms} />

          <Route path="/guestRoomBookingApp/">
            <div id="Appcontainer">
              <Cards />
              {isHost ? (
                <GotoAddListing /> /*plus button to add new listing*/
              ) : null}
            </div>
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
