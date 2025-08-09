import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React, { useCallback, useState } from 'react'
import CountrySelect from './country-select'
import CalenderInput from './calendar'
import Counter from './counter-input'
import { useRouter, useSearchParams } from 'next/navigation'

const STEPS={
    LOCATION:0,
    DATE:1,
    DETAILS:2
}

export default function SearchModal({isOpen,setIsOpen,stepAt}) {
    const [step,setStep]=useState(stepAt  ||  STEPS.LOCATION)
    const [location,setLocation]=useState()
    const [guestCount,setGuestCount]=useState(2)
    const [roomCount,setRoomCount]=useState(1)
    const [childCount,setChildCount]=useState(0)
    const [dateRange,setDateRange]=useState({
        startDate:new Date(),
        endDate:new Date(),
        Key:'selection'
    }
)
const router=useRouter()
const searchParams=useSearchParams()

    const sourceToReturn={
        [STEPS.LOCATION]:(
            <div>
                <h2>Where are you planning to visit</h2>
                <CountrySelect
                value={location}
                onChange={value=> setLocation(value)}
                />
            </div>
        ),
        [STEPS.DATE]:(
            <div>
                <CalenderInput value={dateRange}
                onChange={value=>setDateRange(value.selection)}
                />
                </div>
        ),
        [STEPS.DETAILS]:(
            <div>
                 <div className='flex  justify-between'>
                        <h3>
                            How many guests are joining ?
                        </h3>
                <Counter
                value={guestCount}
                onChange={setGuestCount}
                />
                </div>
                <div className='h-[0.4px] w-full bg-gray-500 my-5'/>
                <div className='flex  justify-between'>
                        <h3>
                            How many Rooms do you want ?
                        </h3>
                <Counter
                value={roomCount}
                onChange={setRoomCount}
                />
                </div>
                <div className='h-[0.4px] w-full bg-gray-500 my-5'/>

                <div className='flex  justify-between'>
                        <h3>
                            How many children?
                        </h3>
                <Counter
                value={childCount}
                onChange={setChildCount}
                />
                </div>
            </div>
        ),
        
    }
    const onBack=()=>{
        if(step == 0) return
            setStep(prevStep=>prevStep-1)
    }
    const onNext=useCallback(()=>
    {
        if(step==Object.keys(STEPS).length-1){
            const trackQuery={
               ...(location?.value && {locationValue:location.value}),
               ...(guestCount && {guestCount:guestCount}),
            ...(roomCount && {roomCount:roomCount}),
            ...(childCount && {childCount:childCount}),
            ...(dateRange.startDate && dateRange.endDate && {
                startDate:dateRange.startDate,
                endDate:dateRange.endDate
            })
            }
            if(Object.keys(trackQuery).length===0) return;

            const queryString=Object.keys(trackQuery).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(trackQuery[key])}`).join("&")

            const params=new URLSearchParams(searchParams.toString())
            const tempCat=params.get('cat')
            const url=`/?${queryString}&cat=${tempCat}`
            setIsOpen(false)
            router.push(url)
        }
        setStep(prevStep=>prevStep+1)
    },[step,location,guestCount,roomCount,childCount,dateRange])
    const labelForLastButton=step==Object.keys(STEPS).length-1 ? "Search":"Next"
  return (
    <>
    {
        isOpen  ?
        (<div className='fixed top-0 left-0 w-full h-screen'>
            <div className='w-full relative  bg-black/40 h-screen'>
            <div className='modal-content absolute left-1/2 top-1/2 rounded-lg shadow -translate-x-1/2 p-5 -translate-y-1/2 bg-white w-full md:w-3/5 min-h-[300px]'>
              {sourceToReturn[step]}
               <X className='float-right  cursor-pointer absolute top-4 right-4' onClick={()=>setIsOpen(false)}/>
                <div className='w-full flex justify-between pt-5'>
                    <Button diabled={step==0} onClick={onBack} className={step==0 && 'bg-gray-500'}>
                        Back
                    </Button>
                    <Button className={step==Object.keys(STEPS).length-1  &&  "bg-pink-400 hover:bg-pink-300"} onClick={onNext}>
                      {labelForLastButton}
                    </Button>
                </div>
            </div>
    
        </div>
        </div>):null
    }
    </>
  )
}
