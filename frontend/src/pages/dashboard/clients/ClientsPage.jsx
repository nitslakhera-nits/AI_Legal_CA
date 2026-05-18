import { useMemo, useState } from "react";
import { Search, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllClients } from "../../../hooks/client/useGetAllClients";


const ClientsPage = () => {
  const navigate = useNavigate();
  const { clients } = useGetAllClients();
  // console.log(clients);

  const [search, setSearch] = useState("");

  // Search Filter
  const filteredClients = useMemo(() => {
    if (!clients) return [];

    return clients.filter((client) => {
      const fullName =
        `${client.firstName || ""} ${client.lastName || ""}`.toLowerCase();

      const searchValue = search.toLowerCase();

      return (
        fullName.includes(searchValue) ||
        client.phone?.includes(searchValue) ||
        client.aadharNumber?.includes(searchValue) ||
        client.panCardNo?.toLowerCase().includes(searchValue) ||
        client._id?.toLowerCase().includes(searchValue)
      );
    });
  }, [clients, search]);

  return (
    <div className="h-screen bg-white text-gray-800 flex flex-col overflow-hidden pt-3 -z-10">      {/* Top Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by Name, ID, PAN, Aadhar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

         
          {/* Add Client Button */}
          <button
            onClick={() => navigate("/dashboard/clients/add")}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white transition-all px-5 py-3 rounded-xl font-medium whitespace-nowrap cursor-pointer"
          >
            <Plus size={18} />
            Add Client
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto px-6 py-5">
        <div className="min-w-[1000px] bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          {/* Table Header */}
          <div className="grid grid-cols-6 bg-gray-100 text-gray-700 text-sm font-semibold px-5 py-4 border-b border-gray-200">
            <p>Name</p>
            <p>Phone</p>
            <p>Aadhar</p>
            <p>PAN</p>
            <p>Client ID</p>
            <p className="text-center">Action</p>
          </div>

          {/* Table Body */}
          <div>
            {filteredClients?.length > 0 ? (
              filteredClients.map((client, index) => (
                <div
                  key={client._id}
                  className={`grid grid-cols-6 items-center px-5 py-4 text-sm border-b border-gray-100 transition-all duration-200 hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                >
                  {/* Name */}
                  <div>
                    <p className="font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </p>
                  </div>

                  {/* Phone */}
                  <p className="text-gray-600">
                    {client.phone}
                  </p>

                  {/* Aadhar */}
                  <p className="text-gray-600">
                    {client.aadharNumber}
                  </p>

                  {/* PAN */}
                  <p className="uppercase text-gray-600">
                    {client.panCardNo}
                  </p>

                  {/* Client ID */}
                  <p className="text-gray-500 truncate pr-4">
                    {client._id}
                  </p>

                  {/* Delete Button */}
                  <div className="flex justify-center">
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition-all">
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-20 text-gray-400 text-sm">
                No Clients Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;