"use client";

import CalenderInput from '@/app/components/calendar';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from './button';
import { differenceInCalendarDays ,eachDayOfInterval} from "date-fns";
import formatMoney from '@/utils/formatMoney';
import { setReservation } from '@/app/actions/reservation';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


function ReservationComponent({pricePerDay,listingId,reservations}) {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [total,setTotalPrice]=useState(pricePerDay)
  const router=useRouter()

  const disabledDates= useMemo(()=>{
   let dates=[]
   reservations.forEach(reservation=>{
    const range=eachDayOfInterval({
      start:new Date(reservation.startDate),
      end:new Date(reservation.endDate)
    })
    dates=[...dates,...range]
   })
   return dates
  },[reservations])

  useEffect(()=>{
     if(dateRange.startDate && dateRange.endDate){
      const countDays=differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      )
      if(pricePerDay && countDays){
        setTotalPrice(countDays * pricePerDay)
      }else{
        setTotalPrice(pricePerDay)
      }
     }
  },[pricePerDay,dateRange])

  async function handleReservation(){
    try {
     const res= await setReservation({listingId,startDate:dateRange.startDate,endDate:dateRange.endDate,price:total})
    if(res.ok){
      toast({
        title:"Yee",
        description:"Your property is booked"
      })
      router.push('/bookings')
    }
    } catch (error) {
      toast({
        title:"Uh oh!",
        description:"Error occurred",
        variant:"destructive"
      })
    }
  }
  return (
    <div className='flex flex-col gap-1 items-center pt-4'>
      <CalenderInput
        value={dateRange}
        className="w-full"
        onChange={(value) => setDateRange(value.selection)}
        disabledDates={disabledDates}
      />
      <Button className="text-lg  w-full" onClick={handleReservation}>Book for ₹{formatMoney(total)}</Button>
    </div>
  );
}

export default ReservationComponent;
