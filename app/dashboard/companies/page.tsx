"use client"

import { GenerateButton } from "@/app/components/SubmitButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const CompaniesPage = () => {
    const [oLocation, setOLocation] = useState("")
    const [employeesNum, setEmployeesNum] = useState("")
    const [companies, setCompanies] = useState<any[]>([])
    const [industries, setIndustries] = useState<any[]>([])
    const [industry, setIndustry] = useState("")
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const getIndustries = async () => {
        const url = 'https://apollo-io1.p.rapidapi.com/get_industries';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'a8c31c6278msha5be81b01cf38edp17b795jsn9821bb2152db',
                'X-RapidAPI-Host': 'apollo-io1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            if (result?.data?.length > 0) {
                setIndustries(result.data)
                //console.log(result.data);
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
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You or the system must have used up your credit limit.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            })
        }
    }

    useEffect(() => {
        getIndustries();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateLeads = async () => {
        setLoading(true)
        
        setCompanies([])
        const url = `https://apollo-io1.p.rapidapi.com/search_organization?page=1&organization_locations=${oLocation}&organization_location_radius=100&organization_num_employees_ranges=${employeesNum}&organization_industry_tag_ids=${industry}`;

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
            if (result?.data?.length > 0) {
                setCompanies(result.data.organizations)
                //console.log(result.data.organizations);
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
            <h1 className="text-3xl md:text-4xl">Search Organizations</h1>
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
                        <Label>Number of Employees</Label>
                        <Select name="employeesNum" onValueChange={(value) => setEmployeesNum(value)} defaultValue={employeesNum}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Employees range" />
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
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>Industry</Label>
                        <Select name="industry" onValueChange={(value) => setIndustry(value)} defaultValue={industry}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Industry" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Employees Count</SelectLabel>
                                    {industries?.map((item) => (
                                        <SelectItem key={item.id} value={item.id}>{item.cleaned_name}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1">
                        <Label>Organization Location</Label>
                        <Input
                            name="oLocation"
                            type="text"
                            id="oLocation"
                            placeholder="Organization Location"
                            value={oLocation}
                            onChange={(e) => setOLocation(e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
              <GenerateButton loading={loading} generateLeads={generateLeads} />
            </CardFooter>
        </Card>

        <div className="flex flex-col gap-y-4">
            {companies && companies?.map((item) => (
                <Card
                key={item.id}
                className="flex items-center justify-between p-4"
                >
                    <div>
                        <h2 className="font-semibold text-xl text-primary">
                        {item?.name}
                        </h2>
                        <p>
                            {item?.phone}
                        </p>
                        <p>
                            {item?.primary_domain}
                        </p>
                        <a href={item.linkedin_url} target="_blank">LinkedIn Page</a>
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

export default CompaniesPage