import './followers.css'
import {useState,useEffect} from 'react';
import axios from 'axios';
import NavBar from './navBar';
const Followers = ()=>{
const [friends,setFriends] = useState([])
const [username,setUsername] = useState('');
useEffect(()=>{
axios.post("http://localhost:3001/currentSession", { withCredentials: true }).then((response)=>{
if(response.data.username){
  console.log(`the current user is ${response.data.username}`)
  setUsername(response.data.username);
}
else {
  console.log(response.data)
console.log("something else is wrong")
}

}).catch(error=>{
  console.log(error)
})

},[]);

useEffect(()=>{
axios.get(`http://localhost:3001/getFollowers/${username}`,{withCredentials:true}).then(response=>{
  if(response.data){
    setFriends(response.data);
   // console.log(response.data.length)
  }

}).catch(error=>{
  console.log(error);
})
},[username])


return(<>
  <div id = 'wholeThingLJ'>
	  <NavBar/>
	<h1 id= 'ljH1'>  Followers </h1>
	   <h2 id='ljH2'>Total Followers: {friends.length}</h2>
	{
friends.map((friend,index)=>(
<div class = 'ljborder'key = {index}>
<ul className="ljlistGroup">
 <li className = 'ljList'>
   {friend.follower}
   <button class = 'ljButton'> Unfollow</button>
</li>
</ul>
</div>




	))



	}
</div>
</>
	);
}
export default Followers;