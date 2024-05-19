'use client'
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import {useRouter} from 'next/navigation'
import { useSelector } from "react-redux"
import { UserNav } from "./user_nav"
export function Search() {
  const auth:boolean=useSelector((state:any)=>state.user.auth);
  const name:string=useSelector((state:any)=>state.user.name);

  const Routes=useRouter();
  return (
    <div className="flex flex-row items-center gap-3">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
      {auth ? <div className="ml-4 flex gap-2 justify-center items-center"><UserNav/><>{name}</></div> : 

      <>
      <Link
        href="/login"
        className=" hover:text-yellow-500 rounded-sm p-2"
      >
        LogIn
      </Link>
      <Button variant={"secondary"} className="flex flex-row gap-1 hover:bg-yellow-500" onClick={()=>Routes.push('/signup')}>
        <Mail size={18}/>
        <h3>Signup</h3>
      </Button>
      </>
      }
    </div>
  )
}