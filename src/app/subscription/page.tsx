import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
export const metadata: Metadata = {
    title: "Subscription",
    description: "Subscription page",
  }
  interface Feature {
    charts: string;
    indicators: string;
    historical_bars: string;
    price_alert: string;
    technical_alert: string;
    parrallel_chart: string;
    ads: string;
    volume_profile: string;
    custom_timeframe: string;
  }
  
  interface CardData {
    title: string;
    feature: Feature;
  }

  export default function CardWithForm() {
      
  const cardsData: CardData[] = [
    { 
      title: 'Standard',
      feature: {
        charts: "2 charts per tab",
        indicators: "5 indicators per chart",
        historical_bars: "10K historical bars",
        price_alert: "20 price alerts",
        technical_alert: "20 technical alerts",
        parrallel_chart: "10 parallel chart connections",
        ads: "No ads",
        volume_profile: "Volume profile",
        custom_timeframe: "Custom timeframes"
      }
    },
    { 
      title: 'Premium', 
      feature: {
        charts: "2 charts per tab",
        indicators: "5 indicators per chart",
        historical_bars: "10K historical bars",
        price_alert: "20 price alerts",
        technical_alert: "20 technical alerts",
        parrallel_chart: "10 parallel chart connections",
        ads: "No ads",
        volume_profile: "Volume profile",
        custom_timeframe: "Custom timeframes"
      }
    },
    { 
      title: 'Advance', 
      feature: {
        charts: "2 charts per tab",
        indicators: "5 indicators per chart",
        historical_bars: "10K historical bars",
        price_alert: "20 price alerts",
        technical_alert: "20 technical alerts",
        parrallel_chart: "10 parallel chart connections",
        ads: "No ads",
        volume_profile: "Volume profile",
        custom_timeframe: "Custom timeframes"
      }
    }
  ];
  return (
    <div className="w-full h-screen flex flex-col gap-6 mt-10 justify-center items-center">
    <div className="flex items-center gap-2">
     <Label htmlFor="Monthly">Monthly</Label>
      <Switch id="airplane-mode" />
      <Label htmlFor="Yearly">Yearly</Label>
    </div>
    <div className="w-full h-screen flex flex-row gap-3  justify-center items-center">
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
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.price_alert}</TableCell>
              <TableCell className="flex -mt-6 items-center"><Progress value={60} className="h-1"/></TableCell>
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
              <TableCell className="flex gap-2 -mt-4 items-center"><ChevronRight className="h-4 w-4" />{card.feature.technical_alert}</TableCell>
              <TableCell className="flex -mt-6 items-center"><Progress value={50} className="h-1"/></TableCell>
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
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className=" w-3/4" variant={"destructive"}>Subscribe</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  )
}
