import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import ListItem from './ListItem'
import Chart from './Chart'
import {Form, Spinner} from 'react-bootstrap'
import {getDataSet} from "../../helpers/dataConversion"
import {tabs} from "../../helpers/tabsData"

export default function SavedTab(props) {
  const [selected, setSelected] = useState(tabs[0].name)
  const [playlist, setPlaylist] = useState("")
  const [data, setData] = useState("")
  const [playlists, setPlaylists] = useState("")
  const [loading, setLoading] = useState(true)

  const getData = (playlistSelected) => {
    setLoading(true)
    let savedTracks = [];
    //Call to get the first 50 tracks
    $.ajax({
      url: playlistSelected.tracks.href,
      type: "GET",
      data: { 
        limit: 50
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (res) => {
        //sync calling with the next page api link provided by the intial call untill it's null which means no more tracks left.
        savedTracks = [...res.items]
        while (res.next){
          $.ajax({
            url: res.next,
            type: "GET",
            async: false,
            data: { 
              limit: 50
            },
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + props.token);
            },
            success: (response) => {
              savedTracks = [...savedTracks,...response.items]
              res.next = response.next
            }
          });
        }
        for(let i = 0; i < savedTracks.length+100; i=i+100){
          //Filters tracks to 100 then returns an array of their ids
          let ids = savedTracks.filter((track,index) => {
            if(i-1 < index && index < (i+100)){
              return track 
            }
          }).map((x) => x.track.id)
          $.ajax({
            url: "https://api.spotify.com/v1/audio-features",
            type: "GET",
            async: false,
            data: { 
              ids: ids.join()
            },
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + props.token);
            },
            success: (response) => {
              response.audio_features.forEach((feature) => {
                if (feature){
                  const index = savedTracks.findIndex((x) => x.track.id === feature.id)
                  savedTracks[index].track = {...savedTracks[index].track, ...feature}
                }
              })
            }
          });
        }
        const dataSet = getDataSet(savedTracks)
        setData(dataSet)
        playlistSelected["data"] = dataSet
        const updatedPlayLists = [...playlists]
        updatedPlayLists[playlists.findIndex( list => list.name === playlistSelected.name)] = playlistSelected
        setPlaylists(updatedPlayLists)
        setLoading(false)
      }
    });
  }

  const getPlaylists = () => {
    $.ajax({
      url: `https://api.spotify.com/v1/me/playlists`,
      type: "GET",
      data: { 
        limit: 50
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (res) => {
        setPlaylists([{name: "Liked Songs", tracks: {href: "https://api.spotify.com/v1/me/tracks"}},...res.items])
        setPlaylist("Liked Songs")
      }
    })
  }
  const handleChange = (event) => {
    setPlaylist(event.target.value);
  };
  
  useEffect(() => {
    if (playlists){
      const playlistSelected = playlists[playlists.findIndex( list => list.name === playlist)]
      if(!playlistSelected.data){
        getData(playlistSelected)
      }else{
        setData(playlists.find( list => list.name === playlist).data)
      }
    }
  }, [playlist])

  useEffect(() => {
    getPlaylists()
  }, [])
  

  return (
      <section className="top--tab">
        {playlists !== "" ? <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Select a Playlist</Form.Label>
            <Form.Control as="select" onChange={handleChange}>
        {playlists.map(list => <option key={list.name}>{list.name}</option>)}
            </Form.Control>
          </Form.Group>: ""}
        { !loading ?
        <div>
          <div className="age-list">
            {tabs.map((x,index) => {
              return <ListItem key={index} name={x.name} selected={selected} setAge={setSelected}/>})}
          </div>
            {(selected === "Date Added" || selected === "Mean") && <p>Yooooooooo</p>}
          <div>
            {data !== "" && selected === "Date Added"? <Chart data={data.weekday} chartType="bar"/>:""}
            {data !== "" && selected === "Valence"? <Chart data={data.valence} chartType="doughnut"/>:""}
            {data !== "" && selected === "Danceability"? <Chart data={data.danceability} chartType="doughnut"/>:""}
            {data !== "" && selected === "Energy"?
            <Chart data={data.energy} chartType="doughnut"/>:""}
            {data !== "" && selected === "Mean"?
            <Chart data={data.mean} chartType="bar"/>:""}
            {data !== "" && selected === "Standard Deviation"?
            <Chart data={data.std} chartType="bar"/>:""}      
          </div>
        </div>
        : <div className="loading-tab"><Spinner animation="border"  variant="light"/> Retrieving data from Spotify...</div>}

      </section>
  );
}