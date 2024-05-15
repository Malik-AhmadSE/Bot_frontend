import React from 'react';
import {SearchX} from 'lucide-react';
import { Separator } from "@/components/ui/separator"

export default function notfound() {
  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className="flex h-5 items-center space-x-4 text-sm">
        <SearchX className=' w-10 h-20 text-red-500' />
        <Separator orientation="vertical" className='h-10 bg-white' />
        <h1>Requested URL Is not Found </h1>
      </div>
    </div>
  )
}
