import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Download } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-primary">ตั้งค่าระบบ</h1>
          <p className="text-muted-foreground mt-1">จัดการการตั้งค่าและการกำหนดสิทธิ์ของระบบ</p>
        </div>

        {/* User Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              ข้อมูลผู้ใช้งาน
            </CardTitle>
            <CardDescription>
              จัดการข้อมูลส่วนตัวและการเข้าสู่ระบบ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">ชื่อ</Label>
                <Input id="firstname" value="นางสาวพิมพ์" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">นามสกุล</Label>
                <Input id="lastname" value="แก้วใส" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input id="email" type="email" value="pim.kaewsai@nhhospital.go.th" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">แผนกที่สังกัด</Label>
              <Input id="department" value="แผนกเภสัชกรรม" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">ตำแหน่ง</Label>
              <Input id="position" value="เภสัชกร" />
            </div>
            <div className="flex justify-end">
              <Button>บันทึกการเปลี่ยนแปลง</Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              การแจ้งเตือน
            </CardTitle>
            <CardDescription>
              จัดการการแจ้งเตือนและการส่งอีเมล
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">แจ้งเตือนกำหนดส่ง KPI</h4>
                <p className="text-sm text-muted-foreground">รับการแจ้งเตือนเมื่อใกล้ถึงกำหนดส่งข้อมูล KPI</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">แจ้งเตือนผลงานผิดปกติ</h4>
                <p className="text-sm text-muted-foreground">รับการแจ้งเตือนเมื่อ KPI ไม่บรรลุเป้าหมาย</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">รายงานสรุปรายเดือน</h4>
                <p className="text-sm text-muted-foreground">รับรายงานสรุป KPI ประจำเดือนทางอีเมล</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">แจ้งเตือนการอัปเดตระบบ</h4>
                <p className="text-sm text-muted-foreground">รับข่าวสารเกี่ยวกับการอัปเดตและฟีเจอร์ใหม่</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              ความปลอดภัย
            </CardTitle>
            <CardDescription>
              จัดการรหัสผ่านและการรักษาความปลอดภัย
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">รหัสผ่านปัจจุบัน</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">รหัสผ่านใหม่</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">ยืนยันรหัสผ่านใหม่</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
              <Button>เปลี่ยนรหัสผ่าน</Button>
            </div>
          </CardContent>
        </Card>

        {/* System Settings (Admin Only) */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              การจัดการระบบ
            </CardTitle>
            <CardDescription>
              ตั้งค่าระบบและการบำรุงรักษา (สำหรับผู้ดูแลระบบเท่านั้น)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">โหมดบำรุงรักษา</h4>
                <p className="text-sm text-muted-foreground">ปิดระบบชั่วคราวเพื่อการบำรุงรักษา</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">สำรองข้อมูลอัตโนมัติ</h4>
                <p className="text-sm text-muted-foreground">สำรองข้อมูลประจำวันโดยอัตโนมัติ</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">ส่งออกข้อมูล</h4>
                <p className="text-sm text-muted-foreground">ส่งออกข้อมูล KPI และรายงานทั้งหมด</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  ส่งออกข้อมูล KPI
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  ส่งออกรายงาน
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              ข้อมูลโรงพยาบาล
            </CardTitle>
            <CardDescription>
              ข้อมูลทั่วไปของโรงพยาบาลหนองหิน
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hospital-name">ชื่อโรงพยาบาล</Label>
              <Input id="hospital-name" value="โรงพยาบาลหนองหิน" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospital-address">ที่อยู่</Label>
              <Input id="hospital-address" value="อำเภอหนองหิน จังหวัดเลย 42180" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hospital-phone">เบอร์โทรศัพท์</Label>
                <Input id="hospital-phone" value="042-891-234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospital-fax">เบอร์แฟกซ์</Label>
                <Input id="hospital-fax" value="042-891-235" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button>บันทึกข้อมูลโรงพยาบาล</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;