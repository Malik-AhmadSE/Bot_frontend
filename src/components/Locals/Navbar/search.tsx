'use client'
import Link from "next/link"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import {useRouter} from 'next/navigation'
import { useSelector } from "react-redux"
import { UserNav } from "./user_nav"
import { Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export function SearchBar() {
  const auth:boolean=useSelector((state:any)=>state.user.auth);
  const name:string=useSelector((state:any)=>state.user.name);
  const Routes=useRouter();

  return (
    <div className="flex flex-row items-center gap-3">
      <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline" className="text-[15px] w-60 flex justify-between">Search...
      <Search />
      </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] -p-8">
        <DialogHeader>
        <Command className="sm:max-w-[425px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
        </DialogHeader>
      </DialogContent>
    </Dialog>
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