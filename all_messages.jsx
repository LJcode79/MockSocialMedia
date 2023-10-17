import {useEffect, useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navBar';
import './all_messages.css';
import { Link } from 'react-router-dom';
const All_Messages = () => {
  const [recentConversation, setRecentConversation] = useState([]);
  const [user, setUser] = useState('');

  const getAvatar = (name) => {
    let beingReturn;
    const picture = getPictures(name);
    if (picture === 'undefined' || picture === '' || picture === 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg') {
      beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
      return beingReturn;
    } else {
      beingReturn = picture;
      beingReturn = `http://localhost:3001/${beingReturn}`;
      return beingReturn;
    }
  };

  const profile = async (name) => {
    try {
      const profilePicUrl = await getPictures(name);
      return profilePicUrl;
    } catch (error) {
      console.log(error);
      return 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
    }
  };

  const getPictures = async (name) => {
    try {
      const profilePicResponse = await axios.get(`http://localhost:3001/getProfilePic/${name}`, { withCredentials: true });

      if (profilePicResponse.data.pictureUrl) {
        return `http://localhost:3001/${profilePicResponse.data.pictureUrl}`;
      } else {
        return 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
      }
    } catch (error) {
      console.error('Error in getPictures:', error);
      return 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
    }
  };

  useEffect(() => {
    axios.post("http://localhost:3001/currentSession", { withCredentials: true })
      .then((response) => {
        if (response.data.username) {
          console.log(`the current user is ${response.data.username}`);
          setUser(response.data.username);
        } else {
          console.log(response.data);
          console.log("something else is wrong");
        }
      })
      .catch(error => {
        console.log(error);
      });

  }, [user]);

  useEffect(() => {
    axios.get(`http://localhost:3001/recentConversation?username=${user}`, { withCredentials: true })
      .then(response => {
        console.log('Full response from the server:', response);
        if (response.data) {
          setRecentConversation(response.data);
          console.log("The data is ", recentConversation);
          console.log('Mapped data:', response.data);
        } else {
          console.log('something is wrong with the response');
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, [user]);

  return (
    <>
      <NavBar/>
<div id = 'whole'>
 <div className="sidebaropen">
    {(()=>{
       if(recentConversation.length===0){
        return(
        <div>
          <h2>No Conversation Found</h2>
        </div>

          )
       }

       else {
         return recentConversation.map((convo, index) => {
  // Create an asynchronous function to use await inside map

    
    return (
      <ul className='list-group' id={index} key={index}>
        <div id='recent'>
          <li className='bar'>
           
            {convo.username} at: {convo.timestamp} <i className="bi bi-chat-square-dots"></i>
            <p>Text: {convo.text}</p>
          </li>
        </div>
      </ul>
    );


  // Return the Promise returned by renderProfile

});




          }


          })()}
    
    </div>
    
</div>
  </>
  );
};

export default All_Messages;