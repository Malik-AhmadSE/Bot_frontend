'use client'
import * as React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {useRouter,useSearchParams} from 'next/navigation'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Inputpassword } from "@/components/ui/password"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod" 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {resetPassword} from '@/services/reset';
import { useToast } from "@/components/ui/use-toast";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

const formSchema = z.object({
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
  

export default function CardWithForm() {
  const navigate=useRouter();
  const { toast } = useToast();
  const Param=useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword:""
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const id = Param.get('id');
      const result = await resetPassword(id,values);
      console.log(result);
      if(result.status===200){
       toast({
          title: "Password Reset",
          description:`${result.data.message}`,
        })
        navigate.push(`/login`);
      }else if(result.status===401){
        toast({
            title: "Invalid Email",
            description:`${result.data.message}`,
          })
      }else if(result.status===422){
        toast({
            title: "Validation Fail",
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
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-[380px] h-[480px] ">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <CardHeader>
      <CardTitle>New Password</CardTitle>
    </CardHeader>
    <CardContent>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Inputpassword placeholder="password" {...field} suffix={true}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /><br/>
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Inputpassword placeholder="password" {...field} suffix={true}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </CardContent>
    <CardFooter>
    <Button type="submit" disabled={isSubmitting}  className="dark:bg-green-600 text-white w-full">
    {isSubmitting ? (<span className="flex gap-1 justify-center items-center">Processing {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Set Password'}
    </Button>
    </CardFooter>
    </form>
    </Form>
  </Card>
  </div>
  )
}