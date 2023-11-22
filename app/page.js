'use client'
import { Button, Card, Input, Skeleton } from '@nextui-org/react'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import { MdCompress } from "react-icons/md";

const page = () => {

  const [image, setImage] = useState('')
  const [loader, setloader] = useState(true)
  const [searchCity, setSearchCity] = useState('Mumbai')
  const [cityName, setCityName] = useState(searchCity)
  const [weatherData, setWeatherData] = useState({
    location:'',
    temperature:'',
    condition:'',
    humidity:'',
    pressure:'',
    description:'',
    windSpeed:'',
    icon:'',
  })

 useEffect(()=>{

     let apiKey='08db711abbd634b509db6847d0336070'
     
   axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
   .then(res=>{
    console.log(res.data) 
    console.log(res.data.weather[0].main) 
    setWeatherData({
      location:cityName,
      temperature:res.data.main.temp,
      condition:res.data.weather[0].main,
      humidity:res.data.main.humidity,
      pressure:res.data.main.pressure,
      description:res.data.weather[0].description,
      windSpeed:res.data.wind.speed,
      icon:res.data.weather[0].icon,
    })
    setloader(false)
    let locationName=res.data.name 
    axios.get(`https://api.teleport.org/api/urban_areas/slug:${locationName.toLowerCase()}/images/`)
    .then((res)=>{
      let cityPhoto=res.data.photos[0].image.mobile
      setImage(cityPhoto)
    })
    .catch((error)=>{
      
    })

   })
   .catch((error)=>{
   })
  
 }, [cityName])

  return (
   <main className='flex items-center justify-center bg-[#2B2A4C] h-screen'>
     <section className='md:w-9/12  w-full md:max-w-2xl md:h-96 shadow-lg  border-white border-2 bg-slate-300 md:rounded-md overflow-hidden flex md:flex-row flex-col'>
      <div className='md:w-2/5 h-full  relative'>
      <h3 className='absolute font-semibold text-6xl z-10 bottom-2 text-ellipsis drop-shadow-2xl text-center w-full'>{weatherData.location}</h3>
          <Image src={image} alt='Images' width={500} height={500} className='object-cover w-full h-full'/>
      </div>
      <div className='flex-1 h-full bg-[#FAF6F0] space-y-5 text-black  py-3'>
      <p className='text-center font-light text-xl'>Today Weather</p>

          <div className='flex gap-3 overflow-hidden items-center justify-center'>
            <Image src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} width={500} height={500} alt='icon' className='w-32  animate-pulse duration-250'/>
            <h2 className='text-5xl font-bold '>{Math.round(weatherData.temperature)}°C</h2>
          </div>

        <div className='flex items-center justify-around'>
          <h2 className='flex items-center justify-center flex-col font-light'><p className='font-semibold text-xl flex items-center justify-center'>
          <FiWind/> 
          {weatherData.windSpeed}m/s
          </p>
           Wind Speed</h2>
           <h2 className='font-light flex items-center justify-center flex-col'><p className=' font-semibold text-xl flex items-center justify-center'>

          <WiHumidity/>
           {
            weatherData.humidity
           }%
          </p>
           Humidity
          </h2>
          <h2 className='font-light flex items-center justify-center flex-col'><p className=' font-semibold text-xl flex items-center justify-center'>

          <MdCompress />
           {
            weatherData.pressure
           }hPa
          </p>
           Pressure
          </h2>
        </div>
        <h2 className='flex items-center justify-center'>
          Description:  <p className='font-light'>{weatherData.description}</p>
        </h2>

        <span className='flex items-center justify-center p-1'>
        <Input type="email"  classNames={{
          inputWrapper:'h-1 p-1 px-3'
        }}
        endContent={
          <Button className='h-full' onClick={()=>setCityName(searchCity)}>Search</Button>
        } 
        placeholder='Search by City Name'
        onChange={(e)=>setSearchCity(e.target.value)}
        className='border border-black rounded-md'
        />
        
        </span>
      </div>

</section>
   </main>
  )
}

export default page