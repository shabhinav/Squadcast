import * as React from 'react';
import { useState, useEffect } from 'react'

interface ListItem {
    name: string;
    username: string;
}

interface Props{
    searchValue: string;
    selecetedList: number;
    list: ListItem[];
    setSearchValue: (e:string) => void;
    setSelecetedList: (val: number) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutoSuggest = ({ searchValue, setSearchValue, setSelecetedList, selecetedList, list, handleChange }:Props) => {
  const [showPopup,setShowPopup]=useState(false)
  
  useEffect(() => {
    // condition if we want to open user auto suggest 
    if (searchValue && searchValue?.split(' ')[searchValue?.split(' ').length - 1].includes('@') && searchValue.split(' ')[searchValue.split(' ').length - 1].charAt(0) === '@') {
      setShowPopup(true)
    }
    else {
      setShowPopup(false)
    }
  },[searchValue])

    const onClickHandler = (item: ListItem) => {
        // if user click on the user name input box will be filled with name 
        const value = searchValue.split('@')
        value[value.length - 1] = item.name
        value.join("@")
        setSearchValue(value.join('@'))
    }


    const onKeyDownHandler = (e: React.KeyboardEvent) => {
        if (e.keyCode === 40) {
            // user click on the downward arrow the it will rotate the selected name input
            if (selecetedList === list.length - 1) {
                setSelecetedList(0)
            }
            else {
                setSelecetedList(selecetedList + 1)
            }
        } else if (e.keyCode === 38) {
            // user click on the upward arrow the it will rotate the selected name input
            if (selecetedList === 0) {
                setSelecetedList(list.length - 1)
            } else {
                setSelecetedList(selecetedList - 1)
            }
        }
        else if (e.keyCode === 13 && showPopup) {
            // if user press the enter key it will add the user to the input field
            onClickHandler(list[selecetedList])
        }

    }
    return <div>
        <input placeholder='Please enter text' className='text_box' onKeyDown={onKeyDownHandler} onChange={e => handleChange(e)} value={searchValue} />
        {/* looopind through the user info the input field condition satisfied */}
        {showPopup ?
            list.map((item:ListItem,index:number) =>
                item.username.startsWith(searchValue.split(' ')[searchValue.split(' ').length - 1].replace('@', '')) ?
                    <div onClick={() => onClickHandler(item)} key={index} className={selecetedList === index ? 'selected' : ''}>
                        {item.name}
                    </div> : <></>
            ) : <></>}
  </div>;
};

export default AutoSuggest;
