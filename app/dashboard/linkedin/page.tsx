"use client"

import { ExportButton, GenerateButton } from "@/app/components/SubmitButtons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { onGetExporItems } from "@/lib/utils"

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
                {people?.length > 0 ? <ExportButton loading={loading} onGetExporItems={() => onGetExporItems("Searched People", "People", people, setLoading, "linkedin")} /> : <div></div>}
            </div>

            <div className="flex flex-col gap-y-4">
                {people?.length > 0 ? 
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Username</TableHead>
                                <TableHead>Head Line</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Profile Link</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {people?.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{item?.username}</TableCell>
                                    <TableCell>{item?.headline}</TableCell>
                                    <TableCell>{item?.location}</TableCell>
                                    <TableCell className="text-right">
                                        <a href={item?.profileURL} target="_blank">Go to LinkedIn Profile</a>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> : <div></div>
                }
                
            </div>

        </div>
    )
}

export default LinkedInPage