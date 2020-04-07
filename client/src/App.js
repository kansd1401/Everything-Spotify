import React from 'react';
import * as $ from 'jquery';
import './App.css';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = "8beaa14c429347dc96de7ca4c2434e11";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
            Login to Spotify
        </a>
      </header>
    </div>
  );
}

export default App;
