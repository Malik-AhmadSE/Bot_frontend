'use client'
import React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
  } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useSearchParams } from "next/navigation"
  interface Feature {
    charts: string;
    indicators: string;
    historical_bars: string;
    technical_alert: string;
    parrallel_chart: string;
    ads: string;
    volume_profile: string;
    custom_timeframe: string;
    price:string;
  }
  
  interface CardData {
    title: string;
    feature: Feature;
  }

  export default function CardWithForm() {
  const navigate=useRouter();
  const {toast}=useToast();
  const [isYearly, setIsYearly] = React.useState(false);
  const Param=useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const yearlyPrice=["100","150","200"];
  const monthlyPrice=["24","50","80"];
  const price = isYearly ? yearlyPrice : monthlyPrice;
  const [period,setperiod]=React.useState('monthly');
  async function checked(){
    setperiod('Yearly');
    setIsYearly(!isYearly);
    
  }
  const createQueryString = React.useCallback(
    (values: { [key: string]: string }) => {
      const params = new URLSearchParams(window.location.search);
  
      Object.entries(values).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString();
    },
    [Param]
  )
 
  const handleSubmit=(price:string,title:string)=>{
    setIsSubmitting(true);
    try {
      
      navigate.push(`/payment`+"?"+createQueryString({
        period: period,
        price: price,
        title: title
      }));
    } catch (error) {
      toast({
        variant:'destructive',
        title: "Error",
        description:`${error}`,
      })
    }
    setIsSubmitting(false);
  }


  const cardsData: CardData[] = [
    { 
      title: 'Standard',
      feature: {
        charts: "2 charts per tab",
        indicators: "5 indicators per chart",
        historical_bars: "10K historical bars",
        technical_alert: "20 technical alerts",
        parrallel_chart: "10 parallel chart connections",
        ads: "No ads",
        volume_profile: "Volume profile",
        custom_timeframe: "Custom timeframes",
        price:price[0]
      }
    },
    { 
      title: 'Premium', 
      feature: {
        charts: "2 charts per tab",
        indicators: "5 indicators per chart",
        historical_bars: "10K historical bars",
        technical_alert: "20 technical alerts",
        parrallel_chart: "10 parallel chart connections",
        ads: "No ads",
        volume_profile: "Volume profile",
        custom_timeframe: "Custom timeframes",
        price:price[1]
      }
    },
    { 
      title: 'Advance', 
      feature: {
        charts: "2 charts per tab",
        indicators: "5 indicators per chart",
        historical_bars: "10K historical bars",
        technical_alert: "20 technical alerts",
        parrallel_chart: "10 parallel chart connections",
        ads: "No ads",
        volume_profile: "Volume profile",
        custom_timeframe: "Custom timeframes",
        price:price[2]
      }
    }
  ];
  return (
    <div className="w-full h-screen flex flex-col gap-6 mt-10 justify-center items-center">
    <div className="text-[20px] italic">Please subscribe to one of the packages to proceed</div>
    <div className="flex w-full -mt-5 items-center justify-end gap-2 mr-[200px]">
     <Label htmlFor="airplane-mode">Monthly</Label>
      <Switch id="airplane-mode" checked={isYearly} onCheckedChange={() => checked()}/>
      <Label htmlFor="airplane-mode">Yearly</Label>
    </div>
    <div className="w-full h-screen flex flex-row gap-3 -mt-5  justify-center items-center">
      {cardsData.map((card, index) => (
        <Card key={index} className="w-[350px]">
          <CardHeader>
            <CardTitle className="flex justify-center">{card.title}</CardTitle>
          </CardHeader>
          <Table className="w-full" >
            <TableBody>
            <TableRow className="border-0 flex-col">
            <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.charts}</TableCell>
            <TableCell className="flex -mt-6 items-center"><Progress value={30} className="h-1"/></TableCell>
            </TableRow>
            <TableRow className="border-0 flex-col">
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.indicators}</TableCell>
              <TableCell className="flex -mt-6 items-center"><Progress value={10} className="h-1"/></TableCell>
            </TableRow>
            <TableRow className="border-0 flex-col">
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.parrallel_chart}</TableCell>
              <TableCell className="flex -mt-6 items-center"><Progress value={20} className="h-1"/></TableCell>
            </TableRow>
            <TableRow className="border-0 flex-col">
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.historical_bars}</TableCell>
              <TableCell className="flex -mt-6 items-center"><Progress value={40} className="h-1"/></TableCell>
            </TableRow>
            <TableRow className="border-0 flex-col">
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.volume_profile}</TableCell>
            </TableRow>
            <TableRow className="border-0 flex-col">
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.ads}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
          <CardContent>
            <h1 className=" w-full flex justify-center font-semibold text-[40px]">{card.feature.price}{" "}$</h1>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-3/4" variant={"destructive"} disabled={isSubmitting} onClick={()=>handleSubmit(card.feature.price,card.title)} >{isSubmitting ? (<span className="flex gap-1 justify-center items-center">Processing {" "} <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /></span>)   : 'Subscribe'}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  )
}
