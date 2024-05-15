import Link from "next/link"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { Mail } from "lucide-react"
import {useRouter} from 'next/navigation'

export function Search() {
  const Routes=useRouter();
  return (
    <div className="flex flex-row items-center gap-3">
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
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
    </div>
  )
}