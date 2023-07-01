import React, { useEffect, useState, useRef } from "react";
import './mobilesearch.scss'
import Search from "./Search";
import axios from "axios";


const MobileSearch=()=>{
    const [searchValue,setSearchValue]=useState(null)
    const [results,setResults]=useState(null)
    const refSearch=useRef()
    const handleInput=async (value)=>{
        handleFetchUser(value)
        setSearchValue(value)
      }
      const handleFetchUser=(user)=>{
        axios.get(`/api/search/${user}`).then(({data})=>{
          setResults(data)
      })
    }
    useEffect(()=>{
        if (document.activeElement !== refSearch.current) {
          setSearchValue(null)
        }
      })
    return (
    <div className="mobile-search-container">
        <input type="text" ref={refSearch} placeholder='Search' onChange={(e)=>handleInput(e.target.value)} value={searchValue}/>
        {searchValue ? (<div className='mobile-search-container__results'>{(results?.length!=0) ? results?.map(x=><Search data={x}/>) : <h4 style={{textAlign: 'center'}}>No Results!</h4>}</div>) : ' '} 
    </div>)
}

export default MobileSearch