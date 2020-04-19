import React from 'react';
import './App.css';
import TopList from './components/Top'
import 'bootstrap/dist/css/bootstrap.min.css';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "8beaa14c429347dc96de7ca4c2434e11";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-library-read"
];

// Get the hash of the url
const hash = window.location.hash
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
  const token = hash.access_token

  return (
    <div className="App">
      <header className="App-header">
        {token ? <TopList token={token}/> : <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
        </a>}
      </header>
    </div>
  );
}

export default App;
