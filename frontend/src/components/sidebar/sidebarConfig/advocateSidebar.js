import {
    LayoutDashboard,
    BriefcaseBusiness,
    Gavel,
    File,
    FileText,
    Sparkles,
} from "lucide-react";

const advocateSidebar = [
     {
        label: "AI assistant",
        path: "/dashboard/ai-assistant",
        icon: Sparkles,
    },
    {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Cases",
        path: "/dashboard/cases",
        icon: BriefcaseBusiness,
    },
    {
        label: "Clients",
        path: "/dashboard/clients",
        icon: Gavel,
    },
    {
        label: "upload-document",
        path: "/dashboard/upload-document",
        icon: File,
    },
    {
        label: "documents",
        path: "/dashboard/documents",
        icon: FileText,
    },
];

export default advocateSidebar;