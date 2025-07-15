import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Eye, Trash2, Target, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KPIManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data สำหรับ KPI
  const kpiList = [
    {
      id: 1,
      name: "อัตราการรอคิวผู้ป่วยนอก",
      description: "ระยะเวลาเฉลี่ยที่ผู้ป่วยต้องรอคิวเพื่อพบแพทย์",
      unit: "นาที",
      target: "15",
      frequency: "monthly",
      department: "ผู้ป่วยนอก",
      category: "ประสิทธิภาพ",
      status: "active",
      createdDate: "2024-01-15"
    },
    {
      id: 2,
      name: "ร้อยละความพึงพอใจของผู้ป่วย",
      description: "ระดับความพึงพอใจของผู้ป่วยต่อบริการรักษา",
      unit: "%",
      target: "95",
      frequency: "monthly",
      department: "ทุกแผนก",
      category: "คุณภาพ",
      status: "active",
      createdDate: "2024-01-10"
    },
    {
      id: 3,
      name: "จำนวนยาคงคลังหมดอายุ",
      description: "จำนวนยาที่หมดอายุในแต่ละเดือน",
      unit: "รายการ",
      target: "5",
      frequency: "monthly",
      department: "เภสัชกรรม",
      category: "คุณภาพ",
      status: "active",
      createdDate: "2024-01-08"
    },
    {
      id: 4,
      name: "อัตราการติดเชื้อในโรงพยาบาล",
      description: "อัตราส่วนผู้ป่วยที่ติดเชื้อระหว่างรักษาตัวในโรงพยาบาล",
      unit: "%",
      target: "2.0",
      frequency: "monthly",
      department: "ควบคุมการติดเชื้อ",
      category: "ความปลอดภัย",
      status: "active",
      createdDate: "2024-01-05"
    },
    {
      id: 5,
      name: "เวลาตอบสนองฉุกเฉิน",
      description: "เวลาเฉลี่ยในการตอบสนองผู้ป่วยฉุกเฉิน",
      unit: "นาที",
      target: "10",
      frequency: "monthly",
      department: "ฉุกเฉิน",
      category: "ประสิทธิภาพ",
      status: "inactive",
      createdDate: "2024-01-03"
    }
  ];

  const departments = ["ทุกแผนก", "ผู้ป่วยนอก", "ผู้ป่วยใน", "ฉุกเฉิน", "เภสัชกรรม", "ควบคุมการติดเชื้อ", "ห้องปฏิบัติการ"];
  const categories = ["คุณภาพ", "ประสิทธิภาพ", "ความปลอดภัย", "การเงิน"];
  const frequencies = ["monthly", "quarterly", "yearly"];

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "monthly":
        return "รายเดือน";
      case "quarterly":
        return "รายไตรมาส";
      case "yearly":
        return "รายปี";
      default:
        return frequency;
    }
  };

  const filteredKPIs = kpiList.filter(kpi => {
    const matchesSearch = kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         kpi.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || kpi.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleCreateKPI = () => {
    toast({
      title: "สร้าง KPI สำเร็จ",
      description: "ตัวชี้วัดใหม่ถูกเพิ่มเข้าสู่ระบบแล้ว",
    });
    setIsCreateDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">จัดการ KPI</h1>
            <p className="text-muted-foreground mt-1">จัดการตัวชี้วัดและเป้าหมายของโรงพยาบาล</p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                เพิ่ม KPI ใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>เพิ่ม KPI ใหม่</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลตัวชี้วัดใหม่ที่ต้องการติดตาม
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="kpi-name">ชื่อ KPI</Label>
                  <Input id="kpi-name" placeholder="เช่น อัตราการรอคิวผู้ป่วยนอก" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="kpi-description">คำอธิบาย</Label>
                  <Textarea id="kpi-description" placeholder="รายละเอียดของ KPI และวิธีการคำนวณ" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="kpi-unit">หน่วยนับ</Label>
                    <Input id="kpi-unit" placeholder="เช่น นาที, %, คน" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kpi-target">เป้าหมาย</Label>
                    <Input id="kpi-target" placeholder="เช่น 15, 95" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>ความถี่ในการติดตาม</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกความถี่" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">รายเดือน</SelectItem>
                        <SelectItem value="quarterly">รายไตรมาส</SelectItem>
                        <SelectItem value="yearly">รายปี</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>แผนกที่รับผิดชอบ</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกแผนก" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>หมวดหมู่ KPI</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button onClick={handleCreateKPI}>
                    สร้าง KPI
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">ตัวกรองข้อมูล</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="search">ค้นหา KPI</Label>
                <Input
                  id="search"
                  placeholder="ค้นหาชื่อหรือคำอธิบาย KPI..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-48">
                <Label>แผนก</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทุกแผนก</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI List */}
        <div className="grid gap-4">
          {filteredKPIs.map((kpi) => (
            <Card key={kpi.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-medium">{kpi.name}</h3>
                      <Badge variant={kpi.status === 'active' ? 'default' : 'secondary'}>
                        {kpi.status === 'active' ? 'ใช้งาน' : 'ปิดใช้งาน'}
                      </Badge>
                      <Badge variant="outline">{kpi.category}</Badge>
                    </div>
                    
                    <p className="text-muted-foreground">{kpi.description}</p>
                    
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        <span>แผนก: {kpi.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        <span>เป้าหมาย: {kpi.target} {kpi.unit}</span>
                      </div>
                      <div>
                        <span>ความถี่: {getFrequencyText(kpi.frequency)}</span>
                      </div>
                      <div>
                        <span>สร้างเมื่อ: {new Date(kpi.createdDate).toLocaleDateString('th-TH')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredKPIs.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">ไม่พบ KPI</h3>
              <p className="text-muted-foreground">ไม่พบตัวชี้วัดที่ตรงกับเงื่อนไขการค้นหา</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default KPIManagement;