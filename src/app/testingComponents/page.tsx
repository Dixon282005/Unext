"use client"

import * as React from "react"

// Custom UI Primitives
import { PrimaryButton, SecondaryButton } from "@/app/components/ui/buttons"
import { GlassCard } from "@/app/components/ui/cards"
import { GlowBackground } from "@/app/components/ui/backgrounds"
import { SectionBadge, SectionHeading, SectionSubtitle } from "@/app/components/ui/section"
import { IconBox } from "@/app/components/ui/icons"
import { AnimatedCounter } from "@/app/components/ui/counter"
import { Zap, Users, Star, ArrowRight } from "lucide-react"

// Elements
import { Button } from "@/app/components/ui/elements/button"
import { Badge } from "@/app/components/ui/elements/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/elements/avatar"
import { Separator } from "@/app/components/ui/elements/separator"
import { Skeleton } from "@/app/components/ui/elements/skeleton"

// Layout
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/layout/card"
import { AspectRatio } from "@/app/components/ui/layout/aspect-ratio"
import { ScrollArea } from "@/app/components/ui/layout/scroll-area"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/app/components/ui/layout/resizable"

// Data Display
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/data-display/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/app/components/ui/data-display/collapsible"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/data-display/table"
import { Calendar } from "@/app/components/ui/data-display/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/components/ui/data-display/carousel"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/data-display/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/data-display/command"

// Forms
import { Input } from "@/app/components/ui/forms/input"
import { Checkbox } from "@/app/components/ui/forms/checkbox"
import { Label } from "@/app/components/ui/forms/label"
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/forms/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/forms/select"
import { Slider } from "@/app/components/ui/forms/slider"
import { Switch } from "@/app/components/ui/forms/switch"
import { Textarea } from "@/app/components/ui/forms/textarea"
import { Toggle } from "@/app/components/ui/forms/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/forms/toggle-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/forms/input-otp"

// Feedback
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/feedback/alert"
import { Progress } from "@/app/components/ui/feedback/progress"
import { Toaster } from "@/app/components/ui/feedback/sonner"
import { toast } from "sonner"

// Navigation
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/navigation/tabs"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/app/components/ui/navigation/breadcrumb"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/navigation/pagination"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/components/ui/navigation/sidebar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/app/components/ui/navigation/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation/navigation-menu"

// Overlays
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/overlays/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/overlays/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/app/components/ui/overlays/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/components/ui/overlays/sheet"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/components/ui/overlays/hover-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/components/ui/overlays/alert-dialog"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/app/components/ui/overlays/context-menu"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/overlays/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/overlays/dropdown-menu"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(212 95% 68%)",
  },
} satisfies ChartConfig

export default function DesignPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="p-8 space-y-16 max-w-7xl mx-auto pb-32">
      <Toaster />
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Design System Showcase</h1>
        <p className="text-muted-foreground text-lg">Every single UI component currently available in the project, organized and labeled.</p>
      </div>

     
      <section className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">¿Cómo funciona Storybook?</h2>
        <div className="space-y-3 text-blue-800">
          <p>
            <strong>Storybook</strong> es una herramienta para desarrollar componentes de UI en aislamiento. Funciona como una vitrina o laboratorio para tus componentes.
          </p>
          <ul className="list-disc ml-6 space-y-1">
            <li><strong>Desarrollo Aislado:</strong> Crea componentes sin depender de la lógica de la app.</li>
            <li><strong>Documentación Viva:</strong> Referencia visual para todo el equipo.</li>
            <li><strong>Pruebas Visuales:</strong> Detecta errores de diseño rápidamente.</li>
          </ul>
          <p className="mt-4 font-bold italic">
            Ejecutar: <code className="bg-blue-100 px-2 py-1 rounded">pnpm run storybook</code>
          </p>
        </div>
      </section>

      {/* ELEMENTS SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Elements</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader><CardTitle>Component: Button</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button onClick={() => toast("Hello!")}>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <button className= "group relative px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 overflow-hidden 'bg-white/5 border-2 border-purple-500/30 hover:border-purple-500/50 hover:bg-white/10">Hola</button>
                  
              
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Component: Badge</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Component: Avatar</CardTitle></CardHeader>
            <CardContent className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Component: Skeleton</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-4 w-[150px]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Component: Separator</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">Above Separator</div>
              <Separator />
              <div className="text-sm">Below Separator</div>
              <div className="flex h-5 items-center space-x-4 text-sm">
                <div>Left</div>
                <Separator orientation="vertical" />
                <div>Right</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FORMS SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Forms</h2>
          <Separator className="flex-1" />
        </div>
        <Card className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Component: Input + Label</Label>
                <Input placeholder="Type something..." />
              </div>
              <div className="space-y-2">
                <Label>Component: Textarea</Label>
                <Textarea placeholder="Type more text here..." />
              </div>
              <div className="space-y-2">
                <Label>Component: InputOTP</Label>
                <InputOTP maxLength={4}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Checkbox id="c1" />
                <Label htmlFor="c1" className="text-sm font-medium leading-none">Component: Checkbox</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="s1" />
                <Label htmlFor="s1">Component: Switch</Label>
              </div>
              <div className="space-y-2">
                <Label>Component: Toggle</Label>
                <div className="flex gap-2">
                  <Toggle variant="outline">On/Off</Toggle>
                  <Toggle aria-label="Toggle italic" variant="outline"><i>I</i></Toggle>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Component: ToggleGroup</Label>
                <ToggleGroup type="single" variant="outline">
                  <ToggleGroupItem value="a">A</ToggleGroupItem>
                  <ToggleGroupItem value="b">B</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Component: RadioGroup</Label>
                <RadioGroup defaultValue="r1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="r1" id="r1" />
                    <Label htmlFor="r1">Option R1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="r2" id="r2" />
                    <Label htmlFor="r2">Option R2</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Component: Select</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Pick an option" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                <Label>Component: Slider</Label>
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* DATA DISPLAY SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Data Display</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <CardTitle className="mb-4">Component: Chart</CardTitle>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(v) => v.slice(0, 3)} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </Card>

          <Card className="p-6">
            <CardTitle className="mb-4">Component: Calendar</CardTitle>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border mx-auto" />
          </Card>

          <Card className="p-6 col-span-full">
            <CardTitle className="mb-4 text-center">Component: Carousel</CardTitle>
            <Carousel className="w-full max-w-sm mx-auto">
              <CarouselContent>
                {[1, 2, 3].map((i) => (
                  <CarouselItem key={i}>
                    <div className="p-2">
                      <Card className="bg-slate-100"><CardContent className="flex aspect-video items-center justify-center p-6 text-2xl font-bold">Slide {i}</CardContent></Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </Card>

          <Card className="p-6">
            <CardTitle className="mb-4">Component: Accordion</CardTitle>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Show more info?</AccordionTrigger>
                <AccordionContent>This is the detailed content inside the accordion.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          <Card className="p-6">
            <CardTitle className="mb-4">Component: Table</CardTitle>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>001</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell className="text-right">$10.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          <div className="col-span-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <CardTitle className="mb-4 flex justify-between items-center">
                <span>Component: Collapsible</span>
                <Collapsible>
                  <CollapsibleTrigger asChild><Button variant="ghost" size="sm">Toggle</Button></CollapsibleTrigger>
                  <CollapsibleContent className="p-4 border rounded mt-2 text-sm">Collapsible text appears here.</CollapsibleContent>
                </Collapsible>
              </CardTitle>
            </Card>

            <Card className="p-6">
              <CardTitle className="mb-4 text-sm">Component: Command</CardTitle>
              <Command className="rounded-lg border shadow-sm">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results.</CommandEmpty>
                  <CommandGroup heading="Recent">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </Card>
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Feedback</h2>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6 space-y-4">
            <Label>Component: Alert</Label>
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your account has been updated.</AlertDescription>
            </Alert>
          </Card>
          <Card className="p-6 space-y-4">
            <Label>Component: Progress</Label>
            <Progress value={45} />
            <Button size="sm" onClick={() => toast("Toast Message!")}>Trigger Toast (Sonner)</Button>
          </Card>
        </div>
      </section>

      {/* NAVIGATION SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Navigation</h2>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-8">
          <Card className="p-6">
            <Label className="mb-4 block">Component: Tabs</Label>
            <Tabs defaultValue="t1" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                <TabsTrigger value="t1">Overview</TabsTrigger>
                <TabsTrigger value="t2">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="t1" className="p-4 border rounded-md mt-2">Overview Tab Content</TabsContent>
              <TabsContent value="t2" className="p-4 border rounded-md mt-2">Analytics Tab Content</TabsContent>
            </Tabs>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <Label>Component: Breadcrumb</Label>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem><BreadcrumbPage>Design System</BreadcrumbPage></BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </Card>

            <Card className="p-6 space-y-4">
              <Label>Component: Pagination</Label>
              <Pagination>
                <PaginationContent>
                  <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                  <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationNext href="#" /></PaginationItem>
                </PaginationContent>
              </Pagination>
            </Card>
          </div>

          <Card className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Component: Menubar</Label>
              <Menubar className="max-w-fit">
                <MenubarMenu>
                  <MenubarTrigger>Menu</MenubarTrigger>
                  <MenubarContent><MenubarItem>Item 1</MenubarItem></MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className="space-y-2">
              <Label>Component: NavigationMenu</Label>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Nav Item</NavigationMenuTrigger>
                    <NavigationMenuContent><ul className="p-4 w-[150px]">Link</ul></NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </Card>
        </div>
      </section>

      {/* OVERLAYS SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Overlays</h2>
          <Separator className="flex-1" />
        </div>
        <Card className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <Label className="text-xs">Dialog</Label>
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" size="sm" className="w-full">Dialog</Button></DialogTrigger>
                <DialogContent><DialogHeader><DialogTitle>Dialog Title</DialogTitle></DialogHeader></DialogContent>
              </Dialog>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Sheet</Label>
              <Sheet>
                <SheetTrigger asChild><Button variant="outline" size="sm" className="w-full">Sheet</Button></SheetTrigger>
                <SheetContent><SheetHeader><SheetTitle>Side Panel</SheetTitle></SheetHeader></SheetContent>
              </Sheet>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Popover</Label>
              <Popover>
                <PopoverTrigger asChild><Button variant="outline" size="sm" className="w-full">Popover</Button></PopoverTrigger>
                <PopoverContent className="text-sm p-4 w-48">Content overlay.</PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Tooltip</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild><Button variant="outline" size="sm" className="w-full">Tooltip</Button></TooltipTrigger>
                  <TooltipContent><p>Hi there!</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Drawer</Label>
              <Drawer>
                <DrawerTrigger asChild><Button variant="outline" size="sm" className="w-full">Drawer</Button></DrawerTrigger>
                <DrawerContent><DrawerHeader><DrawerTitle>Drawer Content</DrawerTitle></DrawerHeader></DrawerContent>
              </Drawer>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">AlertDialog</Label>
              <AlertDialog>
                <AlertDialogTrigger asChild><Button variant="outline" size="sm" className="w-full">Alert</Button></AlertDialogTrigger>
                <AlertDialogContent>
                   <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle></AlertDialogHeader>
                   <AlertDialogFooter><AlertDialogCancel>No</AlertDialogCancel><AlertDialogAction>Yes</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">HoverCard</Label>
              <HoverCard>
                <HoverCardTrigger asChild><Button variant="link" className="p-0 h-auto">@user</Button></HoverCardTrigger>
                <HoverCardContent className="w-64 text-sm">Profile preview on hover.</HoverCardContent>
              </HoverCard>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Dropdown</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="w-full">Menu</Button></DropdownMenuTrigger>
                <DropdownMenuContent><DropdownMenuItem>Item A</DropdownMenuItem></DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 col-span-2">
              <Label className="text-xs">ContextMenu</Label>
              <ContextMenu>
                <ContextMenuTrigger className="flex h-[40px] w-full items-center justify-center rounded-md border border-dashed text-xs italic bg-slate-50">
                  Right click here
                </ContextMenuTrigger>
                <ContextMenuContent><ContextMenuItem>Action 1</ContextMenuItem></ContextMenuContent>
              </ContextMenu>
            </div>
          </div>
        </Card>
      </section>

      {/* LAYOUT SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Layout & Structure</h2>
          <Separator className="flex-1" />
        </div>
        <div className="space-y-10">
          <Card className="p-8">
            <Label className="mb-4 block">Component: Resizable</Label>
            <ResizablePanelGroup direction="horizontal" className="min-h-[150px] w-full rounded-xl border bg-slate-50">
              <ResizablePanel defaultSize={30} className="flex items-center justify-center p-6"><span className="text-slate-400 font-bold">Panel A</span></ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={70} className="flex items-center justify-center p-6"><span className="text-slate-400 font-bold">Panel B</span></ResizablePanel>
            </ResizablePanelGroup>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <Card className="p-6 space-y-4">
              <Label>Component: ScrollArea</Label>
              <ScrollArea className="h-[150px] w-full border rounded-xl p-6 bg-slate-50 text-sm leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/><br/>
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. <br/><br/>
                Sed nisi. Nulla quis sem at nibh elementum imperdiet. <br/><br/>
                Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. 
              </ScrollArea>
            </Card>
            <Card className="p-6 space-y-4">
              <Label>Component: AspectRatio</Label>
              <div className="w-[300px] mx-auto">
                <AspectRatio ratio={16/9} className="bg-slate-200 rounded-xl overflow-hidden border border-slate-300">
                  <div className="flex items-center justify-center h-full text-slate-500 font-medium">16:9 Display</div>
                </AspectRatio>
              </div>
            </Card>
          </div>

          <Card className="p-6 border-2 border-dashed border-slate-200">
            <Label className="mb-6 block">Component: Sidebar (Preview)</Label>
            <div className="border rounded-xl overflow-hidden h-[450px] flex shadow-inner shadow-slate-200">
              <SidebarProvider>
                <Sidebar collapsible="none" className="border-r w-[240px]">
                  <SidebarHeader className="p-6 border-b"><span className="font-black text-xl tracking-tighter">APP LOGO</span></SidebarHeader>
                  <SidebarContent className="p-4">
                    <SidebarMenu>
                      <SidebarMenuItem><SidebarMenuButton isActive><b>Main Dashboard</b></SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>User Settings</SidebarMenuButton></SidebarMenuItem>
                      <SidebarMenuItem><SidebarMenuButton>System Logs</SidebarMenuButton></SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarContent>
                  <SidebarFooter className="p-6 border-t text-[10px] text-slate-400 font-mono">VERSION 0.1.0-ALFA</SidebarFooter>
                </Sidebar>
                <main className="flex-1 p-10 bg-white">
                  <SidebarTrigger className="mb-6" />
                  <div className="space-y-4 max-w-lg">
                    <h3 className="text-2xl font-bold">Sidebar Managed Area</h3>
                    <p className="text-slate-500 leading-relaxed">This container demonstrates how the Sidebar component interacts with the main content view using SidebarProvider.</p>
                  </div>
                </main>
              </SidebarProvider>
            </div>
          </Card>
        </div>
      </section>

      {/* ─── CUSTOM UI PRIMITIVES ─── */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Custom UI Primitives</h2>
          <Separator className="flex-1" />
        </div>
        <p className="text-muted-foreground">Primitivos propios del proyecto, organizados en <code className="bg-slate-100 px-1 rounded text-sm">components/ui/</code>. Usa el toggle para ver dark/light.</p>

        {/* Dark mode toggle for this section */}
        <PrimitivesPreview />
      </section>
    </div>
  )
}

// Separated component so it can hold its own isDark state
function PrimitivesPreview() {
  const [isDark, setIsDark] = React.useState(false)

  return (
    <div
      className={`rounded-3xl p-8 space-y-12 transition-all duration-500 ${
        isDark ? "bg-[#0A0A0A]" : "bg-gray-50"
      }`}
    >
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <span className={`text-sm font-mono ${ isDark ? "text-gray-400" : "text-gray-600" }`}>
          Vista actual: <strong>{isDark ? "dark" : "light"}</strong>
        </span>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isDark ? "bg-white text-black hover:bg-gray-100" : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          Cambiar a {isDark ? "Light" : "Dark"}
        </button>
      </div>

      {/* GlowBackground */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>GlowBackground</span>
        <div className="relative h-40 rounded-2xl overflow-hidden border border-dashed border-purple-300/50">
          <GlowBackground isDark={isDark} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-sm ${ isDark ? "text-gray-300" : "text-gray-600" }`}>Blobs animados detrás del contenido</span>
          </div>
        </div>
      </div>

      {/* GlassCard */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>GlassCard</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard isDark={isDark} className="p-6">
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>GlassCard default</p>
          </GlassCard>
          <GlassCard isDark={isDark} hoverable className="p-6">
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>GlassCard hoverable</p>
            <p className={`text-xs mt-1 ${ isDark ? "text-gray-500" : "text-gray-400" }`}>Pasa el cursor</p>
          </GlassCard>
          <GlassCard isDark={isDark} hoverable large className="p-6">
            <p className={isDark ? "text-gray-300" : "text-gray-700"}>GlassCard large + hoverable</p>
          </GlassCard>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>PrimaryButton / SecondaryButton</span>
        <div className="flex flex-wrap gap-4">
          <PrimaryButton>Comenzar ahora</PrimaryButton>
          <PrimaryButton>
            Con ícono <ArrowRight className="w-4 h-4" />
          </PrimaryButton>
          <SecondaryButton isDark={isDark}>Ghost / Borde</SecondaryButton>
          <SecondaryButton isDark={isDark}>
            Con ícono <Star className="w-4 h-4" />
          </SecondaryButton>
        </div>
      </div>

      {/* SectionBadge */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>SectionBadge</span>
        <div className="flex flex-wrap gap-3">
          <SectionBadge isDark={isDark}>Plataforma #1</SectionBadge>
          <SectionBadge isDark={isDark}>Nuevo en 2025</SectionBadge>
          <SectionBadge isDark={isDark}>⚡ IA de Matching</SectionBadge>
        </div>
      </div>

      {/* SectionHeading + SectionSubtitle */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>SectionHeading + SectionSubtitle</span>
        <GlassCard isDark={isDark} className="p-6 space-y-3">
          <SectionHeading isDark={isDark} accentText="Unext">Por qué elegir{" "}</SectionHeading>
          <SectionHeading isDark={isDark} accentText="real" accentPosition="after">Impacto{" "}</SectionHeading>
          <SectionSubtitle isDark={isDark}>Subtítulo muted para acompañar el heading</SectionSubtitle>
        </GlassCard>
      </div>

      {/* IconBox */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>IconBox (variant × size)</span>
        <div className="flex flex-wrap items-end gap-6">
          {/* contrast (default) */}
          <div className="group space-y-2 text-center">
            <IconBox isDark={isDark} icon={<Zap />} size="sm" variant="contrast" />
            <span className={`text-xs block ${ isDark ? "text-gray-500" : "text-gray-400" }`}>contrast sm</span>
          </div>
          <div className="group space-y-2 text-center">
            <IconBox isDark={isDark} icon={<Users />} size="md" variant="contrast" />
            <span className={`text-xs block ${ isDark ? "text-gray-500" : "text-gray-400" }`}>contrast md</span>
          </div>
          <div className="group space-y-2 text-center">
            <IconBox isDark={isDark} icon={<Star />} size="lg" variant="contrast" />
            <span className={`text-xs block ${ isDark ? "text-gray-500" : "text-gray-400" }`}>contrast lg</span>
          </div>
          {/* accent */}
          <div className="group space-y-2 text-center">
            <IconBox isDark={isDark} icon={<Zap />} size="sm" variant="accent" />
            <span className={`text-xs block ${ isDark ? "text-gray-500" : "text-gray-400" }`}>accent sm</span>
          </div>
          <div className="group space-y-2 text-center">
            <IconBox isDark={isDark} icon={<Users />} size="md" variant="accent" />
            <span className={`text-xs block ${ isDark ? "text-gray-500" : "text-gray-400" }`}>accent md</span>
          </div>
          <div className="group space-y-2 text-center">
            <IconBox isDark={isDark} icon={<Star />} size="lg" variant="accent" />
            <span className={`text-xs block ${ isDark ? "text-gray-500" : "text-gray-400" }`}>accent lg</span>
          </div>
        </div>
        <p className={`text-xs ${ isDark ? "text-gray-600" : "text-gray-400" }`}>Agrega la clase <code>group</code> al padre para activar el efecto hover en contrast.</p>
      </div>

      {/* AnimatedCounter */}
      <div className="space-y-3">
        <span className={`text-xs font-mono uppercase tracking-widest ${ isDark ? "text-gray-500" : "text-gray-400" }`}>AnimatedCounter (cuenta al entrar al viewport)</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { target: 12000, suffix: "+", label: "Estudiantes" },
            { target: 2500,  suffix: "+", label: "Empresas",   duration: 2500 },
            { target: 8000,  suffix: "+", label: "Contrataciones" },
            { target: 95,    suffix: "%", label: "Satisfacción" },
          ].map((s, i) => (
            <GlassCard key={i} isDark={isDark} className="p-6 text-center">
              <div className={`text-4xl mb-1 ${ isDark ? "text-white" : "text-[#0A0A0A]" }`}>
                <AnimatedCounter target={s.target} suffix={s.suffix} duration={s.duration} />
              </div>
              <div className={`text-sm ${ isDark ? "text-gray-400" : "text-gray-600" }`}>{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}