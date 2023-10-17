import './messages.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navBar';
const Messages= ()=>{
	const location = useLocation();
	const Receiver = location.state.nameData;
	const [user,setUser] = useState('');
  const [socket, setSocket] = useState();
  const [messageBox, setMessageBox] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);
const ColorDetermine= (sender) =>{
  if(sender == user){
    return 'blue';
  }
  else{
    return 'green';
  }
}

  //  const socketConnection = io.connect('http://localhost:3001');


  
useEffect(()=>{
axios.post("http://localhost:3001/currentSession", { withCredentials: true }).then((response)=>{
if(response.data.username){
  console.log(`the current user is ${response.data.username}`)
  setUser(response.data.username);
}
else {
  console.log(response.data)
console.log("something else is wrong")
}

}).catch(error=>{
  console.log(error)
})

},[user]);
//useEffect(() => {
//  const fetchConversation = async () => {
//    try {
 //     const response = await axios.get(`http://localhost:3001/conversation/${user}/${Receiver}`);
  //    if (response.data) {
   //     setConversation(response.data);
    //  }
   // } catch (error) {
   //   console.error('Error fetching conversation:', error);
   // }
  //};
  //const intervalId = setInterval(fetchConversation, 2000); 
  //fetchConversation();
  //return () => {
   // clearInterval(intervalId); 
  //};
//}, [user, Receiver]);

// ...

useEffect(() => {
  const fetchConversation = async () => {
    try {
      const responseSender = await axios.get(`http://localhost:3001/conversation/${user}/${Receiver}`);
      const responseReceiver = await axios.get(`http://localhost:3001/conversation/${Receiver}/${user}`);
      setConversation(prevConversation => {
        const updatedConversation = [...prevConversation];
        responseSender.data.forEach(message => {
          if (!updatedConversation.find(m => m._id === message._id)) {
            updatedConversation.push(message);
          }
        });
        responseReceiver.data.forEach(message => {
          if (!updatedConversation.find(m => m._id === message._id)) {
            updatedConversation.push(message);
          }
        });
        updatedConversation.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        return updatedConversation;
      });
    } catch (error) {
      console.error('Error fetching conversation:', error);
    }
  };
  const intervalId = setInterval(fetchConversation, 2000);
  fetchConversation();

  return () => {
    clearInterval(intervalId);
  };
}, [user, Receiver]);

// ...



const handleInput = ()=>{
//event.preventDefault();
axios.post(`http://localhost:3001/send_messages`,{
text:messageBox,
sender:user,
receiver: Receiver,
},{withCredentials:true}).then(response=>{
console.log(`${user} sent ${Receiver} a message`);
}).catch(error=>{
  console.log('there was an issue');
})

}
  return (<>
      <NavBar/>
    <div id = 'wholeThingLJ2'>
    <div id = 'mainText'>
      <h1 id='LJH1'>
        Messages with {Receiver}
      </h1>
      <ul>
        {conversation.map((message, index) => (
          <h3 id='LJH3' key={index}style = {{color: ColorDetermine(message.sender)}}>{`${message.sender}: ${message.text}`}</h3>
        ))}
      </ul>
      
        <input
          id = "ljInput"
          type="text"
          value={messageBox}
          onChange={(e) => setMessageBox(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit"  onClick={()=>handleInput()}>Send</button>  
    </div>
    </div>
    </>
  );
}
export default Messages;