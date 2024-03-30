"use client"

import { GenerateButton } from "@/app/components/SubmitButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const BusinessesPage = () => {
    const [loading, setLoading] = useState(false)
    const [keywords, setKeywords] = useState("")
    const [verified, setVerified] = useState("true")
    const [businesses, setBusinesses] = useState<any[]>([])
    const { toast } = useToast()

    const generateLeads = async () => {
        setLoading(true)
        setBusinesses([])
        const url = `https://local-business-data.p.rapidapi.com/search?query=${keywords}&limit=20&lat=37.359428&lng=-121.925337&zoom=13&language=en&region=us&verified=${verified}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a8c31c6278msha5be81b01cf38edp17b795jsn9821bb2152db',
                'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result?.data?.length > 0) {
                setBusinesses(result.data)
                //console.log(result.data);
                setLoading(false)
                toast({
                    title: "Successful",
                    description: "You successfuly generated your leads.",
                })
            } else {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "You or the system must have used up your credit limit.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        } catch (error) {
            console.error(error);
            setLoading(false)
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You or the system must have used up your credit limit.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    return (
        <div className="grid items-start gap-8">
            <div className="flex items-center justify-between px-2">
                <div className="grid gap-1">
                    <h1 className="text-3xl md:text-4xl">Search Local Businesses</h1>
                    <p className="text-lg text-muted-foreground">Search local businesses from anywhere!</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Generate Data</CardTitle>
                <CardDescription>
                    Please provide the neccessary data to produce your leads
                </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-2">
                        <div className="space-y-1">
                            <Label>Searchable Keywords (*)</Label>
                            <Input
                                name="keywords"
                                type="text"
                                id="keywords"
                                placeholder="e.g. Plumbers near New-York, USA"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Verified Businesses?</Label>
                            <Select name="verified" onValueChange={(value) => setVerified(value)} defaultValue={verified}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a color" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Here</SelectLabel>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                <GenerateButton loading={loading} generateLeads={generateLeads} />
                </CardFooter>
            </Card>

            <div className="flex flex-col gap-y-4">
                {businesses?.map((item) => (
                    <Card
                    key={item.business_id}
                    className="flex items-center justify-between p-4"
                    >
                    <div>
                        <h2 className="font-semibold text-xl text-primary">
                        {item?.name}
                        </h2>
                        <p>
                            {item?.phone_number}
                        </p>
                        <p>
                            Business Status: {item?.business_status}
                        </p>
                        <a href={item.website} target="_blank">Website</a>
                    </div>

                    <div className="flex gap-x-4">
                        <Link href={`/dashboard/companies`}>
                        <Button variant="outline" size="icon">
                            <Download className="w-4 h-4" />
                        </Button>
                        </Link>
                    </div>
                    </Card>
                ))}
            </div>

        </div>
    )
}

export default BusinessesPage