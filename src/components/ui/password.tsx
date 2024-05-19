import * as React from "react"
import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    suffix?:React.ReactNode;
  }

const Inputpassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffix,className, type, ...props }, ref) => {
    const [showpassword,setshowpasword]=React.useState(false);
    return (
  <>
      <input
        type={showpassword ? "text":"password"}
        className={cn(
          "flex h-10 w-full  rounded-md border border-input bg-background px-3 py-2  text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      {suffix && (
        <div className=" text-zinc-800 relative float-right flex items-center pr-3 cursor-pointer hover:text-yellow-500">
          {showpassword ? <EyeIcon className=" absolute bottom-4 right-2" onClick={()=>setshowpasword(false)}/>:<EyeOffIcon className=" absolute bottom-4 right-2" onClick={()=>setshowpasword(true)}/>}
        </div>
      )}
      </>
    )
  }
)
Inputpassword.displayName = "Inputpassword"

export { Inputpassword }
