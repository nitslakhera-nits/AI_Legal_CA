// src/constants/documentFields.js

export const DOCUMENT_FIELDS = {

    AADHAR: [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "gender", label: "Gender", type: "text" },
        { name: "aadharNumber", label: "Aadhar Number", type: "text" },
        { name: "address", label: "Address", type: "text" },
        { name: "pinCode", label: "Pin Code", type: "text" },
    ],

    PAN: [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "fatherName", label: "Father Name", type: "text" },
        { name: "panNumber", label: "PAN Number", type: "text" },
        { name: "dob", label: "Date of Birth", type: "text" },
    ],

    GST: [
        { name: "businessName", label: "Business Name", type: "text" },
        { name: "gstNumber", label: "GST Number", type: "text" },
        { name: "ownerName", label: "Owner Name", type: "text" },
        { name: "businessType", label: "Business Type", type: "text" },
        { name: "registrationDate", label: "Registration Date", type: "date" },
        { name: "address", label: "Business Address", type: "text" },
    ],

    TDS: [
        { name: "deductorName", label: "Deductor Name", type: "text" },
        { name: "tanNumber", label: "TAN Number", type: "text" },
        { name: "panNumber", label: "PAN Number", type: "text" },
        { name: "assessmentYear", label: "Assessment Year", type: "text" },
        { name: "totalAmount", label: "Total Amount", type: "number" },
        { name: "tdsAmount", label: "TDS Amount", type: "number" },
    ],

    BANK_STATEMENT: [
        { name: "accountHolderName", label: "Account Holder Name", type: "text" },
        { name: "bankName", label: "Bank Name", type: "text" },
        { name: "accountNumber", label: "Account Number", type: "text" },
        { name: "ifscCode", label: "IFSC Code", type: "text" },
        { name: "statementPeriod", label: "Statement Period", type: "text" },
        { name: "branchName", label: "Branch Name", type: "text" },
    ],

    ITR: [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "panNumber", label: "PAN Number", type: "text" },
        { name: "assessmentYear", label: "Assessment Year", type: "text" },
        { name: "itrType", label: "ITR Type", type: "text" },
        { name: "totalIncome", label: "Total Income", type: "number" },
        { name: "taxPaid", label: "Tax Paid", type: "number" },
        { name: "filingDate", label: "Filing Date", type: "date" },
    ],

   
};