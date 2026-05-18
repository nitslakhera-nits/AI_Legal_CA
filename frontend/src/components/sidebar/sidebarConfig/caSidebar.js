import {
    LayoutDashboard,
    Users,
    ReceiptText,
    FileText,
    File,
    Receipt,
    Sparkles,
} from "lucide-react";

const caSidebar = [
     {
        label: "AI assistant",
        path: "/ai-assistant",
        icon: Sparkles,
    },
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

export default caSidebar;