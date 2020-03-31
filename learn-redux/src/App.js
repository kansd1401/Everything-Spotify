import React from 'react';
import {createStore} from 'redux';

//Store - Globalised state

//Action - Increment

const increment = () => {
  return {
    type: 'INCREMENT',

  }
}

const decrement = () => {
  return {
    type: 'DECREMENT',

  }
}

//Reducer

const counter = (state = 0, action) => {
  switch(action.type){
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
      
  }
}

let store = createStore(counter)

//Dispatch in the console 

store.subscribe(() => console.log(store.getState()))

//Dispatch

store.dispatch(increment())

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
