import React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from "react-router-dom"

const SongInfo = (props) => {
  const [initialState, setInitialState] = useState([]);
  const [error, setError] = useState(null);
  const params = useParams()

  const songName = () => {
    if(props.redirect){
      return params.songTitle
    } else
    return props.songTitle
  }

  useEffect(() => {
    fetch('/api/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        songName: songName(),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error('Could not fetch data.');
        }
        return res.json();
      })
      .then((jsonResponse) => setInitialState(jsonResponse.songs))
      .catch((err) => {
        setError(err.message);
      });
  }, [props.songTitle]);


  if(props.redirect) {
  return (
    <div>
      <div className='breaker'></div>
      {error && <div>{error}</div>}
      {initialState.length > 0 &&
        initialState.map((e) => (
          <div className='song-container' key={uuidv4()}>
          <div className='song-image'>
            <img src={e.albumUrl} style={{ height: 240 }}/>
          </div>
          <div className='song-section'>
            <a href={'/track/' + e.id + '/' + e.albumUrl.split('/')[4] + '/' + e.name} key={uuidv4()}>
              <div className='song-div'>
                Song: <h2>{e.name}</h2>
              </div>
            </a>
            <a href={['/album', e.album, e.albumId, e.albumUrl.split('/')[4]].join('/')} key={uuidv4()}>
              <div className='song-div'>
                Album: <h2>{e.album}</h2>
              </div>
            </a>
            <a href={'/artist/' + e.artistId + '/' + e.artist} key={uuidv4()}>
              <div className='song-div'>
                Artist: <h2>{e.artist}</h2>
              </div>
            </a>
          </div>
          </div>
        ))}
    </div>
  );
  }
  else {
    return (
    <div>     
    {error && <div>{error}</div>}
    {initialState.length > 0 &&
      initialState.map((e) => (
        <div className='song-container' key={uuidv4()}>
        <div className='song-image'>
          <img src={e.albumUrl} style={{ height: 240 }}/>
        </div>
        <div className='song-section'>
          <a href={['/compare', props.songAId, params.albumUrl, params.trackName, e.id, e.albumUrl.split('/')[4], e.name].join('/')} key={uuidv4()}>
          <div className='song-div'>
            Song: <h2>{e.name}</h2>
          </div>
          </a>
          <a href={['/album', e.album, e.albumId, e.albumUrl.split('/')[4]].join('/')} key={uuidv4()}>
          <div className='song-div'>
            Album: <h2>{e.album}</h2>
          </div>
          </a>
          <a href={'/artist/' + e.artistId + '/' + e.artist} key={uuidv4()}>
            <div className='song-div'>
              Artist: <h2>{e.artist}</h2>
            </div>
          </a>
        </div>
        </div>
      ))}
    </div>
    )
  }
};

SongInfo.propTypes = {
  props: PropTypes.func,
  songTitle: PropTypes.string,
  redirect: PropTypes.bool,
  songAId: PropTypes.string,
};

export default SongInfo;
