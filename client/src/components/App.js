import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SongInfo from './SongInfo';
import Searchbar from './Searchbar';
import { TrackAudioFeatures } from './track_audio';
import { CompareSongs} from './CompareSongs';
import { ArtistTopTracks } from './ArtistTopTracks';

const App = () => {
  const [songTitle, setSongTitle] = useState('');

  const submitSongName = (songname) => {
    setSongTitle(songname);
  };

  const searchbarMessage = 'Enter a song to find its key characteristics';

  return (
    
    <div className="background">

      <div className="app">
        <header>
          <div className="logo">
            <a href="/">
              <h1>| KEY-J |</h1>
            </a>
          </div>
        </header>
          <main>
          <BrowserRouter>
            <Switch>
            <Route
                component={() => <Searchbar submit={submitSongName} placeholder={searchbarMessage} redirect={true} />}
                path="/"
                exact
              />
              <Route
                component={() => <SongInfo songTitle={songTitle} redirect={true} />}
                path={"/tracks/:songTitle"}
                exact
              />
              <Route component={TrackAudioFeatures} path="/track/:id/:albumUrl" exact />
              <Route component={CompareSongs} path="/compare/:songAid/:songBid" exact />
              <Route component={ArtistTopTracks} path="/artist/:artistId/:artistName" exact />
            </Switch>
          </BrowserRouter>
          </main>
        </div>
      </div>
  );
};

export default App;
