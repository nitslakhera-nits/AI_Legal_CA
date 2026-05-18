import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  ReceiptText,
} from "lucide-react";

const hybridSidebar = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Clients",
    path: "/dashboard/clients",
    icon: Users,
  },
  {
    label: "Cases",
    path: "/dashboard/cases",
    icon: BriefcaseBusiness,
  },
  {
    label: "GST",
    path: "/dashboard/gst",
    icon: ReceiptText,
  },
];

export default hybridSidebar;