import React,{ useState, useEffect} from 'react';
import './App.css';
import TopList from './components/Top'
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderList from './components/Top/HearderList'

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "8beaa14c429347dc96de7ca4c2434e11";
const redirectUri = "https://everything-spotify.herokuapp.com/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-library-read"
];
const tabs = ["Top Tracks","Top Artists","Statistics"]

// Get the hash of the url
let hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

function App() {
  let expiry = Number(hash.expires_in)*1000
  const [token, setToken] = useState(hash.access_token)
  const [selected, setSelected] = useState(tabs[0])
  useEffect( () => {
    setTimeout(function(){ 
      hash = "";
      setToken(undefined)}, expiry);
  },[])


  return (
    <div className="App">
        <div className="header">
          <div className="header__logo">
            <h1>EVERYTHING SPOTIFY</h1>
          </div>
          <div className="header-list">
            {tabs.map((x,index) => {
              return <HeaderList key={index} name={x} selected={selected} setAge={setSelected}/>})}
          </div>
        </div> 
      <header className="App-header">
        {token && <TopList token={token} selected={selected}/>}
        {!token && <div className="login"><a
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
        </a></div>}
      </header>
      <footer className="footer">
        <a href="mailto:kang.sanjeet1401@gmail.com">For any inquiries.</a>
      </footer>
    </div>
  );
}

export default App;
