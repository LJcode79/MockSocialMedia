import {useState,useEffect} from 'react'
import './profile_view.css'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navBar'
const Profile_view = ()=>{
   
 const [follow_status,setFollow_status] = useState('');
 const [posts,setPosts] = useState([]);
 const [user,setUser] = useState('');
 const [username,setUsername] = useState('');
 const [username_,setUsername_] = useState('');
 const [totalPost, setTotalPost] = useState();
 const [profile_pic, setProfile_pic] = useState('');
 const [background,setBackground] = useState('');
const alt_background = 'https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';
const alt_profile = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
const default_bio = "This user has not set a biography";
//________
// const [profile_pic, setProfile_pic] = useState('');
const location = useLocation();
const profile = location.state.postingData;
const [picture,setPicture] = useState(alt_profile);
const [background_picture,setBackground_picture] = useState(alt_background);
const [bio,setBio] = useState(default_bio);
const [biography,setBiography] = useState(default_bio);
const [readOnly_,setReadOnly_] = useState(true);
const [followers,setFollowers] = useState([]);
const [followings,setFollowings] = useState([]);
//const profile ='a'
//_________________________display profile 
const userAvatar = (picture)=>{
  var beingReturn;
if(picture=='undefined'){
     beingReturn = 'https://i.pinimg.com/736x/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg';
}
else {
  beingReturn =  `http://localhost:3001${picture}`;
}
//console.log(beingReturn);
return beingReturn;
}


//_________________________display profile

//________________________________________________________________ follow functions
const navigate = useNavigate();
const handleFollowing=()=>{
 //axios.post('http://localhost:3001/addFollowers',{
 // usernameId:username._id,
 // follower: user,
 //},{withCredentials:true}).then(response=>{
 // console.log(`${user} started following ${username.username}`)
 //}).catch(error=>{
  //console.log(error);
 //})

 //axios.post('http://localhost:3001/addFollowings',{
  //usernameId:user,
  //following: username.username,
 //},{withCredentials:true}).then(response=>{
 // console.log(`${username.username} is being follow by ${user}`);
 //}).catch(error=>{
  //console.log(error);
 //})


 axios.post('http://localhost:3001/addFriends',{
  username:username.username,
  follower: user,
 },{withCredentials:true}).then(response=>{
  console.log(`${user} started following ${username.username}`)
 }).catch(error=>{
  console.log(error);
 })

 axios.post('http://localhost:3001/addFollowing',{
  username:user,
  following: username.username,
 },{withCredentials:true}).then(response=>{
  console.log(`${username.username} is being follow by ${user}`);
 }).catch(error=>{
  console.log(error);
 })
}





//______________________________________________________________

const handleProfile_pic_change= (e)=>{
  const file = e.target.files[0];
  setProfile_pic(file)
}
const handleBackground_change = (e)=>{
  const file = e.target.files[0];
  setBackground(file);
}
const handleBio_change= (e)=>{
  const file = e.target.value
    console.log("New Bio Value:", file);
  setBio(e.target.value);
}
const uploadBio = ()=>{
  const formData = new FormData();
  formData.append('bio',bio);
  axios.post(`http://localhost:3001/addBio/${username.username}`,formData,{withCredentials:true}).then(response=>{
    console.log('Bio value received in the response:', response.data.bio); 
    setBio(response.data.bio);
    console.log('bio data successfully sent');
  }).catch(error=>{
    console.log(error);
  })
  setReadOnly_(true);
}

const uploadProfilePic=()=>{
  const formData = new FormData();
  formData.append('pictureUrl',profile_pic);
axios.post(`http://localhost:3001/addProfilePicture/${username.username}`,formData,{withCredentials:true}).then(response=>{
  setPicture(`http://localhost:3001${response.data.pictureUrl}`)
  console.log('sent successfully');
}).catch(error=>{
  console.log(error);
})}
const uploadBackgroundPic = ()=>{
const formData = new FormData();
formData.append('background',background);
axios.post(`http://localhost:3001/addBackgroundPicture/${username.username}`,formData,{withCredentials:true}).then(response=>{
setBackground_picture(`http://localhost:3001${response.data.background}`)
console.log('sent background successfully');

}).catch(error=>{
  console.log(error);
})

}


//_______

//_____________________________________
useEffect(()=>{

axios.get(`http://localhost:3001/viewProfile/${profile.username}`,{withCredentials:true}).then(response=>{
  if(response.data){
    setUsername(response.data);
  }
  else {
    console.log('something else was wrong');
  }

 if (response.data.pictureUrl) {
          setPicture(`http://localhost:3001${response.data.pictureUrl}`);
        } else {
          setPicture(alt_profile);
        }

 if(response.data.background){
  setBackground_picture(`http://localhost:3001${response.data.background}`);
 }else {
  setBackground_picture(alt_background);
 }

if(response.data.bio){
  setBio(response.data.bio);
}else {
  setBio(default_bio)
}


}).catch(error=>{
  console.log(error);
})

},[username])

useEffect(()=>{
axios.get(`http://localhost:3001/getUserPosts/${username.username}`,{withCredentials:true}).then(response=>{
  if(response.data){
    setPosts(response.data);
   // console.log(response.data.length)
  }

}).catch(error=>{
  console.log(error);
})
},[posts])
useEffect(()=>{
  axios.get(`http://localhost:3001/getFollowers/${username.username}`,{withCredentials:true}).then(response=>{
    if(response.data){
      setFollowers(response.data);
      console.log('the data is ',response.data)
    }
    else{
      console.log('something went wrong');
    }
  }).catch(error=>{
    console.log(error);
  })
axios.get(`http://localhost:3001/getFollowing/${username.username}`,{withCredentials:true}).then(response=>{
if(response.data){
  setFollowings(response.data);
  console.log('the data is ',response.data);
}
else {
  console.log('something was wrong');
}

})





},[username.username])
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

},[user])

const messaging = (name)=>{
navigate('/dm',{state:{nameData:name}});
}

 

//_____________________________________
return(<>;
   <div id = 'all' class = 'header-container'> 

   <div id='back-pic'>
     <img id = 'background_pic' src ={background_picture}/>
           
    </div>

    <div id = 'profile' class = 'container-fluid'>
  <img className = 'profile-picture'src = {picture}/>
  <br/>
  <div id= 'name'>
      
  <h2 style = {{fontWeight:'bold'}}>Username: {profile.username}</h2>
  <h2 style = {{fontWeight:'bold'}}>Name: {username.name} </h2>  
  <h2 style = {{fontWeight:'bold'}}>Age: {username.age}</h2>

   </div>


<div style = {{position:'relative', left:'950px',bottom:'290px'}}> <h3>Followers: {followers.length} Following: {followings.length} Total Post: </h3> </div>
<div  style = {{position:'relative', left:'950px',bottom:'270px'}}> <button class = 'btn-lg btn-success' onClick = {()=>messaging(username.username)}>Message</button>  <button class = 'btn-lg btn-primary' onClick= {()=>handleFollowing()}>Follow</button> </div>
</div>


<div id ='bioSection'class ='container-fluid'>
<h1>Bio</h1>
<div id = 'bio'>
<p> {bio}</p>
 {//<textarea  style = {{width:'100%',height:'280px'}} onChange={
   //(e)=>{setBio(e.target.value)}}  value = {bio}></textarea>
 }

</div>

</div>
<div id = 'postSection'>
<h1>Posts</h1>
{(() => {
    if (posts.length === 0) {
        return (
            <div>
                <h2>
                    No Posts Yet, Upload your first post to be join the conversation today.
                </h2>
            </div>
        );
    }
else {
 return posts.map((posting,index)=>(
 <div id = 'posts_photos' key = {index}>
    { // <img src={`http://localhost:3001${posting.picture}`} style = {{height:'500px',width:'600px'}}/>
  }
    <div  class = 'container'>
   <div class = 'row'>
    <div class = 'col-lg-6'>
   <div  class="card" style={{width: "1000px"}}>
 { //<img class="card-img-top" src="https://assets2.cbsnewsstatic.com/hub/i/r/2023/03/15/749d5e5c-e9bd-43bd-a4c0-682b6e7b2ce3/thumbnail/640x360/dfde84421bdc52d56b818dddb1b06d4b/image009.png?v=ab9bbd2a20facf22a21dc5066c583597" style = {{height:'500px',width:'70%'}}alt="Card image cap"/>
  }
  <img class="card-img-top" src={`http://localhost:3001${posting.picture}`} style = {{height:'500px',width:'auto'}}alt="Card image cap"/>

  <div class="card-body" >

    <h5 class="card-title"> 
<img src = {userAvatar(posting.profile_pic)} style = {{height:'40px',width:'40px'}}/>
     {"  "}  <a class="nav-link"  >{posting.username}</a> </h5> 
    <p class="card-text">{posting.content}</p>
  </div>
  <div >
  <ul id = 'info'class="list-group list-group-flush ">
    <li id = 'list' class="list-group-item">Posted on: {posting.timestamp}</li>
    <li id = 'list' class="list-group-item">Location: {posting.location}</li>
    <li  id = 'list' class="list-group-item">
       <i class= {posting.feelingIcon}  style = {{color:`${posting.iconColor}`}}/>{posting.feeling}</li>
  </ul>
  </div>
  <div class="card-body">
    <a href="#" class="card-link"> <i class= 'bi bi-hand-thumbs-up' />{posting.likesCount.length} likes</a>
    <a href="#" class="card-link">  {posting.comments.length} comments</a>
  </div>

</div>



    </div>
</div>
 </div>








<br/>
<br/>
<br/>
<br/>
<br/>
 </div>




  ))




}








})()}










</div>




   </div>


  </>)

}
export default Profile_view;