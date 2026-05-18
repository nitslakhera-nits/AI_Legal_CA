import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useClientRegister } from "../../hooks/client/useClientRegister";
import { toast } from "react-toastify";


const AddClientPage = () => {

    const navigate = useNavigate();

    const handleClientRegister = useClientRegister();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        panCardNo: "",
        aadharNumber: "",
        address: "",
    });

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await handleClientRegister(formData, toast);

        if (success) {
            navigate("/dashboard/clients");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg border border-gray-200 p-8">

                {/* Heading */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                            <UserPlus size={24} />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-800">
                            Add Client
                        </h1>
                    </div>

                    <p className="text-gray-500">
                        Fill all required client details
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    {/* First Name */}
                    <div>
                        <label  htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-700">
                            First Name
                        </label>

                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter first name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Last Name
                        </label>

                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter last name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Phone
                        </label>

                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* PAN */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            PAN Card Number
                        </label>

                        <input
                            type="text"
                            id="panCardNo"
                            name="panCardNo"
                            value={formData.panCardNo}
                            onChange={handleChange}
                            placeholder="ABCDE1234F"
                            className="w-full uppercase border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Aadhar */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Aadhar Number
                        </label>

                        <input
                            type="text"
                            id="aadharNumber"
                            name="aadharNumber"
                            value={formData.aadharNumber}
                            onChange={handleChange}
                            placeholder="Enter Aadhar Number"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Address
                        </label>

                        <textarea
                            rows="4"
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                            required
                        />
                    </div>

                    {/* Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all"
                        >
                            Add Client
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddClientPage;