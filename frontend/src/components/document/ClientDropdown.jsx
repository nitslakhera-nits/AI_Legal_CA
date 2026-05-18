// src/components/document/ClientDropdown.jsx

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const ClientDropdown = ({
    clients,
    selectedClient,
    setSelectedClient
}) => {

    const [openDropdown, setOpenDropdown] = useState(false);

    const [search, setSearch] = useState("");

    // FILTER CLIENTS
    const filteredClients = useMemo(() => {

        return clients?.filter((client) => {

            const fullName =
                `${client.firstName} ${client.lastName}`.toLowerCase();

            return (
                fullName.includes(search.toLowerCase()) ||
                client._id.toLowerCase().includes(search.toLowerCase())
            );
        });

    }, [clients, search]);

    // SELECT CLIENT
    const handleSelectClient = (client) => {

        setSelectedClient(client);

        setOpenDropdown(false);

        setSearch("");
    };

    return (

        <div className="space-y-3 relative">

            {/* LABEL */}

            <label className="text-gray-700 font-medium">

                Select Client

            </label>

            {/* DROPDOWN BUTTON */}

            <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="border border-gray-200 rounded-2xl px-4 py-4 bg-white cursor-pointer flex items-center justify-between hover:border-purple-400 transition-all ">
                <div>

                    {
                        selectedClient ? (

                            <div>

                                <p className="font-medium text-gray-900">

                                    {selectedClient.firstName}
                                    {" "}
                                    {selectedClient.lastName}

                                </p>

                                <p className="text-sm text-gray-500">

                                    {selectedClient._id}

                                </p>

                            </div>

                        ) : (

                            <p className="text-gray-400">

                                Select Client

                            </p>

                        )
                    }

                </div>

                <ChevronDown
                    size={20}
                    className={`text-purple-500 transition-all  duration-300 ${openDropdown ? "rotate-180" : ""} `}/>
            </div>

            {/* DROPDOWN LIST */}

            {
                openDropdown && (

                    <div className="
                    absolute
                    z-50
                    w-full
                    mt-2
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    shadow-xl
                    overflow-hidden
                    ">

                        {/* SEARCH */}

                        <div className="
                        flex
                        items-center
                        gap-2
                        px-4
                        py-3
                        border-b
                        border-gray-100
                        ">

                            <Search
                                size={18}
                                className="text-purple-500"
                            />

                            <input
                                type="text"
                                placeholder="Search client..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="
                                w-full
                                outline-none
                                text-gray-700
                                placeholder:text-gray-400
                                "
                            />

                        </div>

                        {/* CLIENT LIST */}

                        <div className="
                        max-h-72
                        overflow-y-auto
                        p-2
                        space-y-2
                        ">

                            {
                                filteredClients?.length > 0 ? (

                                    filteredClients.map((client) => (

                                        <div
                                            key={client._id}
                                            onClick={() =>
                                                handleSelectClient(client)
                                            }
                                            className={`
                                            p-3
                                            rounded-2xl
                                            cursor-pointer
                                            border
                                            transition-all
                                            duration-300

                                            ${selectedClient?._id === client._id
                                                    ? "bg-purple-50 border-purple-300"
                                                    : "border-transparent hover:bg-purple-50"
                                                }
                                            `}
                                        >

                                            <p className="
                                            font-medium
                                            text-gray-900
                                            ">

                                                {client.firstName}
                                                {" "}
                                                {client.lastName}

                                            </p>

                                            <p className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                            ">

                                                {client._id}

                                            </p>

                                        </div>
                                    ))

                                ) : (

                                    <div className="
                                    p-6
                                    text-center
                                    text-gray-500
                                    ">

                                        No Client Found

                                    </div>
                                )
                            }

                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default ClientDropdown;