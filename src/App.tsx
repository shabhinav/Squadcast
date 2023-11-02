import * as React from 'react';
import { useState,} from 'react'
import './App.css'
import AutoSuggest from './components/common/autosuggest/autosuggest';


// dummy userData
const list = [
  { name: 'Abhinav Sharma', username: 'Abhinav Sharma' },
  { name: 'Pradhum Bansal', username: 'Pradhum Bansal' },
  { name: 'Abhay Dekate', username: 'Abhay Dekate' },
  { name: 'Abhijeet Gosai', username: 'Abhijeet Gosai' },
  { name: 'Pranay Sharma', username: 'Pranay Sharma' },
]

// user data object interface


function App() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selecetedList, setSelecetedList] = useState<number>(0)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return <div>
    <AutoSuggest
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setSelecetedList={setSelecetedList}
      selecetedList={selecetedList}
      list={list}
      handleChange={handleChange} 
    />
  </div>
}

export default App
