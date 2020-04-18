const getDataForWeekday = (tracks) => {
  const dataWeekday = [{day: "Sunday", count: 0, percentage:0},{day: "Monday", count: 0, percentage:0},{day: "Tuesday", count: 0, percentage:0},{day: "Wednesday", count: 0, percentage:0},{day: "Thursday", count: 0, percentage:0},{day: "Friday", count: 0, percentage:0},{day: "Saturday", count: 0, percentage:0}]
  tracks.forEach((track) => {
    let d = new Date(track.added_at)
    dataWeekday[d.getDay()].count++
  })
  dataWeekday.forEach((day) => {
    day.percentage = (day.count/tracks.length)*100
  })
  return dataWeekday
}

const getDataForValence = (tracks) => {
  const data = [{day: "Sad", count: 0, percentage:0},{day: "OK", count: 0, percentage:0},{day: "Happy", count: 0, percentage:0}]
  tracks.forEach((x) => {
    if(x.track.valence < 0.33){
      data[0].count++
    }else if(x.track.valence > 0.66){
      data[2].count++
    }else{
      data[1].count++
    }
  })
  data.forEach((day) => {
    day.percentage = (day.count/tracks.length)*100
  })
  return data
}

const getDataForEnergy = (tracks) => {
  const data = [{day: "Low", count: 0, percentage:0},{day: "OK", count: 0, percentage:0},{day: "High", count: 0, percentage:0}]
  tracks.forEach((x) => {
    if(x.track.energy < 0.33){
      data[0].count++
    }else if(x.track.energy > 0.66){
      data[2].count++
    }else{
      data[1].count++
    }
  })
  data.forEach((day) => {
    day.percentage = (day.count/tracks.length)*100
  })
  return data
}

const getDataForDanceability = (tracks) => {
  const data = [{day: "Chill Music", count: 0, percentage:0},{day: "Do what you want", count: 0, percentage:0},{day: "Party Song", count: 0, percentage:0}]
  tracks.forEach((x) => {
    if(x.track.danceability < 0.60){
      data[0].count++
    }else if(x.track.danceability > 0.80){
      data[2].count++
    }else{
      data[1].count++
    }
  })
  data.forEach((day) => {
    day.percentage = (day.count/tracks.length)*100
  })
  return data
}

const getMeanData = (tracks) => {
  const organiser = (type) => val => val.track[type]
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  return {valence: tracks.map(organiser("valence")).reduce(reducer)/tracks.length}/*,danceability: ,energy: ,instrumentalness: ,acoustiness: ,liveness: ,speechiness }*/
}

export {getDataForDanceability, getDataForEnergy, getDataForValence, getDataForWeekday, getMeanData}