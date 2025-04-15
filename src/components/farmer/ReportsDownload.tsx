
import { useState } from 'react';
import { DownloadCloud, FileText, FileBarChart2, Calendar, FileSpreadsheet, Filter, ArrowDown, ChevronDown, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

interface Report {
  id: string;
  name: string;
  type: 'sales' | 'inventory' | 'finance' | 'customer';
  format: 'csv' | 'pdf' | 'xlsx';
  dateRange: string;
  description: string;
  created: Date;
  size: string;
}

// Mock reports data
const mockReports: Report[] = [
  {
    id: 'rep1',
    name: 'Sales Summary - Last Week',
    type: 'sales',
    format: 'csv',
    dateRange: 'Jun 3 - Jun 10, 2023',
    description: 'Weekly sales report showing revenue, products sold, and top selling items.',
    created: new Date('2023-06-10T15:25:00'),
    size: '245 KB',
  },
  {
    id: 'rep2',
    name: 'Inventory Status',
    type: 'inventory',
    format: 'xlsx',
    dateRange: 'As of Jun 10, 2023',
    description: 'Current inventory levels, including low stock and out of stock items.',
    created: new Date('2023-06-10T14:30:00'),
    size: '312 KB',
  },
  {
    id: 'rep3',
    name: 'Monthly Revenue - May 2023',
    type: 'finance',
    format: 'pdf',
    dateRange: 'May 1 - May 31, 2023',
    description: 'Monthly financial summary with revenue, expenses, and profit analysis.',
    created: new Date('2023-06-05T11:15:00'),
    size: '478 KB',
  },
  {
    id: 'rep4',
    name: 'Customer Analysis',
    type: 'customer',
    format: 'pdf',
    dateRange: 'Jan 1 - Jun 10, 2023',
    description: 'Customer demographics, order frequency, and buying patterns.',
    created: new Date('2023-06-08T09:45:00'),
    size: '623 KB',
  },
  {
    id: 'rep5',
    name: 'Product Performance',
    type: 'sales',
    format: 'xlsx',
    dateRange: 'Q2 2023',
    description: 'Detailed analysis of product performance, including sales volume and revenue.',
    created: new Date('2023-06-09T16:20:00'),
    size: '385 KB',
  },
  {
    id: 'rep6',
    name: 'Inventory Movement',
    type: 'inventory',
    format: 'csv',
    dateRange: 'Apr 1 - Jun 1, 2023',
    description: 'Tracks inventory changes, including sales, restocks, and adjustments.',
    created: new Date('2023-06-07T13:10:00'),
    size: '274 KB',
  },
];

const formSchema = z.object({
  reportName: z.string().min(2, { message: 'Report name is required.' }),
  reportType: z.string(),
  format: z.enum(['csv', 'pdf', 'xlsx']),
  dateFrom: z.string(),
  dateTo: z.string(),
  includeDetails: z.boolean().default(true),
});

type CustomReportFormValues = z.infer<typeof formSchema>;

const ReportsDownload = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  // Filter reports based on active tab
  const filteredReports = reports.filter(report => {
    if (activeTab === 'all') return true;
    return report.type === activeTab;
  });

  // Sort reports based on sort criteria
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'desc'
        ? b.created.getTime() - a.created.getTime()
        : a.created.getTime() - b.created.getTime();
    } else if (sortBy === 'name') {
      return sortOrder === 'desc'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    } else if (sortBy === 'type') {
      return sortOrder === 'desc'
        ? b.type.localeCompare(a.type)
        : a.type.localeCompare(b.type);
    }
    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  const handleDownload = (report: Report) => {
    toast({
      title: "Report downloading",
      description: `${report.name} is being downloaded.`,
    });
  };

  const getReportTypeIcon = (type: string) => {
    switch (type) {
      case 'sales':
        return <FileBarChart2 className="h-5 w-5 text-blue-500" />;
      case 'inventory':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case 'finance':
        return <FileText className="h-5 w-5 text-amber-500" />;
      case 'customer':
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFormatBadge = (format: string) => {
    switch (format) {
      case 'csv':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">CSV</Badge>;
      case 'pdf':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">PDF</Badge>;
      case 'xlsx':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Excel</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const form = useForm<CustomReportFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: '',
      reportType: 'sales',
      format: 'csv',
      dateFrom: new Date().toISOString().split('T')[0],
      dateTo: new Date().toISOString().split('T')[0],
      includeDetails: true,
    },
  });

  const onSubmit = (values: CustomReportFormValues) => {
    const newReport: Report = {
      id: `rep${Date.now()}`,
      name: values.reportName,
      type: values.reportType as any,
      format: values.format,
      dateRange: `${values.dateFrom} - ${values.dateTo}`,
      description: 'Custom report generated with selected parameters.',
      created: new Date(),
      size: `${Math.floor(Math.random() * 500) + 100} KB`,
    };

    setReports([newReport, ...reports]);

    toast({
      title: "Report generated",
      description: "Your custom report has been created and is ready to download.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Reports & Analytics</CardTitle>
              <CardDescription>
                Generate and download reports for your farm business
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-market-primary hover:bg-market-primary/90">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Generate Custom Report</DialogTitle>
                  <DialogDescription>
                    Create a custom report with specific parameters.
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <FormField
                      control={form.control}
                      name="reportName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Report Name</FormLabel>
                          <FormControl>
                            <input
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Enter report name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="reportType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Report Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sales">Sales</SelectItem>
                                <SelectItem value="inventory">Inventory</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="customer">Customer</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="format"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>File Format</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="csv">CSV</SelectItem>
                                <SelectItem value="pdf">PDF</SelectItem>
                                <SelectItem value="xlsx">Excel</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="dateFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date From</FormLabel>
                            <FormControl>
                              <input
                                type="date"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date To</FormLabel>
                            <FormControl>
                              <input
                                type="date"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="includeDetails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-market-primary focus:ring-market-primary"
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Include Detailed Breakdown</FormLabel>
                            <FormDescription>
                              Include more detailed information in the report.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit" className="mt-4">
                        Generate Report
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
              <TabsList>
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="icon" onClick={toggleSortOrder}>
                  <ArrowDown className={`h-4 w-4 ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReports.length > 0 ? (
                    sortedReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>
                          <Collapsible>
                            <div className="flex items-center">
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                                  <ChevronDown className="h-4 w-4 mr-2" />
                                </Button>
                              </CollapsibleTrigger>
                              <span className="font-medium">{report.name}</span>
                            </div>
                            <CollapsibleContent className="pt-2">
                              <p className="text-sm text-gray-500 pl-6">{report.description}</p>
                            </CollapsibleContent>
                          </Collapsible>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getReportTypeIcon(report.type)}
                            <span className="ml-2 capitalize">{report.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>{report.dateRange}</TableCell>
                        <TableCell>{getFormatBadge(report.format)}</TableCell>
                        <TableCell>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(report.created).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex items-center"
                            onClick={() => handleDownload(report)}
                          >
                            <DownloadCloud className="h-4 w-4 mr-2" />
                            Download
                            <span className="ml-2 text-xs text-gray-500">{report.size}</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No reports found. Generate a new report to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsDownload;
