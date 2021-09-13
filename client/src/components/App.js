import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useState } from 'react';
import SongInfo from './SongInfo';
import Searchbar from './Searchbar';
import { TrackAudioFeatures } from './track_audio';

const App = () => {
  const [songTitle, setSongTitle] = useState('');

  const submitSongName = (songname) => {
    setSongTitle(songname);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
        <Route
            component={() => <Searchbar submit={submitSongName} redirect={true} />}
            path="/"
            exact
          />
          <Route
            component={() => <SongInfo songTitle={songTitle} redirect={true} />}
            path={"/tracks/:songTitle"}
            exact
          />
          <Route component={TrackAudioFeatures} path="/:id" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
