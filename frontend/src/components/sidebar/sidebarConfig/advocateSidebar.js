import {
    LayoutDashboard,
    BriefcaseBusiness,
    Gavel,
} from "lucide-react";

const advocateSidebar = [
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
];

export default advocateSidebar;