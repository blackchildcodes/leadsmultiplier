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

const LinkedInPage = () => {
    const [loading, setLoading] = useState(false)
    const [keywords, setKeywords] = useState("")
    const [people, setPeople] = useState<any[]>([])
    const { toast } = useToast()

    const generateLeads = async () => {
        setLoading(true)
        setPeople([])
        const url = `https://linkedin-api8.p.rapidapi.com/search-people?keywords=${keywords}&start=0&geo=103644278%2C101165590`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a8c31c6278msha5be81b01cf38edp17b795jsn9821bb2152db',
                'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result?.data?.items?.length > 0) {
                setPeople(result.data.items)
                //console.log(result.data.items);
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
                    <h1 className="text-3xl md:text-4xl">Search Leads From LinkedIn</h1>
                    <p className="text-lg text-muted-foreground">Search people and businesses from LinkedIn!</p>
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
                                placeholder="e.g. Real Estate Brokers"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                <GenerateButton loading={loading} generateLeads={generateLeads} />
                </CardFooter>
            </Card>

            <div className="flex flex-col gap-y-4">
                {people && people?.map((item) => (
                    <Card
                    key={item.username}
                    className="flex items-center justify-between p-4"
                    >
                    <div>
                        <h2 className="font-semibold text-xl text-primary">
                        {item?.username}
                        </h2>
                        <p>
                            {item?.headline}
                        </p>
                        <p>
                            {item?.location}
                        </p>
                        <a href={item?.profileURL} target="_blank">Go to LinkedIn Profile</a>
                    </div>

                    <div className="flex gap-x-4">
                        <Link href={`/dashboard/linkedin`}>
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

export default LinkedInPage