import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import './About.css';

const About = () => {
  
  const { id } = useParams();

  const [thisUser, setthisUser] = useState(null);

  const [isloading, setisloading] = useState(false);

  useEffect(() => {

    fetch(`https://jsonplaceholder.typicode.com/users/${id}` )
      .then((res) => res.json())
      .then((data) => setthisUser(data))
      .finally(()=> setisloading(true))
  }, [])
  
  if (!isloading) return <h1>isloading...</h1>
  
  // console.log(thisUser)
  


  return (
    <>
      
      <div className="user-information">

        
          <>
            <div id="user-card">

              <img src={`https://robohash.org/${thisUser.id}?set=set1&size200x200`} />

              <h3>
                {thisUser.name}
              </h3>

              <h3>
               {`website : ${thisUser.website}`}
              </h3>

              <h3>
               {`company : ${thisUser.company.name}`}
              </h3>

              <h3>
               {`phone : ${thisUser.phone}`}
              </h3>

            </div>
 
          </>
         
        

          <div id="link">
            <Link style={{textDecoration : 'none' , color : 'lightblue'}} to="/">Back to Home</Link>
          </div>

      </div>
      
    </>
    
  )
}
export default About;