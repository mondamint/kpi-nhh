import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Save, FileText, Target, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DataEntry = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");

  // Mock data สำหรับ KPI ที่ต้องกรอก
  const assignedKPIs = [
    {
      id: 1,
      name: "อัตราการรอคิวผู้ป่วยนอก",
      description: "ระยะเวลาเฉลี่ยที่ผู้ป่วยต้องรอคิวเพื่อพบแพทย์",
      unit: "นาที",
      target: "15",
      frequency: "monthly",
      department: "ผู้ป่วยนอก",
      status: "pending",
      lastValue: "12",
      dueDate: "2024-02-05"
    },
    {
      id: 2,
      name: "ร้อยละความพึงพอใจของผู้ป่วย",
      description: "ระดับความพึงพอใจของผู้ป่วยต่อบริการรักษา",
      unit: "%",
      target: "95",
      frequency: "monthly",
      department: "ทุกแผนก",
      status: "draft",
      lastValue: "94",
      dueDate: "2024-02-05"
    },
    {
      id: 3,
      name: "จำนวนยาคงคลังหมดอายุ",
      description: "จำนวนยาที่หมดอายุในแต่ละเดือน",
      unit: "รายการ",
      target: "5",
      frequency: "monthly",
      department: "เภสัชกรรม",
      status: "completed",
      lastValue: "3",
      dueDate: "2024-02-05"
    }
  ];

  const [kpiValues, setKpiValues] = useState<Record<number, { value: string; note: string }>>({});

  const months = [
    { value: "01", label: "มกราคม" },
    { value: "02", label: "กุมภาพันธ์" },
    { value: "03", label: "มีนาคม" },
    { value: "04", label: "เมษายน" },
    { value: "05", label: "พฤษภาคม" },
    { value: "06", label: "มิถุนายน" },
    { value: "07", label: "กรกฎาคม" },
    { value: "08", label: "สิงหาคม" },
    { value: "09", label: "กันยายน" },
    { value: "10", label: "ตุลาคม" },
    { value: "11", label: "พฤศจิกายน" },
    { value: "12", label: "ธันวาคม" }
  ];

  const years = ["2024", "2023", "2022"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "เสร็จสิ้น";
      case "draft":
        return "ร่าง";
      case "pending":
        return "รอดำเนินการ";
      default:
        return "ไม่ทราบสถานะ";
    }
  };

  const handleInputChange = (kpiId: number, field: 'value' | 'note', value: string) => {
    setKpiValues(prev => ({
      ...prev,
      [kpiId]: {
        ...prev[kpiId],
        [field]: value
      }
    }));
  };

  const handleSaveDraft = (kpiId: number) => {
    toast({
      title: "บันทึกร่างสำเร็จ",
      description: "ข้อมูลถูกบันทึกเป็นร่างแล้ว สามารถกลับมาแก้ไขได้",
    });
  };

  const handleSubmit = (kpiId: number) => {
    toast({
      title: "ส่งข้อมูลสำเร็จ",
      description: "ข้อมูล KPI ถูกส่งเรียบร้อยแล้ว",
    });
  };

  const pendingKPIs = assignedKPIs.filter(kpi => kpi.status === "pending" || kpi.status === "draft");
  const completedKPIs = assignedKPIs.filter(kpi => kpi.status === "completed");

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">กรอกข้อมูล KPI</h1>
          <p className="text-muted-foreground mt-1">บันทึกผลการดำเนินงานตัวชี้วัดประจำเดือน</p>
        </div>

        {/* Period Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              เลือกช่วงเวลา
            </CardTitle>
            <CardDescription>
              เลือกเดือนและปีที่ต้องการกรอกข้อมูล KPI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>เดือน</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกเดือน" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ปี</Label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกปี" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {parseInt(year) + 543}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button className="w-full" disabled={!selectedMonth || !selectedYear}>
                  โหลดข้อมูล KPI
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending KPIs */}
        {pendingKPIs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                KPI ที่ต้องกรอกข้อมูล
                <Badge variant="outline">{pendingKPIs.length} รายการ</Badge>
              </CardTitle>
              <CardDescription>
                KPI ที่ยังไม่เสร็จสิ้น หรืออยู่ในสถานะร่าง
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {pendingKPIs.map((kpi) => (
                <div key={kpi.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">{kpi.name}</h3>
                        <Badge variant="outline" className={getStatusColor(kpi.status)}>
                          {getStatusText(kpi.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{kpi.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span>เป้าหมาย: <span className="font-medium">{kpi.target} {kpi.unit}</span></span>
                        <span>ค่าล่าสุด: <span className="font-medium">{kpi.lastValue} {kpi.unit}</span></span>
                        <span>กำหนดส่ง: <span className="font-medium">{new Date(kpi.dueDate).toLocaleDateString('th-TH')}</span></span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`value-${kpi.id}`}>ผลลัพธ์ ({kpi.unit})</Label>
                      <Input
                        id={`value-${kpi.id}`}
                        type="number"
                        placeholder={`เช่น ${kpi.lastValue}`}
                        value={kpiValues[kpi.id]?.value || ""}
                        onChange={(e) => handleInputChange(kpi.id, 'value', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`note-${kpi.id}`}>หมายเหตุ (ไม่บังคับ)</Label>
                      <Textarea
                        id={`note-${kpi.id}`}
                        placeholder="อธิบายปัจจัยที่ส่งผลต่อผลลัพธ์..."
                        value={kpiValues[kpi.id]?.note || ""}
                        onChange={(e) => handleInputChange(kpi.id, 'note', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSaveDraft(kpi.id)}
                      disabled={!kpiValues[kpi.id]?.value}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      บันทึกร่าง
                    </Button>
                    <Button
                      onClick={() => handleSubmit(kpi.id)}
                      disabled={!kpiValues[kpi.id]?.value}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      ส่งข้อมูล
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Completed KPIs */}
        {completedKPIs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                KPI ที่เสร็จสิ้นแล้ว
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  {completedKPIs.length} รายการ
                </Badge>
              </CardTitle>
              <CardDescription>
                KPI ที่ได้ส่งข้อมูลเรียบร้อยแล้ว
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedKPIs.map((kpi) => (
                  <div key={kpi.id} className="flex items-center justify-between p-4 border rounded-lg bg-green-50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{kpi.name}</h3>
                        <Badge variant="outline" className={getStatusColor(kpi.status)}>
                          {getStatusText(kpi.status)}
                        </Badge>
                      </div>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>ผลลัพธ์: <span className="font-medium">{kpi.lastValue} {kpi.unit}</span></span>
                        <span>เป้าหมาย: <span className="font-medium">{kpi.target} {kpi.unit}</span></span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      ดูรายละเอียด
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {assignedKPIs.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">ไม่มี KPI ที่ต้องกรอกข้อมูล</h3>
              <p className="text-muted-foreground">ไม่พบ KPI ที่ได้รับมอบหมายในช่วงเวลานี้</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DataEntry;