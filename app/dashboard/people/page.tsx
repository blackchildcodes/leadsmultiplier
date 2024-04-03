"use client"

import { ExportButton, GenerateButton } from "@/app/components/SubmitButtons"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { onGetExporItems } from "@/lib/utils"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const PeoplePage = () => {
    const [name, setName] = useState("")
    const [keyword, setKeyword] = useState("")
    const [pTitle, setPTitle] = useState("")
    const [pLocation, setPLocation] = useState("")
    const [employeesNum, setEmployeesNum] = useState("")
    const [people, setPeople] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const generateLeads = async () => {
        setLoading(true)

        setPeople([])
        const url = `https://apollo-io1.p.rapidapi.com/search_people?page=1&q_person_name=${name}&person_titles=${pTitle}&person_locations=${pLocation}&organization_num_employees_ranges=${employeesNum}&q_organization_keyword_tags=${keyword ?? "Google"}&organization_location_radius=100`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a969585268msh55e2bf4093fc67fp1d64fajsn2f2d47b4caf0',
                'X-RapidAPI-Host': 'apollo-io1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result?.data?.people?.length > 0) {
                setPeople(result?.data.people)
                console.log(result?.data.people);
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
            <h1 className="text-3xl md:text-4xl">Search People</h1>
            <p className="text-lg text-muted-foreground">Search potential clients around the world!</p>
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
                        <Label>Person Name (Optional)</Label>
                        <Input
                            name="name"
                            type="text"
                            id="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Searchable Keywords (*)</Label>
                        <Input
                            name="keyword"
                            type="text"
                            id="keyword"
                            placeholder="Keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Work Position (Optional)</Label>
                        <Input
                            name="pTitle"
                            type="text"
                            id="pTitle"
                            placeholder="Person Title"
                            value={pTitle}
                            onChange={(e) => setPTitle(e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Prefered Location (Optional)</Label>
                        <Select name="pLocation" onValueChange={(value) => setPLocation(value)} defaultValue={pLocation}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Location</SelectLabel>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="Austrailia">Austrailia</SelectItem>
                                    <SelectItem value="United Arab Emirates">United Arabs Emirates</SelectItem>
                                    <SelectItem value="South Africa">South Africa</SelectItem>
                                    <SelectItem value="China">China</SelectItem>
                                    <SelectItem value="Japan">Japan</SelectItem>
                                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>Number of Employees</Label>
                        <Select name="employeesNum" onValueChange={(value) => setEmployeesNum(value)} defaultValue={employeesNum}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select number employees" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Employees Count</SelectLabel>
                                    <SelectItem value="1,10">1-10</SelectItem>
                                    <SelectItem value="11,20">11-20</SelectItem>
                                    <SelectItem value="21,50">21-50</SelectItem>
                                    <SelectItem value="51,100">51-100</SelectItem>
                                    <SelectItem value="101,200">101-200</SelectItem>
                                    <SelectItem value="201,500">201-500</SelectItem>
                                    <SelectItem value="501,1000">501-1000</SelectItem>
                                    <SelectItem value="501,1000">1001-2000</SelectItem>
                                    <SelectItem value="2001,5000">2001-5000</SelectItem>
                                    <SelectItem value="5001,5000">5001-10000</SelectItem>
                                    <SelectItem value="10001">10001+</SelectItem>
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
            {people?.length > 0 ? <ExportButton loading={loading} onGetExporItems={() => onGetExporItems("Searched People", "People", people, setLoading, "people")} /> : <div></div>}
        </div>

        <div className="flex flex-col gap-y-4">
            {people?.length > 0 ? 
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead className="text-right">LinkedIn Page</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {people?.map((item) => (
                            <TableRow key={item?.id}>
                                <TableCell className="font-medium">{item?.name}</TableCell>
                                <TableCell>{item?.email}</TableCell>
                                <TableCell>{item?.phone_numbers[0]?.raw_number}</TableCell>
                                <TableCell className="text-right">
                                    <a href={item.linkedin_url} target="_blank">LinkedIn Page</a>
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

export default PeoplePage