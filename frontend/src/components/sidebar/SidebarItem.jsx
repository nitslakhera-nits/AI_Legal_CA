
import { NavLink } from "react-router-dom";

const SidebarItem = ({item,collapsed}) => {

    const Icon = item.icon;

    return (

        <NavLink
            to={item.path}

            // SIRF DASHBOARD KE LIYE EXACT MATCH
            end={item.path === "/dashboard"}

            className={({ isActive }) => `

                w-full
                flex
                items-center
                px-3
                py-2.5
                rounded-xl
                transition-all
                duration-200

                ${collapsed
                    ? "justify-center"
                    : "gap-3"
                }

                ${isActive
                    ? `
                        bg-purple-600
                        text-white
                        shadow-sm
                    `
                    : `
                        text-gray-400
                        hover:bg-gray-800
                        hover:text-white
                    `
                }
            `}
        >

            <Icon size={20} />

            {
                !collapsed && (

                    <span className="font-medium">

                        {item.label}

                    </span>
                )
            }
        </NavLink>
    );
};

export default SidebarItem;
