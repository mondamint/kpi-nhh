import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, BarChart3, PieChart as PieChartIcon, Download, Filter } from "lucide-react";

const Reports = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  // Mock data for charts
  const monthlyData = [
    { month: "ก.ค.", achieved: 18, total: 24, percentage: 75 },
    { month: "ส.ค.", achieved: 20, total: 24, percentage: 83 },
    { month: "ก.ย.", achieved: 19, total: 24, percentage: 79 },
    { month: "ต.ค.", achieved: 22, total: 24, percentage: 92 },
    { month: "พ.ย.", achieved: 21, total: 24, percentage: 88 },
    { month: "ธ.ค.", achieved: 23, total: 24, percentage: 96 }
  ];

  const departmentData = [
    { name: "ผู้ป่วยนอก", achieved: 8, total: 10, percentage: 80 },
    { name: "ผู้ป่วยใน", achieved: 6, total: 8, percentage: 75 },
    { name: "ฉุกเฉิน", achieved: 4, total: 5, percentage: 80 },
    { name: "เภสัชกรรม", achieved: 3, total: 4, percentage: 75 },
    { name: "ห้องปฏิบัติการ", achieved: 5, total: 6, percentage: 83 },
    { name: "ควบคุมการติดเชื้อ", achieved: 2, total: 3, percentage: 67 }
  ];

  const categoryPieData = [
    { name: "คุณภาพ", value: 12, color: "#0ea5e9" },
    { name: "ประสิทธิภาพ", value: 8, color: "#10b981" },
    { name: "ความปลอดภัย", value: 6, color: "#f59e0b" },
    { name: "การเงิน", value: 3, color: "#ef4444" }
  ];

  const kpiTrendData = [
    { month: "ก.ค.", "อัตราการรอคิว": 14, "ความพึงพอใจ": 92, "ยาหมดอายุ": 8 },
    { month: "ส.ค.", "อัตราการรอคิว": 13, "ความพึงพอใจ": 94, "ยาหมดอายุ": 6 },
    { month: "ก.ย.", "อัตราการรอคิว": 15, "ความพึงพอใจ": 93, "ยาหมดอายุ": 7 },
    { month: "ต.ค.", "อัตราการรอคิว": 12, "ความพึงพอใจ": 95, "ยาหมดอายุ": 5 },
    { month: "พ.ย.", "อัตราการรอคิว": 11, "ความพึงพอใจ": 96, "ยาหมดอายุ": 4 },
    { month: "ธ.ค.", "อัตราการรอคิว": 10, "ความพึงพอใจ": 97, "ยาหมดอายุ": 3 }
  ];

  const topKPIs = [
    { name: "ร้อยละความพึงพอใจของผู้ป่วย", current: 97, target: 95, trend: "up", department: "ทุกแผนก" },
    { name: "เวลาตอบสนองฉุกเฉิน", current: 8, target: 10, trend: "up", department: "ฉุกเฉิน" },
    { name: "อัตราการรอคิวผู้ป่วยนอก", current: 10, target: 15, trend: "up", department: "ผู้ป่วยนอก" },
    { name: "จำนวนยาคงคลังหมดอายุ", current: 3, target: 5, trend: "up", department: "เภสัชกรรม" }
  ];

  const worstKPIs = [
    { name: "อัตราการติดเชื้อในโรงพยาบาล", current: 2.8, target: 2.0, trend: "down", department: "ควบคุมการติดเชื้อ" },
    { name: "เวลารอผลแลป", current: 45, target: 30, trend: "down", department: "ห้องปฏิบัติการ" }
  ];

  const departments = ["ทุกแผนก", "ผู้ป่วยนอก", "ผู้ป่วยใน", "ฉุกเฉิน", "เภสัชกรรม", "ห้องปฏิบัติการ"];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">รายงาน KPI</h1>
            <p className="text-muted-foreground mt-1">วิเคราะห์ผลการดำเนินงานและแนวโน้มตัวชี้วัด</p>
          </div>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            ส่งออกรายงาน
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              ตัวกรองรายงาน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">แผนก</label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกแผนก</SelectItem>
                    {departments.slice(1).map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">ช่วงเวลา</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 เดือนล่าสุด</SelectItem>
                    <SelectItem value="6months">6 เดือนล่าสุด</SelectItem>
                    <SelectItem value="12months">12 เดือนล่าสุด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  ปรับปรุงรายงาน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="trends">แนวโน้ม</TabsTrigger>
            <TabsTrigger value="departments">รายแผนก</TabsTrigger>
            <TabsTrigger value="categories">หมวดหมู่</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">การบรรลุเป้าหมายรวม</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">88%</div>
                  <p className="text-xs text-muted-foreground">21 จาก 24 KPI</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">แนวโน้มเดือนนี้</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">+8%</div>
                  <p className="text-xs text-muted-foreground">เพิ่มขึ้นจากเดือนก่อน</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">แผนกที่ดีที่สุด</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">ห้องปฏิบัติการ</div>
                  <p className="text-xs text-muted-foreground">83% การบรรลุเป้าหมาย</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Overview Chart */}
            <Card>
              <CardHeader>
                <CardTitle>แนวโน้มการบรรลุเป้าหมาย 6 เดือนล่าสุด</CardTitle>
                <CardDescription>เปอร์เซ็นต์ KPI ที่บรรลุเป้าหมายในแต่ละเดือน</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="percentage" 
                      stroke="#0ea5e9" 
                      strokeWidth={3}
                      dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top and Bottom Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    KPI ที่ดีที่สุด
                  </CardTitle>
                  <CardDescription>KPI ที่มีผลงานเกินเป้าหมาย</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topKPIs.map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{kpi.name}</h4>
                        <p className="text-xs text-muted-foreground">{kpi.department}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-green-600">{kpi.current}</div>
                        <div className="text-xs text-muted-foreground">เป้า: {kpi.target}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5 text-red-600" />
                    KPI ที่ต้องปรับปรุง
                  </CardTitle>
                  <CardDescription>KPI ที่ยังไม่บรรลุเป้าหมาย</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {worstKPIs.map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{kpi.name}</h4>
                        <p className="text-xs text-muted-foreground">{kpi.department}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-red-600">{kpi.current}</div>
                        <div className="text-xs text-muted-foreground">เป้า: {kpi.target}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>แนวโน้ม KPI สำคัญ</CardTitle>
                <CardDescription>การเปลี่ยนแปลงของ KPI หลักในช่วง 6 เดือนที่ผ่านมา</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={kpiTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="อัตราการรอคิว" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="ความพึงพอใจ" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="ยาหมดอายุ" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ผลงานรายแผนก</CardTitle>
                <CardDescription>เปรียบเทียบการบรรลุเป้าหมายของแต่ละแผนก</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="percentage" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5" />
                    การกระจาย KPI ตามหมวดหมู่
                  </CardTitle>
                  <CardDescription>จำนวน KPI ในแต่ละหมวดหมู่</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryPieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สรุปตามหมวดหมู่</CardTitle>
                  <CardDescription>รายละเอียดการจัดหมวดหมู่ KPI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryPieData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge variant="outline">{category.value} KPI</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;