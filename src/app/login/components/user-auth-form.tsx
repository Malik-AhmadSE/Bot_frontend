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
import {Inputpassword} from '@/components/ui/password';
import { useDispatch } from "react-redux";
import user from "@/lib/Store/features/auth/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {userLogin} from "@/services/login";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;

// Schema zod 
const formSchema = z.object({
  email: z.string().min(1,'Email is required').email("Invalid email"),
  password:z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(12, "Password must be at most 12 characters long")
  .regex(passwordRegex, "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character")
})
export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:"",
    },
  })
 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await userLogin(values);
      console.log(result);
      if(result.data.status===200){
      toast({
          title: "Login SuccessFully",
          description:`${result.data.message}`,
        })
      }
      navigate.push(`/`);
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
        <h3 className=" text-blue-500 underline cursor-pointer hover:text-blue-600 flex justify-end" onClick={()=>navigate.push('/reset/forget')}>Forget password?</h3>
          <Button type="submit"  className="dark:bg-yellow-500 text-white" disabled={isSubmitting}>
            {isSubmitting ? (<span className="flex gap-1 justify-center items-center">Logging In {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Log In with Email '}
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
