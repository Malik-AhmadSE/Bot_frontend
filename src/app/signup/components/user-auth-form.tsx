"use client"

import * as React from "react"
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
import {registerMail} from '@/services/register';
import { useToast } from "@/components/ui/use-toast"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// Schema zod 
const formSchema = z.object({
  email: z.string().min(1,'Email is required').email("Invalid email"),
})
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate=useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await registerMail(values.email);
      if(result.success===true){
      toast({
          title: "OTP Verification",
          description:`${result.message}`,
        })
      }
      navigate.push(`/otp/${values.email}`);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <Button type="submit"  className="dark:bg-yellow-500 text-white" disabled={isSubmitting}>
          {isSubmitting ? (<span className="flex gap-1 justify-center items-center">Processing {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Next'}
          </Button>
        </div>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button"  className="dark:bg-blue-600">
          <Icons.google className="mr-2 h-4 w-4" />{" "}
       Google
      </Button>
      <Button variant="outline" type="button">
          <Icons.apple className="mr-2 h-4 w-4" />{" "}
       Apple
      </Button>
    </div>
  )
}
