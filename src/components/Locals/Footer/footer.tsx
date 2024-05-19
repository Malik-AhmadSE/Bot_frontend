import React from 'react'
import Link from 'next/link'
import { Avatar,AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import {Icons} from '@/components/ui/icons';
import { Separator } from "@/components/ui/separator"
type Props = {}

const Footer = (props: Props) => {
  return (
    <>
    <div className='w-full flex flex-row gap-4 p-10 h-[500px]'>
        <div className=' w-[35%] flex flex-col h-full gap-8'>
          <Link href={''}>
            <div className='flex flex-row gap-2 justify-center items-center'>
            <Avatar className="h-24 w-24">
              <AvatarImage src="/static/images/logopgot.png" alt="@shadcn" />
              <AvatarFallback>PGOT</AvatarFallback>
            </Avatar>
            <span>Prime Genesis Of Technologies</span>
            </div>
            </Link>
          <div className='flex flex-row flex-wrap gap-6 justify-center'>
          <Link href={''} className='w-10 h-10 bg-blue-300 flex justify-center items-center rounded-lg'><Icons.Facebook/></Link>
          <Link href={''} className='w-10 h-10 bg-red-500 flex justify-center items-center rounded-lg'><Icons.Instagram/></Link>
          <Link href={''} className='w-10 h-10 bg-slate-50 flex justify-center items-center rounded-lg'><Icons.twitter/></Link>
          <Link href={''} className='w-10 h-10  bg-slate-50 flex justify-center items-center rounded-lg'><Icons.Tictok/></Link>
          </div>
        </div>
        <div className='w-[280px] flex flex-col gap-2 justify-center'>
          <h2 className=' font-semibold'>About us</h2>
      <Link href="#" className="hover:underline">About</Link>
      <Link href="#" className="hover:underline">Careers</Link>
      <Link href="#" className="hover:underline">Announcements</Link>
      <Link href="#" className="hover:underline">News</Link>
      <Link href="#" className="hover:underline">Press</Link>
      <Link href="#" className="hover:underline">Legal</Link>
      <Link href="#" className="hover:underline">Terms</Link>
      <Link href="#" className="hover:underline">Privacy</Link>
      <Link href="#" className="hover:underline">Building Trust</Link>
      <Link href="#" className="hover:underline">Community</Link>
      <Link href="#" className="hover:underline">Risk Warning</Link>
      <Link href="#" className="hover:underline">Notices</Link>
      <Link href="#" className="hover:underline">Desktop Application</Link>
        </div>
        <div className='w-[280px] flex flex-col gap-2 justify-center'>
          <h2 className=' font-semibold'>About us</h2>
      <Link href="#" className="hover:underline">About</Link>
      <Link href="#" className="hover:underline">Careers</Link>
      <Link href="#" className="hover:underline">Announcements</Link>
      <Link href="#" className="hover:underline">News</Link>
      <Link href="#" className="hover:underline">Press</Link>
      <Link href="#" className="hover:underline">Legal</Link>
      <Link href="#" className="hover:underline">Terms</Link>
      <Link href="#" className="hover:underline">Privacy</Link>
      <Link href="#" className="hover:underline">Building Trust</Link>
      <Link href="#" className="hover:underline">Community</Link>
      <Link href="#" className="hover:underline">Risk Warning</Link>
      <Link href="#" className="hover:underline">Notices</Link>
      <Link href="#" className="hover:underline">Desktop Application</Link>
        </div>
        <div className=' w-[280px] flex flex-col gap-2 justify-center'>
          <h2 className=' font-semibold'>About us</h2>
      <Link href="#" className="hover:underline">About</Link>
      <Link href="#" className="hover:underline">Careers</Link>
      <Link href="#" className="hover:underline">Announcements</Link>
      <Link href="#" className="hover:underline">News</Link>
      <Link href="#" className="hover:underline">Press</Link>
      <Link href="#" className="hover:underline">Legal</Link>
      <Link href="#" className="hover:underline">Terms</Link>
      <Link href="#" className="hover:underline">Privacy</Link>
      <Link href="#" className="hover:underline">Building Trust</Link>
      <Link href="#" className="hover:underline">Community</Link>
      <Link href="#" className="hover:underline">Risk Warning</Link>
      <Link href="#" className="hover:underline">Notices</Link>
      <Link href="#" className="hover:underline">Desktop Application</Link>
      </div>
    </div>
    <div className='w-full flex justify-center'>
    <Separator className='w-[80%]'/>
    </div>
    <div className='w-full flex justify-center p-4'>
    @pgot Private Limited
    </div>
    </>
  )
}

export default Footer;