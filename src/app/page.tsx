'use client'
import * as React from "react"
import {useRouter} from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import FAQ from '../components/Locals/Home/faq';
import Footer from "../components/Locals/Footer/footer"
import { NavBar } from "../components/Locals/Navbar/nav";
import { Icons } from "@/components/ui/icons"
import  CarouselPlugin  from "../components/Locals/Home/Crousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Middle from "../components/Locals/Home/Middle"
import { DrawerDemo } from "../components/Locals/Home/Drawer"
import {registerMail} from '@/services/register';
import { useToast } from "@/components/ui/use-toast"
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
// Schema zod 
const formSchema = z.object({
  email: z.string().min(1,'Email is required').email("Invalid email"),
})
export default function Home({ className, ...props }: UserAuthFormProps) {
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
      if(result.status===200){
        toast({
            title: "OTP Verification",
            description:`${result.data.message}`,
          })
          navigate.push(`/otp/${values.email}`);  
        }else if(result.status===409){
          toast({
            variant:'destructive',
            title: "Email Exist",
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
    <>
      <NavBar />
    <div className={cn("w-full h-full gap-20 p-10 flex", className)} {...props}>
      
      <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" w-1/2 flex pt-16 items-center justify-center">
        <div className="gap-3 grid w-[350px]">
        <h1 className=" text-white text-[60px]">19405050</h1>
      <p className=" text-white text-[30px]">Number of Users <DrawerDemo/></p>
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
          <p>Signup to trade like a pro</p>
        </div>
        </form>
      </Form>
      <div className="w-1/2 pt-20 z-0 h-full flex justify-center">
      <CarouselPlugin />
      </div>
    </div>
    
      <div className='w-full flex justify-center'>

        <div className=' w-[80%] p-5'>
        <div className=" text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, labore vel! Quia libero corporis nihil sint, aperiam minus quas neque explicabo exercitationem corrupti minima voluptas sequi ad itaque nesciunt optio?Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum natus necessitatibus nihil voluptatem tempora quasi porro rerum? Nemo, rem illo! Vero enim inventore, error officiis facere vitae beatae iusto ullam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam error voluptatibus assumenda fugiat inventore. Sed nostrum incidunt ullam eaque quo pariatur, odit, aspernatur dolore explicabo cumque, dolores nam quaerat eius!    </div>
         <Middle />
          <FAQ />
          
        </div>
      </div>
      <Footer />
    </>
  );
}
