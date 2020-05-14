const getDataForWeekday = (tracks) => {
  const dataWeekday = [{day: "Sunday", count: 0, percentage:0},{day: "Monday", count: 0, percentage:0},{day: "Tuesday", count: 0, percentage:0},{day: "Wednesday", count: 0, percentage:0},{day: "Thursday", count: 0, percentage:0},{day: "Friday", count: 0, percentage:0},{day: "Saturday", count: 0, percentage:0}]
  tracks.forEach((track) => {
    let d = new Date(track.added_at)
    dataWeekday[d.getDay()].count++
  })
  dataWeekday.forEach((day) => {
    day.percentage = day.count
  })
  return dataWeekday
}

const getDataForValence = (tracks) => {
  const data = [{day: "Sad music: Values < 0.36", count: 0, percentage:0, highest: tracks.sort( (a,b) => b.track.valence -a.track.valence)[0].track, lowest: tracks.sort( (a,b) => a.track.valence - b.track.valence)[0].track},{day: "Average music", count: 0, percentage:0},{day: "Happy music: Values > 0.63", count: 0, percentage:0}]
  tracks.forEach((x) => {
    if(x.track.valence < 0.36){
      data[0].count++
    }else if(x.track.valence > 0.63){
      data[2].count++
    }else{
      data[1].count++
    }
  })
  data.forEach((day) => {
    day.percentage = day.count
  })
  return data
}

const getDataForEnergy = (tracks) => {
  const data = [{day: "Chill music: Values < 0.5", count: 0, percentage:0, highest: tracks.sort( (a,b) => b.track.energy -a.track.energy)[0].track, lowest: tracks.sort( (a,b) => a.track.energy - b.track.energy)[0].track},{day: "Average music", count: 0, percentage:0},{day: "Hype music: Values > 0.75", count: 0, percentage:0}]
  tracks.forEach((x) => {
    if(x.track.energy < 0.5){
      data[0].count++
    }else if(x.track.energy > 0.75){
      data[2].count++
    }else{
      data[1].count++
    }
  })
  data.forEach((day) => {
    day.percentage = day.count
  })
  return data
}

const getDataForDanceability = (tracks) => {
  const data = [{day: "Least Danceable songs", count: 0, percentage:0, highest: tracks.sort( (a,b) => b.track.danceability -a.track.danceability)[0].track, lowest: tracks.sort( (a,b) => a.track.danceability - b.track.danceability)[0].track},{day: "Average songs", count: 0, percentage:0},{day: "Most Danceable songs", count: 0, percentage:0}]
  tracks.forEach((x) => {
    if(x.track.danceability < 0.55){
      data[0].count++
    }else if(x.track.danceability > 0.7){
      data[2].count++
    }else{
      data[1].count++
    }
  })
    data.forEach((day) => {
      day.percentage = day.count
    })
  return data
}

const getMeanData = (tracks) => {
  const total = tracks.length
  const organiser = (type) => val => val.track[type]
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const getDataForValue = x => Number((tracks.map(organiser(x)).reduce(reducer)/total).toFixed(2))
  return [{day: 'Valence', percentage: getDataForValue("valence")},{day: 'Danceability', percentage: getDataForValue("danceability")},{day: 'Energy', percentage: getDataForValue("energy")},{day: 'Instrumentalness', percentage: getDataForValue("instrumentalness")},{day: 'Acousticness', percentage: getDataForValue("acousticness")},{day: 'Liveness', percentage: getDataForValue("liveness")},{day: 'Speechiness', percentage: getDataForValue("speechiness")}]
}

const getStdDeviation = (tracks, means) => {
  means.forEach((val) => { 
    const mean = val.percentage
    val.percentage = Number((Math.sqrt(tracks.map((x) => {
      const result = (Number(x.track[val.day.toLowerCase()] - mean).toFixed(2)*100)
      return Math.pow(result,2)
    }).reduce((acc, cur) => acc+cur)/tracks.length)/100).toFixed(2))
  })
  return means
}

const getDataSet = (savedTracks) => {
  return {savedTracks: savedTracks,weekday: getDataForWeekday(savedTracks), valence: getDataForValence(savedTracks), danceability: getDataForDanceability(savedTracks), energy: getDataForEnergy(savedTracks), mean: getMeanData(savedTracks).sort((a,b)=> b.percentage - a.percentage), std: getStdDeviation(savedTracks, getMeanData(savedTracks)).sort((a,b)=> b.percentage - a.percentage)}
}

export {getDataSet}