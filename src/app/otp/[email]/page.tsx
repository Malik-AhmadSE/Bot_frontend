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
import {verifyotp} from '@/services/register';
import { useToast } from "@/components/ui/use-toast";
import {usePathname,useSearchParams} from 'next/navigation'
import { useCallback } from "react"
const formSchema = z.object({
  otp: z.string().min(18).max(18)
})
  

export default function CardWithForm() {
  const navigate=useRouter();
  const { toast } = useToast();
  const pathname = usePathname().slice(5);
  const searchParams=useSearchParams();
  const email = pathname;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });
  const createQueryString = React.useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      
      const result = await verifyotp(email,values);
      if(result.success===true){
      toast({
          title: "OTP Verification",
          description:`${result.message}`,
        })
      }
      navigate.push(`/signup`+"?"+createQueryString("email",email));
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
      <CardTitle>Otp Verification</CardTitle>
      <CardDescription className=" text-red-500">Please check you email for Otp Verification </CardDescription>
    </CardHeader>
    <CardContent>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP Code</FormLabel>
              <FormControl>
                <Input placeholder="otp" {...field} maxLength={18} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <p className="float-right mt-5 cursor-pointer text-blue-500 hover:bg-accent p-2 rounded-md">Resend</p>
    </CardContent>
    <CardFooter>
    <Button type="submit" disabled={isSubmitting}  className="dark:bg-red-500 text-white w-[120px]">
    {isSubmitting ? (<span className="flex gap-1 justify-center items-center">Verifying {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Verify'}
    </Button>
    </CardFooter>
    </form>
    </Form>
  </Card>
  </div>
  )
}