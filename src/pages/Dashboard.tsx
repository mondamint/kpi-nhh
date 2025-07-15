import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Target, TrendingUp, Users, AlertTriangle, CheckCircle } from "lucide-react";

const Dashboard = () => {
  // Mock data สำหรับ KPI
  const kpiSummary = {
    total: 24,
    achieved: 18,
    warning: 4,
    failed: 2
  };

  const recentKPIs = [
    {
      id: 1,
      name: "อัตราการรอคิวผู้ป่วยนอก",
      value: "12",
      target: "15",
      unit: "นาที",
      status: "achieved",
      department: "แผนกผู้ป่วยนอก",
      progress: 80
    },
    {
      id: 2,
      name: "ร้อยละความพึงพอใจของผู้ป่วย",
      value: "94",
      target: "95",
      unit: "%",
      status: "warning",
      department: "ทุกแผนก",
      progress: 99
    },
    {
      id: 3,
      name: "จำนวนยาคงคลังหมดอายุ",
      value: "8",
      target: "5",
      unit: "รายการ",
      status: "failed",
      department: "แผนกเภสัชกรรม",
      progress: 160
    },
    {
      id: 4,
      name: "อัตราการติดเชื้อในโรงพยาบาล",
      value: "1.2",
      target: "2.0",
      unit: "%",
      status: "achieved",
      department: "แผนกควบคุมการติดเชื้อ",
      progress: 60
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "achieved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "achieved":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "achieved":
        return "บรรลุเป้าหมาย";
      case "warning":
        return "ใกล้เป้าหมาย";
      case "failed":
        return "ไม่บรรลุเป้าหมาย";
      default:
        return "ไม่ทราบสถานะ";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">KPI-NHH</h1>
          <p className="text-lg text-muted-foreground">ระบบติดตาม KPI โรงพยาบาลหนองหิน จังหวัดเลย</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">KPI ทั้งหมด</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{kpiSummary.total}</div>
              <p className="text-xs text-muted-foreground">ตัวชี้วัดทั้งหมด</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">บรรลุเป้าหมาย</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{kpiSummary.achieved}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((kpiSummary.achieved / kpiSummary.total) * 100)}% ของทั้งหมด
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ต้องติดตาม</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{kpiSummary.warning}</div>
              <p className="text-xs text-muted-foreground">ใกล้เป้าหมาย</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ต้องปรับปรุง</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{kpiSummary.failed}</div>
              <p className="text-xs text-muted-foreground">ไม่บรรลุเป้าหมาย</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent KPIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              KPI ล่าสุด
            </CardTitle>
            <CardDescription>
              ตัวชี้วัดที่มีการอัปเดตล่าสุด
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentKPIs.map((kpi) => (
                <div key={kpi.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(kpi.status)}
                      <h3 className="font-medium">{kpi.name}</h3>
                      <Badge variant="outline" className={getStatusColor(kpi.status)}>
                        {getStatusText(kpi.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{kpi.department}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm">
                        ผลลัพธ์: <span className="font-semibold">{kpi.value} {kpi.unit}</span>
                      </span>
                      <span className="text-sm">
                        เป้าหมาย: <span className="font-semibold">{kpi.target} {kpi.unit}</span>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      kpi.status === 'achieved' ? 'text-green-600' :
                      kpi.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {kpi.progress}%
                    </div>
                    <div className="text-xs text-muted-foreground">ของเป้าหมาย</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>การดำเนินการด่วน</CardTitle>
            <CardDescription>
              ลิงก์ด่วนสำหรับการจัดการ KPI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <Users className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">กรอกข้อมูล KPI</h3>
                <p className="text-sm text-muted-foreground">บันทึกผลการดำเนินงานประจำเดือน</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <Target className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">จัดการ KPI</h3>
                <p className="text-sm text-muted-foreground">เพิ่ม แก้ไข หรือปรับปรุงตัวชี้วัด</p>
              </div>
              <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium mb-1">ดูรายงาน</h3>
                <p className="text-sm text-muted-foreground">วิเคราะห์ข้อมูลและแนวโน้ม</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;