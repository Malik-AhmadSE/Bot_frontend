"use client"

import * as React from "react"
import {useRouter, useSearchParams} from 'next/navigation'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar";
import {Inputpassword} from "@/components/ui/password";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Register } from "@/services/register";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}



// password regex

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

// Schema zod 

const formSchema = z.object({
  name: z.string().min(1,'Name is required').max(15),
  email: z.string().min(1,'Email is required').email("Invalid email"),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  address:z.string().min(1,'address is required').max(20),
  password:z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(12, "Password must be at most 12 characters long")
  .regex(passwordRegex, "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"),
  confirmPassword:z.string().min(8,"Password must be 8 character long").max(12)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], 
});
export function UserAuthForm({className, ...props}: UserAuthFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const Param=useSearchParams();
  const navigate=useRouter();
  const email:string=Param.get("email") as string;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email:email,
      dob:new Date(),
      address:"",  
      password:"",
      confirmPassword:""

    },
  })

  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(Param.toString())
      params.set(name, value)
      return params.toString()
    },
    [Param]
  )
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await Register(email,values);
      console.log(result.data.message._id);
      if(result.status===201){
      toast({
          title: "Signup Successfully",
          description:`Signup SuccessFully ${result.data.message.email}`,
        })
      navigate.push(`/subscription`+"?"+createQueryString("id",result.data.message._id)); 
      }else if(result.status===409){
        toast({
          title: "Email/Username Exist",
          description:`${result.data.message}`,
        })
      }
      
    } catch (error) {
      toast({
        variant:'destructive',
        title: "Error",
        description:`${error}`,
      })
    }
    setIsSubmitting(false);
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} disabled={true}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[350px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date : any) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Inputpassword placeholder="password" {...field} suffix={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Inputpassword placeholder="confirm password" {...field} suffix={true}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit"  className="dark:bg-yellow-500 text-white" disabled={isSubmitting}>
          {isSubmitting ? (<span className="flex gap-1 justify-center items-center">Processing {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Signup'}
          </Button>
        </div>
        </form>
      </Form>
    </div>
  )
}
