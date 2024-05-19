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
import {useRouter} from 'next/navigation'
import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {resetMail} from '@/services/reset';
import { useToast } from "@/components/ui/use-toast";
const formSchema = z.object({
    email: z.string().min(1,'Email is required').email("Invalid email"),
})
  

export default function CardWithForm() {
  const navigate=useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await resetMail(values);
      console.log(result);
      if(result.status===200){
       toast({
          title: "Email Send",
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
      <Card className="w-[350px] h-[350px] ">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <CardHeader>
      <CardTitle>Password Reset</CardTitle>
      <CardDescription className=" text-red-500">Please Enter your Email for Password Reset </CardDescription>
    </CardHeader>
    <CardContent>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </CardContent>
    <CardFooter>
    <Button type="submit" disabled={isSubmitting}  className="dark:bg-green-600 text-white w-[120px]">
    {isSubmitting ? (<span className="flex gap-1 justify-center items-center">Sending {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Send Email'}
    </Button>
    </CardFooter>
    </form>
    </Form>
  </Card>
  </div>
  )
}