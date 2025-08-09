"use client"

import { CircleUserIcon, Search } from "lucide-react";
import { Icons } from "./Icons";
import{DropdownMenuTrigger, DropdownMenu,DropdownMenuContent,DropdownMenuItem, DropdownMenuSeparator} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import SearchModal from "./search-modal";
import Link from "next/link";

export default function Navbar(){
    const [isOpen,setIsOpen]=useState(false)
    const [modalState,setModalState]=useState(-1)
    
    const openSearchModelAtStep=(step)=>{
        if (!isOpen){
        setIsOpen(true)
        setModalState(step)
        }
    }
    return <div className="flex items-center justify-between py-3 px-5 md:px-16 bg-muted border-b">
        <div className="logo flex gap-1">
       <Icons.logo className="w-6"/>
       <span className="text-pink-400 font-semibold text-lg">bnbly</span>
        </div>
        <div className="search_feature cursor-pointer flex gap-2 items-center px-[6px]  py-[4px] rounded-full bg-white border-2 border-gray-300">
            <div onClick={()=>openSearchModelAtStep(0)} className="hover:bg-gray-200  transition-colors duration-200 delay-100 px-3 py-1 rounded-full  cursor-pointer" >
                Location
            </div>
            <div className="bg-gray-400 h-[20px] w-[0.7px]  my-1"></div>
            <div onClick={()=>openSearchModelAtStep(1)} className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full  cursor-pointer"> 
                Date 
            </div>
            <div className="bg-gray-400 h-[20px] w-[0.7px]   my-1"></div>
            <div onClick={()=>openSearchModelAtStep(2)} className="hover:bg-gray-200 transition-colors duration-200 delay-100 px-3 py-1 rounded-full  cursor-pointer">
               Details
            </div>
            
            <div onClick={()=>openSearchModelAtStep(0)} className="bg-pink-400  hover:scale-105 transition-all duration-300 delay-100 text-white p-2 rounded-full  cursor-pointer">
            <Search/>
            </div>
        </div>
        <div>
           <UserComponent/>
        </div>
        <SearchModal key={modalState} isOpen={isOpen} setIsOpen={setIsOpen} stepAt={modalState} />
    </div>
}

const UserComponent=()=>{
    return (
        <DropdownMenu>
       <DropdownMenuTrigger className="outline-none">
         <CircleUserIcon  />
       </DropdownMenuTrigger>
       <DropdownMenuContent>
        <DropdownMenuItem> <Link href="/bookings"> My bookings</Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/favourites"> My favourites </Link></DropdownMenuItem>
        <DropdownMenuItem><Link href="/properties"> My properties</Link></DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem> Bnbly Your Home</DropdownMenuItem>

       </DropdownMenuContent>
       </DropdownMenu>
    )
}