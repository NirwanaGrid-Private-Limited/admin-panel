import React from 'react'
import back1 from '../assets/bg1.png'
import back2 from '../assets/bg1.png'
import back3 from '../assets/bg2.jpg'
import back4 from '../assets/bg2.jpg'


function Background({heroCount}) {
 
  if(heroCount === 0){ // Home
        return  <img src={ back2} alt="" className='w-full h-full absolute inset-0 object-cover'/>
    }else if(heroCount === 1){ // Office
       return  <img src={back1} alt="" className='w-full h-full absolute inset-0 object-cover'/>

    }else if(heroCount === 2){ // College
       return  <img src={back3} alt="" className='w-full h-full absolute inset-0 object-cover'/>

    }
}

export default Background