import { useState , useEffect } from "react";
// import arr from "./db";

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

import { Link } from "react-router-dom";


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setusers] = useState([]);
  const [modal, setmodal] = useState(false);
  const [isloading, setisloading] = useState(false);

  useEffect(() => {
    
    // fetch https://jsonplaceholder.typicode.com/users
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then(data => setusers(data))
      .finally(()=> setisloading(true))
  }, [])
  
  if (!isloading) return <h1>isloading...</h1>

  // console.log(users);
  
  
  const ICON = icon({
    iconUrl: "/mi.png.png",//داخل پوشه public
    iconSize: [42, 52]
  })

  const modalOn = (item) => {
    setmodal(true);
    setCurrentUser(item)
  }
  
  const userList = users.map((item, index) => {
    return (

      <div key={index} className="user">

        <img src={`https://robohash.org/${item.id}?set=set1&size200x200`} />

        <h3>
          {item.name}
        </h3>

        <h4>
          {item.email}
        </h4>
        
        <button id="btn" onClick={() => modalOn(item)}>More Information</button>

      </div>
    )
  })

  return (
    <>
      
        <div id="p-user">
          {userList}
          {modal ?
             <>
                <div className='backdrop' onClick={() => setmodal(false)} > </div>
                <div id="modal">{/* <h1>{currentUser.name}</h1> */}
                  <MapContainer center={[currentUser.address.geo.lat, currentUser.address.geo.lng]} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[currentUser.address.geo.lat, currentUser.address.geo.lng]} icon={ICON}>
                      <Popup>
                        {`city : ${currentUser.address.city}`} <br /> 
                        {`suite : ${currentUser.address.suite}`} <br />
                        {`street : ${currentUser.address.street}`}<br />
                        {`phone : ${currentUser.phone}`}
                      </Popup>
                    </Marker>
                  </MapContainer>
              
                  <div id="readmore">
                
                    <Link
                     style={{ color: "lightblue", textDecoration: "none" }}
                     to={`/about/${currentUser.id}`}
                    >
                    Read more

                    </Link>
                
                  </div>
              
                </div>
            
            
              </>
            : ''}
        </div>
    </>
  )

}

export default App;
