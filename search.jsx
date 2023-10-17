import {useState,useEffect} from 'react'
import './search.css'
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './navBar'
const Search = ()=>{
const [username,setUsername] = useState('');
const [searchInput, setSearchInput] = useState('');

useEffect(()=>{
axios.get(`http://localhost:3001/search`, { params: { username: searchInput }},{withCredentials:true}).then(response=>{
	if(response.data){
		setUsername(response.data);

	}
	else {
		console.log('name not found')
	}
}).catch(error=>{
	console.log(error);
})

console.log('the result is ',username);
},[searchInput]);

return(<>
  <NavBar />
  <div id='LJWholeThing3'>
  <h1 id='searchLJH1'>
    Search for a user
  </h1>
  <div id="all">
    <div id="searchBar">
      <i id="glasses" className="bi bi-search" style={{ height: '100px' }}></i>
      <input
        type="text"
        id="searchInput"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button>Search</button>
    </div>
    {(() => {
      if (username==='User not found') {
        return (
          <div id = 'LJunf'>
            <h2>User Not Found.</h2>
          </div>
        );
      }
      else {
        return(

          <div id='ljSearchResult'>
              
            <a class="nav-link" > {username.username} </a>



          </div>


        	)

      }
      // Add more conditions or return JSX for other cases if needed
    })()}
  </div>
  </div>
</>
	)
}
export default Search;