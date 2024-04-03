import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import * as XLSX from "xlsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const onGetExporItems = async (title: string, worksheetname: string, items: any[], setLoading: (isLoading: boolean) => void, type: string) => {
  let dataToExport: any[] = [];
  try {
    setLoading(true);
    // Check if the action result contains data and if it's an array
    if (items && Array.isArray(items)) {
      if (type == "linkedin") {
        dataToExport = items.map((ppl: any) => ({
        username: ppl?.username,
        headline: ppl?.headline,
        location: ppl?.location,
        profile: ppl?.profileURL, }) ,);
      } else if (type == "businesses") {
        dataToExport = items.map((bs: any) => ({
        name: bs?.name,
        phone: bs?.phone_number,
        status: bs?.business_status,
        profile: bs?.profileURL, }) ,);
      } 
      else if (type == "companies") {
        dataToExport = items.map((bs: any) => ({
        name: bs?.name,
        phone: bs?.phone,
        domain: bs?.primary_domain,
        linkedin: bs?.linkedin_url, }) ,);
      } else {
        dataToExport = items.map((ppl: any) => ({
        name: ppl?.name,
        email: ppl?.email,
        phone: ppl?.phone_numbers[0]?.raw_number,
        linkedin: ppl?.linkedin_url, }) ,);
      }
      // Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
      console.log(`Exported data to ${title}.xlsx`);
      setLoading(false);
    } else {
      setLoading(false);
      console.log("#==================Export Error")
    }
  } catch (error: any) {
    setLoading(false);
    console.log("#==================Export Error", error.message);

  }
};
