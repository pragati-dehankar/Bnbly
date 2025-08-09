"use client";
import useCountries from "@/hooks/useCountries";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./country-select";
import Counter from "./counter-input";
import ImageUploadComponent from "./Image-uploader";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight} from "lucide-react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";


const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

export default function BecomeHostComponent() {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const router =useRouter();

  const setCustomValue = (title, value) => {
    setValue(title, value);
  };

  

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues:{
      category: "",
      roomCount:1,
      childCount:0,
      price:null,
      title:"",
      description:"",
      guestCount:2
    }
    
  });

  const category = watch("category");
  const location=watch("location")
  const roomCount=watch("roomCount")
  const childCount=watch("childCount")
  const guestCount=watch("guestCount")
  const imgSrc=watch("imgSrc")

  const isStepValid=useMemo(()=>{
    switch(step){
      case STEPS.CATEGORY:
          return !!category
      case STEPS.LOCATION:
          return !!location
      case STEPS.INFO:
          return !!guestCount>0 && roomCount>0
      case STEPS.IMAGES:
          return !!imgSrc
      case STEPS.DESCRIPTION:
          return !!watch('title') && watch('description')
      case STEPS.PRICE:
           return !!watch('price') && parseFloat(watch('price'))>0
        default:
           return true
     }
  },[step,category,location,roomCount,childCount,guestCount,imgSrc,watch()])

  const onBack=()=>{
    setStep(step=>step-1)
  }
  const onNext=(data)=>{
    if(step!==STEPS.PRICE){
      setStep(step=>step+1)
    }else{
      axios.post(`/api/v1/listings/`,data)
      .then(()=>{
        toast({
          title:"Yee",
          description:"Property listed"
        });
        router.push('/properties')
      }
      )
    }
  }
  const nextLabel=useMemo(()=>{
    if(step==STEPS.PRICE){
      return <span className="flex flex-row gap-2 items-center text-white text-semibold text-md">
        LIST  <ArrowRight size="20" className="text-white" />
      </span>
    }else{
      return <ArrowRight size="20" className="text-white" />
    }
  })

  let sourceAtStep = (
    <div className="flex flex-col gap-3 ">
      <h1 className="text-lg md:text-xl font-semibold text-gray-600 ">Which of these categories does define your Property</h1>
      <p className="text-gray-500">Pick a category</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.map((each) => {
          return (
            <div
              onClick={() => setCustomValue("category", each.label)}
              className={cn(
                "flex flex-col p-5 rounded-lg border-2 border-gray-300/20  text-semibold cursor-pointer",
                category==each.label?"bg-pink-400/80 text-white":"bg-gray-100"
            )}
            >
              <each.icon />
              {each.label}
            </div>
          );
        })}
      </div>
    </div>
  ); 
  if (step === STEPS.LOCATION) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600 ">Where is your property based out of </h1>
        <CountrySelect  value={location}  onChange={(value)=>setCustomValue("location",value)}/>
      </div>
    );
  } else if (step === STEPS.INFO) {
    sourceAtStep = (<div className="flex flex-col gap-3 ">
      <h1>Choose  your preferances</h1>
      <div className="flex justify-between">
        <span>
        <h3 className="text-lg font-semibold text-gray-600">How many rooms do you want?</h3>
        <p>Choose a room count</p>
        </span>
      <Counter  value={roomCount}
      onChange={value=>setCustomValue("roomCount",value)}
      />
      </div>
      <div className="w-full h-[0.4px] bg-gray-800 my-10"/>
      <div className="flex justify-between">
        <span>
        <h3 className="text-lg font-semibold text-gray-600">How many children do you have?</h3>
        <p>Choose a children count</p>
        </span>
      <Counter  value={childCount}
      onChange={value=>setCustomValue("roomCount",value)}
      />
      </div>
      <div className="w-full h-[0.4px] bg-gray-800 my-10"/>
      <div className="flex justify-between">
        <span>
        <h3 className="text-lg font-semibold text-gray-600">How many Adults are planning to join ?</h3>
        <p>Choose a guest count</p>
        </span>
      <Counter  value={guestCount}
      onChange={value=>setCustomValue("roomCount",value)}
      />
      </div>
      </div>
      )
  }
  else if(step==STEPS.IMAGES){
    sourceAtStep=(
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600 ">Upload a great img of your property</h1>
        {imgSrc && <Image src={imgSrc} width={500}  height={350} alt="Propertty img" />}
        We are uploading images here
        <ImageUploadComponent 
        value={imgSrc}
        returnUrl={url=>setCustomValue("imgSrc",url)}
        />
      </div>
    )
  }
  else if(step==STEPS.DESCRIPTION){
    sourceAtStep=(
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600 ">A bit of Details on your Property</h1>
        <Input 
        placeholder="title about your property"
        {...register('title')}
        />
        <Textarea
        placeholder="A bit about your property"
        {...register('description')}
        />
      </div>
    )
  }
  else if(step==STEPS.PRICE){
    sourceAtStep=(
      <div className="flex flex-col gap-3 ">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600 ">How much do you charge for your Property per Night?</h1>
        <Input 
        placeholder="e.g 1000"
        {...register('price')}
        />
      </div>
    )
  }

  return <section className="">
    <div className="p-4 md:p-8">
       {sourceAtStep}
    </div>
  
  <div className="w-full flex-col flex  fixed bottom-0 ">
    <div className="flex justify-between pb-4 px-8">
   <button onClick={onBack} className="p-4 rounded-full bg-pink-400 cursor-pointer"> <ArrowLeft size="20" className="text-white "/></button>
    <button onClick={handleSubmit(onNext)} className="p-4 rounded-full bg-pink-400 cursor-pointer disabled:bg-gray-400" disabled={!isStepValid}>{nextLabel}</button>
    </div>
  <div className="progress-bar  bg-pink-400 h-2" style={{width:`${((step+1)/Object.keys(STEPS).length)*100}%`}}>

  </div>
  </div>
  </section>;
}
