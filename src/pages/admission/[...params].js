// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import api from "../../services/api";

// const AdmissionFormPage = () => {
//   const router = useRouter();
//   const { params } = router.query;
//   const [form, setForm] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [submitting, setSubmitting] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);
//   const [paymentDetails, setPaymentDetails] = useState(null);
//   const [uploadedFiles, setUploadedFiles] = useState({});

//   const initializeFormData = (form) => {
//     try {
//       console.log("Initializing form data:", form);
//       const initialData = {};

//       // Initialize standard fields
//       form.standardFields.forEach((field) => {
//         if (field.type === "select") {
//           initialData[field.name] = field.options?.[0] || "";
//         } else if (field.type === "file") {
//           initialData[field.name] = null;
//         } else {
//           initialData[field.name] = "";
//         }
//       });

//       // Initialize regular document fields
//       form.regularDocuments.forEach((doc) => {
//         initialData[doc.name] = null;
//       });

//       // Initialize RTE document fields
//       form.rteDocuments.forEach((doc) => {
//         initialData[doc.name] = null;
//       });

//       console.log("Initial form data:", initialData);
//       setFormData(initialData);
//     } catch (error) {
//       console.error("Error in initializeFormData:", error);
//       setError("Failed to initialize form data. Please try again.");
//     }
//   };

//   const validateAndFetchForm = async () => {
//     try {
//       const schoolId = params[0];
//       const timestamp = params[1];

//       if (!schoolId || !timestamp) {
//         throw new Error("Invalid URL parameters");
//       }

//       console.log("Fetching form with:", schoolId, timestamp);
//       const response = await api.get(
//         `/admission/validate-form/admission/${schoolId}/${timestamp}`
//       );

//       console.log("API Response:", response.data);

//       if (response.data.valid) {
//         setError(null);
//         setForm(response.data.form);
//         initializeFormData(response.data.form);
//         console.log("Form set successfully:", response.data.form);
//       } else {
//         setError(
//           response.data.message || "Form is not valid or no longer active"
//         );
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       setError(
//         error.response?.data?.message ||
//           error.response?.data?.error ||
//           "Failed to load form. Please check the URL and try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const getPaymentDetails = async () => {
//   //   if (!form || formData.admissionType !== "Regular") return;

//   //   try {
//   //     setPaymentLoading(true);
//   //     const formUrl = form.formUrl;
//   //     const response = await api.get(`/admission/payment-details/${formUrl}`);

//   //     if (response.data.status === "success") {
//   //       setPaymentDetails(response.data.paymentDetails);
//   //       console.log("Payment details fetched:", response.data.paymentDetails);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching payment details:", error);
//   //     setError("Failed to fetch payment details. Please try again.");
//   //   } finally {
//   //     setPaymentLoading(false);
//   //   }
//   // };

//   const getPaymentDetails = async () => {
//     if (!form || formData.admissionType !== "Regular") return;

//     try {
//       setPaymentLoading(true);
//       const schoolId = params[0]; // 688067103662ebe70760fa0d
//       const timestamp = params[1]; // 1753270047509
//       console.log(
//         "Fetching payment details with schoolId and timestamp:",
//         schoolId,
//         timestamp
//       );

//       const response = await api.get(
//         `/admission/payment-details/${schoolId}/${timestamp}`
//       );

//       if (response.data.status === "success") {
//         setPaymentDetails(response.data.paymentDetails);
//         console.log(
//           "Payment details fetched successfully:",
//           response.data.paymentDetails
//         );
//       }
//     } catch (error) {
//       console.error(
//         "Error fetching payment details:",
//         error.response?.data || error.message
//       );
//       setError("Failed to fetch payment details. Please try again.");
//     } finally {
//       setPaymentLoading(false);
//     }
//   };

//   const handleInputChange = (e, fieldName) => {
//     const newFormData = { ...formData, [fieldName]: e.target.value };
//     setFormData(newFormData);

//     // If admission type changes to Regular, fetch payment details
//     if (fieldName === "admissionType" && e.target.value === "Regular") {
//       setTimeout(() => getPaymentDetails(), 100);
//     }
//   };

//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, [fieldName]: file });
//     setUploadedFiles({ ...uploadedFiles, [fieldName]: file });
//   };

//   const initiatePayment = () => {
//     return new Promise((resolve, reject) => {
//       if (!paymentDetails) {
//         reject(new Error("Payment details not available"));
//         return;
//       }

//       const options = {
//         key: paymentDetails.key,
//         amount: paymentDetails.amount * 100,
//         currency: paymentDetails.currency,
//         name: "School Admission",
//         description: "Admission Form Fee",
//         order_id: paymentDetails.orderId,
//         handler: function (response) {
//           resolve({
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           });
//         },
//         prefill: {
//           name: formData.studentName || "",
//           email: formData.parentEmail || "",
//           contact: formData.parentPhone || "",
//         },
//         theme: {
//           color: "#2563eb",
//         },
//         modal: {
//           ondismiss: function () {
//             reject(new Error("Payment cancelled by user"));
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     });
//   };

//   const verifyPayment = async (paymentResponse) => {
//     try {
//       const verificationData = {
//         razorpay_order_id: paymentResponse.razorpay_order_id,
//         razorpay_payment_id: paymentResponse.razorpay_payment_id,
//         razorpay_signature: paymentResponse.razorpay_signature,
//         schoolId: form.schoolId,
//       };

//       const response = await api.post(
//         "/admission/verify-payment",
//         verificationData
//       );

//       if (response.data.status === "success") {
//         return paymentResponse;
//       } else {
//         throw new Error("Payment verification failed");
//       }
//     } catch (error) {
//       console.error("Payment verification error:", error);
//       throw new Error("Payment verification failed. Please contact support.");
//     }
//   };

//   const validateForm = () => {
//     const errors = [];

//     // Validate standard fields
//     form.standardFields.forEach((field) => {
//       if (
//         field.required &&
//         (!formData[field.name] || formData[field.name] === "")
//       ) {
//         errors.push(`${field.label} is required`);
//       }
//     });

//     // Validate regular documents
//     form.regularDocuments.forEach((doc) => {
//       if (doc.required && !formData[doc.name]) {
//         errors.push(`${doc.label} is required`);
//       }
//     });

//     // Validate RTE documents if admission type is RTE
//     if (formData.admissionType === "RTE") {
//       form.rteDocuments.forEach((doc) => {
//         if (doc.required && !formData[doc.name]) {
//           errors.push(`${doc.label} is required`);
//         }
//       });
//     }

//     return errors;
//   };

//   const prepareFormDataForSubmission = (paymentResponse = null) => {
//     const submissionFormData = new FormData();

//     // Prepare student and parent details
//     const studentDetails = {};
//     const parentDetails = {};

//     // Categorize form fields
//     form.standardFields.forEach((field) => {
//       const value = formData[field.name];
//       if (
//         field.name.toLowerCase().includes("student") ||
//         ["name", "dateOfBirth", "appliedClass", "admissionType"].includes(
//           field.name
//         )
//       ) {
//         studentDetails[field.name] = value;
//       } else if (
//         field.name.toLowerCase().includes("parent") ||
//         ["parentName", "parentEmail", "parentPhone"].includes(field.name)
//       ) {
//         parentDetails[field.name] = value;
//       } else {
//         studentDetails[field.name] = value; // Default to student details
//       }
//     });

//     // Add form data
//     submissionFormData.append("formUrl", form.formUrl);
//     submissionFormData.append("studentDetails", JSON.stringify(studentDetails));
//     submissionFormData.append("parentDetails", JSON.stringify(parentDetails));
//     submissionFormData.append(
//       "admissionType",
//       formData.admissionType || "Regular"
//     );

//     // Add payment details if available
//     if (paymentResponse) {
//       submissionFormData.append(
//         "razorpay_payment_id",
//         paymentResponse.razorpay_payment_id
//       );
//       submissionFormData.append(
//         "razorpay_order_id",
//         paymentResponse.razorpay_order_id
//       );
//       submissionFormData.append(
//         "razorpay_signature",
//         paymentResponse.razorpay_signature
//       );
//     }

//     // Add file uploads
//     Object.keys(uploadedFiles).forEach((fieldName) => {
//       if (uploadedFiles[fieldName]) {
//         submissionFormData.append(fieldName, uploadedFiles[fieldName]);
//       }
//     });

//     return submissionFormData;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSubmitting(true);
//       setError(null);

//       // Validate form
//       const validationErrors = validateForm();
//       if (validationErrors.length > 0) {
//         setError(validationErrors.join(", "));
//         return;
//       }

//       let paymentResponse = null;

//       // Handle payment for Regular admission
//       if (formData.admissionType === "Regular") {
//         if (!paymentDetails) {
//           await getPaymentDetails();
//           if (!paymentDetails) {
//             throw new Error("Unable to fetch payment details");
//           }
//         }

//         try {
//           console.log("Initiating payment...");
//           paymentResponse = await initiatePayment();
//           console.log("Payment successful:", paymentResponse);
//           paymentResponse = await verifyPayment(paymentResponse);
//         } catch (paymentError) {
//           console.error("Payment failed:", paymentError);
//           setError(paymentError.message || "Payment failed. Please try again.");
//           return;
//         }
//       }

//       // Prepare and submit form data
//       const submissionData = prepareFormDataForSubmission(paymentResponse);

//       console.log("Submitting application...");
//       const response = await api.post("/admission/apply", submissionData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data.trackingId) {
//         // Success - redirect to success page or show success message
//         alert(
//           `Application submitted successfully! Your tracking ID is: ${response.data.trackingId}`
//         );
//         console.log("Form submitted successfully:", response.data);

//         // You can redirect to a success page here
//         // router.push(`/admission/success?trackingId=${response.data.trackingId}`);
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       setError(
//         error.response?.data?.error ||
//           error.response?.data?.message ||
//           "Failed to submit form. Please try again."
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     console.log("useEffect triggered with params:", params);
//     if (params && params.length >= 2) {
//       setError(null);
//       setLoading(true);
//       validateAndFetchForm();
//     } else {
//       setError("Invalid form URL");
//       setLoading(false);
//     }
//   }, [params]);

//   // Fetch payment details when admission type changes to Regular
//   useEffect(() => {
//     if (form && formData.admissionType === "Regular") {
//       getPaymentDetails();
//     }
//   }, [form, formData.admissionType]);

//   // Loading Component
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="max-w-md w-full mx-4">
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//             <p className="text-gray-600 text-lg">Loading form...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Error Component
//   if (error && !form) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="max-w-md w-full mx-4">
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-8 h-8 text-red-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
//             <p className="text-red-600 mb-4">{error}</p>
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
//             >
//               Try Again
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // No form data component
//   if (!form) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="max-w-md w-full mx-4">
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
//               <svg
//                 className="w-8 h-8 text-gray-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//             <h2 className="text-xl font-semibold text-gray-900 mb-2">
//               No Form Available
//             </h2>
//             <p className="text-gray-600">
//               No form data is available at this time.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Main form component
//   return (
//     <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6 sm:p-8">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
//             {form.title}
//           </h1>
//           {form.description && (
//             <p className="text-gray-600 leading-relaxed">{form.description}</p>
//           )}
//         </div>

//         {/* Error Alert */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg
//                   className="h-5 w-5 text-red-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-800">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Payment Details Card */}
//         {formData.admissionType === "Regular" && (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 p-6 sm:p-8">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">
//               Payment Information
//             </h3>
//             {paymentLoading ? (
//               <div className="flex items-center justify-center py-4">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//                 <span className="ml-2 text-gray-600">
//                   Loading payment details...
//                 </span>
//               </div>
//             ) : paymentDetails ? (
//               <div className="bg-blue-50 rounded-lg p-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600">Admission Fee</p>
//                     <p className="text-2xl font-bold text-blue-600">
//                       ₹{paymentDetails.amount}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-sm text-gray-600">
//                       Payment will be processed
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       during form submission
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-yellow-50 rounded-lg p-4">
//                 <p className="text-yellow-800">
//                   Payment details will be loaded automatically
//                 </p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8"
//         >
//           <div className="space-y-6">
//             {/* Standard Fields */}
//             {form.standardFields.map((field) => (
//               <div key={field._id} className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   {field.label}
//                   {field.required && (
//                     <span className="text-red-500 ml-1">*</span>
//                   )}
//                 </label>

//                 {field.type === "select" ? (
//                   <select
//                     name={field.name}
//                     required={field.required}
//                     value={formData[field.name] || ""}
//                     onChange={(e) => handleInputChange(e, field.name)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   >
//                     <option value="">Select an option</option>
//                     {field.options?.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 ) : field.type === "textarea" ? (
//                   <textarea
//                     name={field.name}
//                     required={field.required}
//                     value={formData[field.name] || ""}
//                     onChange={(e) => handleInputChange(e, field.name)}
//                     rows={4}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
//                   />
//                 ) : field.type === "file" ? (
//                   <div className="relative">
//                     <input
//                       type="file"
//                       name={field.name}
//                       required={field.required}
//                       onChange={(e) => handleFileChange(e, field.name)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     />
//                     {uploadedFiles[field.name] && (
//                       <p className="text-xs text-green-600 mt-1">
//                         ✓ File selected: {uploadedFiles[field.name].name}
//                       </p>
//                     )}
//                   </div>
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     required={field.required}
//                     value={formData[field.name] || ""}
//                     onChange={(e) => handleInputChange(e, field.name)}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
//                   />
//                 )}
//               </div>
//             ))}

//             {/* Regular Documents */}
//             {form.regularDocuments.length > 0 && (
//               <div className="border-t border-gray-200 pt-6">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">
//                   Required Documents
//                 </h3>
//                 {form.regularDocuments.map((doc) => (
//                   <div key={doc._id} className="space-y-2 mb-4">
//                     <label className="block text-sm font-medium text-gray-700">
//                       {doc.label}
//                       {doc.required && (
//                         <span className="text-red-500 ml-1">*</span>
//                       )}
//                     </label>
//                     <input
//                       type="file"
//                       name={doc.name}
//                       required={doc.required}
//                       onChange={(e) => handleFileChange(e, doc.name)}
//                       accept={doc.validation?.allowedTypes?.join(",")}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     />
//                     {doc.validation?.allowedTypes && (
//                       <p className="text-xs text-gray-500">
//                         Allowed formats:{" "}
//                         {doc.validation.allowedTypes.join(", ")}
//                       </p>
//                     )}
//                     {uploadedFiles[doc.name] && (
//                       <p className="text-xs text-green-600">
//                         ✓ File selected: {uploadedFiles[doc.name].name}
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* RTE Documents (conditional) */}
//             {formData.admissionType === "RTE" &&
//               form.rteDocuments.length > 0 && (
//                 <div className="border-t border-gray-200 pt-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">
//                     RTE Documents
//                   </h3>
//                   {form.rteDocuments.map((doc) => (
//                     <div key={doc._id} className="space-y-2 mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         {doc.label}
//                         {doc.required && (
//                           <span className="text-red-500 ml-1">*</span>
//                         )}
//                       </label>
//                       <input
//                         type="file"
//                         name={doc.name}
//                         required={doc.required}
//                         onChange={(e) => handleFileChange(e, doc.name)}
//                         accept={doc.validation?.allowedTypes?.join(",")}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                       />
//                       {doc.validation?.allowedTypes && (
//                         <p className="text-xs text-gray-500">
//                           Allowed formats:{" "}
//                           {doc.validation.allowedTypes.join(", ")}
//                         </p>
//                       )}
//                       {uploadedFiles[doc.name] && (
//                         <p className="text-xs text-green-600">
//                           ✓ File selected: {uploadedFiles[doc.name].name}
//                         </p>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}

//             {/* Submit Button */}
//             <div className="border-t border-gray-200 pt-6">
//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 px-8 rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
//               >
//                 {submitting ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     {formData.admissionType === "Regular"
//                       ? "Processing Payment..."
//                       : "Submitting..."}
//                   </>
//                 ) : (
//                   <>
//                     {formData.admissionType === "Regular"
//                       ? "Pay & Submit"
//                       : "Submit Form"}
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>

//         {/* Footer */}
//         <div className="mt-6 text-center">
//           <p className="text-sm text-gray-500">
//             Please ensure all required fields are filled before submitting.
//             {formData.admissionType === "Regular" &&
//               " Payment will be processed securely via Razorpay."}
//           </p>
//         </div>
//       </div>

//       {/* Razorpay Script */}
//       <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
//     </div>
//   );
// };

// export default AdmissionFormPage;






import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Alert, CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const AdmissionFormPage = () => {
  const router = useRouter();
  const { params } = router.query;
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [qrCodeDetails, setQrCodeDetails] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({});

  


  const initializeFormData = (form) => {
    try {
      const initialData = {};
      // Initialize standard fields
      form.standardFields.forEach((field) => {
        initialData[field.name] = field.type === "select" ? field.options?.[0] || "" : field.type === "file" ? null : "";
      });
      // Initialize additional fields
      form.additionalFields.forEach((field) => {
        initialData[field.name] = field.type === "select" ? field.options?.[0] || "" : field.type === "file" ? null : "";
      });
      // Initialize document fields
      form.regularDocuments.forEach((doc) => {
        initialData[doc.name] = null;
      });
      form.rteDocuments.forEach((doc) => {
        initialData[doc.name] = null;
      });
      setFormData(initialData);
    } catch (error) {
      setError("Failed to initialize form data. Please try again.");
    }
  };

  
  const validateAndFetchForm = async () => {
    try {
      const schoolId = params[0];
      const timestamp = params[1];
      
      if (!schoolId || !timestamp) {
        throw new Error("Invalid URL parameters");
      }

      console.log("Fetching form for:", { schoolId, timestamp });
      
      const response = await api.get(`/admission/validate-form/admission/${schoolId}/${timestamp}`);
      
      if (response.data.valid) {
        setForm(response.data.form);
        initializeFormData(response.data.form);
        setError(null); // Clear any previous errors
      } else {
        setError(response.data.message || "Form is not valid or no longer active");
      }
    } catch (error) {
      console.error("Form validation error:", error);
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Failed to load form. Please check the URL and try again."
      );
    } finally {
      setLoading(false);
    }
  };



const getQRCodeDetails = async () => {
    if (!form || formData.admissionType !== "Regular") return;
    
    try {
      setQrLoading(true);
      const schoolId = params[0];
      const timestamp = params[1];
      const response = await api.get(`/admission/qr-details/${schoolId}/${timestamp}`);
      
      if (response.data.status === "success") {
        setQrCodeDetails(response.data.qrCodeDetails);
      }
    } catch (error) {
      console.error("QR code fetch error:", error);
      setError("Failed to fetch QR code details. Please try again.");
    } finally {
      setQrLoading(false);
    }
  };

  const handleInputChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
    if (fieldName === "admissionType" && e.target.value === "Regular") {
      getQRCodeDetails();
    }
  };

 

const handleFileChange = (e, fieldName, validation) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (validation?.allowedTypes && !validation.allowedTypes.includes(file.type)) {
      setError(`Invalid file type for ${fieldName}. Allowed: ${validation.allowedTypes.join(", ")}`);
      e.target.value = ''; // Clear the input
      return;
    }
    
    // Validate file size
    if (validation?.maxSize && file.size > validation.maxSize) {
      setError(`File size for ${fieldName} exceeds ${(validation.maxSize / (1024 * 1024)).toFixed(1)}MB`);
      e.target.value = ''; // Clear the input
      return;
    }
    
    setUploadedFiles({ ...uploadedFiles, [fieldName]: file });
    setFormData({ ...formData, [fieldName]: file });
    setError(null);
  };

  

  const validateForm = () => {
  const errors = [];
  
  // Validate standard and additional fields
  [...form.standardFields, ...form.additionalFields].forEach((field) => {
    if (field.required && (!formData[field.name] || formData[field.name] === "")) {
      errors.push(`${field.label} is required`);
    }
    if (field.validation?.pattern && formData[field.name]) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(formData[field.name])) {
        errors.push(`Invalid format for ${field.label}`);
      }
    }
  });
  
  // Validate documents based on admission type
  const requiredDocs = formData.admissionType === "RTE" ? form.rteDocuments : form.regularDocuments;
  requiredDocs.forEach((doc) => {
    if (doc.required && !formData[doc.name]) {
      errors.push(`${doc.label} is required`);
    }
  });
  
  // Special validation for payment screenshot in Regular admissions
  if (formData.admissionType === "Regular" && !formData.paymentScreenshot) {
    errors.push("Payment screenshot is required for regular admissions. Please scan the QR code, make payment, and upload screenshot.");
  }
  
  // Additional check for schoolLeavingCertificate based on class
  if (formData.admissionType !== "RTE" && formData.appliedClass && formData.appliedClass !== "1st" && !formData.schoolLeavingCertificate) {
    errors.push("School Leaving Certificate is required for class 2 and above");
  }
  
  // Validate required student details
  if (!formData.studentName) {
    errors.push("Student name is required");
  }
  
  // Validate required parent details
  if (!formData.parentName) {
    errors.push("Parent name is required");
  }
  
  return errors;
};

  

// const prepareFormDataForSubmission = () => {
//   const submissionFormData = new FormData();
//   const studentDetails = {};
//   const parentDetails = {};
//   const additionalResponses = {};

//   // Categorize fields with proper field name mapping
//   [...form.standardFields, ...form.additionalFields].forEach((field) => {
//     const value = formData[field.name];
    
//     // Skip file fields - they'll be handled separately
//     if (field.type === 'file') return;
    
//     // Map frontend field names to backend expected field names
//     if (["studentName", "dob", "gender", "email", "mobile", "appliedClass", "admissionType"].includes(field.name)) {
//       // Map studentName to name for the database model
//       if (field.name === "studentName") {
//         studentDetails.name = value || "";
//       } else {
//         studentDetails[field.name] = value || "";
//       }
//     } else if (["parentName", "parentEmail", "parentMobile", "parentOccupation", "address"].includes(field.name)) {
//       // Map parentName to name for the database model
//       if (field.name === "parentName") {
//         parentDetails.name = value || "";
//       } else if (field.name === "parentEmail") {
//         parentDetails.email = value || "";
//       } else if (field.name === "parentMobile") {
//         parentDetails.mobile = value || "";
//       } else if (field.name === "parentOccupation") {
//         parentDetails.occupation = value || "";
//       } else {
//         parentDetails[field.name] = value || "";
//       }
//     } else {
//       additionalResponses[field.name] = value || "";
//     }
//   });

//   // Add form metadata
//   submissionFormData.append("formUrl", form.formUrl);
//   submissionFormData.append("studentDetails", JSON.stringify(studentDetails));
//   submissionFormData.append("parentDetails", JSON.stringify(parentDetails));
//   submissionFormData.append("admissionType", formData.admissionType || "Regular");
//   submissionFormData.append("additionalResponses", JSON.stringify(additionalResponses));

//   // Handle file uploads - match backend expected field names
//   const fileFieldMapping = {
//     // Map frontend field names to backend expected names
//     'studentPhoto': 'studentPhoto',
//     'aadharCard': 'aadharCard', 
//     'birthCertificate': 'birthCertificate',
//     'schoolLeavingCertificate': 'schoolLeavingCertificate',
//     'rteCertificate': 'rteCertificate',
//     'paymentScreenshot': 'paymentScreenshot'
//   };

//   // Upload files with correct field names
//   Object.keys(uploadedFiles).forEach((fieldName) => {
//     const file = uploadedFiles[fieldName];
//     if (file) {
//       const backendFieldName = fileFieldMapping[fieldName] || fieldName;
//       console.log(`Appending file for field: ${backendFieldName}`, file.name);
//       submissionFormData.append(backendFieldName, file);
//     }
//   });

//   // Debug logging
//   console.log("Student Details (mapped):", studentDetails);
//   console.log("Parent Details (mapped):", parentDetails);
//   console.log("Additional Responses:", additionalResponses);
//   console.log("Files being uploaded:", Object.keys(uploadedFiles));

//   return submissionFormData;
// };


const prepareFormDataForSubmission = () => {
  const submissionFormData = new FormData();
  const studentDetails = {};
  const parentDetails = {};
  const additionalResponses = {};

  // Categorize fields with proper field name mapping
  [...form.standardFields, ...form.additionalFields].forEach((field) => {
    const value = formData[field.name];
    
    // Skip file fields - they'll be handled separately
    if (field.type === 'file') return;
    
    // Map frontend field names to backend expected field names
    if (["studentName", "dob", "gender", "email", "mobile", "appliedClass", "admissionType"].includes(field.name)) {
      // Map studentName to name for the database model
      if (field.name === "studentName") {
        studentDetails.name = value || "";
      } else {
        studentDetails[field.name] = value || "";
      }
    } else if (["parentName", "parentEmail", "parentMobile", "parentOccupation"].includes(field.name)) {
      // Map parent fields
      if (field.name === "parentName") {
        parentDetails.name = value || "";
      } else if (field.name === "parentEmail") {
        parentDetails.email = value || "";
      } else if (field.name === "parentMobile") {
        parentDetails.mobile = value || "";
      } else if (field.name === "parentOccupation") {
        parentDetails.occupation = value || "";
      }
    } else if (field.name.startsWith("address.")) {
      // Handle address subfields
      if (!parentDetails.address) {
        parentDetails.address = {};
      }
      const addressField = field.name.split('.')[1]; // Get street, city, etc.
      parentDetails.address[addressField] = value || "";
    } else {
      additionalResponses[field.name] = value || "";
    }
  });

  // Add form metadata
  submissionFormData.append("formUrl", form.formUrl);
  submissionFormData.append("studentDetails", JSON.stringify(studentDetails));
  submissionFormData.append("parentDetails", JSON.stringify(parentDetails));
  submissionFormData.append("admissionType", formData.admissionType || "Regular");
  submissionFormData.append("additionalResponses", JSON.stringify(additionalResponses));

  // Handle file uploads - match backend expected field names
  const fileFieldMapping = {
    'studentPhoto': 'studentPhoto',
    'aadharCard': 'aadharCard', 
    'birthCertificate': 'birthCertificate',
    'schoolLeavingCertificate': 'schoolLeavingCertificate',
    'rteCertificate': 'rteCertificate',
    'paymentScreenshot': 'paymentScreenshot'
  };

  Object.keys(uploadedFiles).forEach((fieldName) => {
    const file = uploadedFiles[fieldName];
    if (file) {
      const backendFieldName = fileFieldMapping[fieldName] || fieldName;
      submissionFormData.append(backendFieldName, file);
    }
  });

  return submissionFormData;
};

   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setSubmitting(true);
    setError(null);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    console.log("Form data before submission:", formData);
    console.log("Uploaded files:", uploadedFiles);

    const submissionData = prepareFormDataForSubmission();
    
    // Debug: Log all FormData entries
    console.log("FormData entries:");
    for (let [key, value] of submissionData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File - ${value.name} (${value.size} bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    const response = await api.post("/admission/apply", submissionData, {
      headers: { 
        "Content-Type": "multipart/form-data"
      },
    });

    if (response.data.trackingId) {
      alert(`Application submitted successfully! Your tracking ID is: ${response.data.trackingId}`);
      router.push(`/admission/success?trackingId=${response.data.trackingId}`);
    }
  } catch (error) {
    console.error("Submission error:", error);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);
    
    setError(
      error.response?.data?.error || 
      error.response?.data?.message || 
      "Failed to submit form. Please try again."
    );
  } finally {
    setSubmitting(false);
  }
};

  useEffect(() => {
    // Wait for Next.js router to be ready
    if (!router.isReady) return;
    
    // Check if params exist and have the required values
    if (params && Array.isArray(params) && params.length >= 2) {
      console.log("Router ready, params available:", params);
      validateAndFetchForm();
    } else {
      console.log("Invalid params:", params);
      setError("Invalid form URL format");
      setLoading(false);
    }
  }, [router.isReady, params]); 

  useEffect(() => {
    if (form && formData.admissionType === "Regular") {
      getQRCodeDetails();
    }
  }, [form, formData.admissionType]);

  // Show loading while router is not ready
  if (!router.isReady) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "28rem", width: "100%", mx: 2, bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 6, textAlign: "center" }}>
          <CircularProgress sx={{ mb: 4 }} />
          <Typography variant="h6" color="text.secondary">Loading...</Typography>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "28rem", width: "100%", mx: 2, bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 6, textAlign: "center" }}>
          <CircularProgress sx={{ mb: 4 }} />
          <Typography variant="h6" color="text.secondary">Loading form...</Typography>
        </Box>
      </Box>
    );
  }

  if (error && !form) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "28rem", width: "100%", mx: 2, bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 6, textAlign: "center" }}>
          <Box sx={{ width: 64, height: 64, mx: "auto", mb: 4, bgcolor: "red.100", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.232 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </Box>
          <Typography variant="h6" fontWeight="600" mb={2}>Error</Typography>
          <Typography color="error" mb={4}>{error}</Typography>
          <Button 
            variant="contained" 
            onClick={() => {
              setError(null);
              setLoading(true);
              validateAndFetchForm();
            }} 
            sx={{ textTransform: "none", px: 6, py: 2, borderRadius: 2 }}
          >
            Try Again
          </Button>
        </Box>
      </Box>
    );
  }

  if (!form) {
    return (
      <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Box sx={{ maxWidth: "28rem", width: "100%", mx: 2, bgcolor: "white", borderRadius: 2, boxShadow: 3, p: 6, textAlign: "center" }}>
          <Box sx={{ width: 64, height: 64, mx: "auto", mb: 4, bgcolor: "grey.100", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </Box>
          <Typography variant="h6" fontWeight="600" mb={2}>No Form Available</Typography>
          <Typography color="text.secondary">No form data is available at this time.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.50", py: 6, px: { xs: 2, sm: 4, lg: 6 } }}>
      <Box sx={{ maxWidth: "48rem", mx: "auto" }}>
        <Box sx={{ bgcolor: "white", borderRadius: 2, border: 1, borderColor: "grey.200", mb: 6, p: { xs: 4, sm: 6 } }}>
          <Typography variant="h5" fontWeight="700" mb={3}>{form.title}</Typography>
          {form.description && <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>{form.description}</Typography>}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 6, borderRadius: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {formData.admissionType === "Regular" && (
          <Box sx={{ bgcolor: "white", borderRadius: 2, border: 1, borderColor: "grey.200", mb: 6, p: { xs: 4, sm: 6 } }}>
            <Typography variant="h6" fontWeight="600" mb={4}>Payment Information</Typography>
            {qrLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
                <CircularProgress size={24} sx={{ mr: 2 }} />
                <Typography color="text.secondary">Loading QR code details...</Typography>
              </Box>
            ) : qrCodeDetails ? (
              <Box sx={{ bgcolor: "blue.50", borderRadius: 2, p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">Admission Fee</Typography>
                    <Typography variant="h5" fontWeight="700" color="blue.600">₹{qrCodeDetails.admissionFee}</Typography>
                  </Box>
                  <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                    <Typography variant="caption" color="text.secondary" display="block">Payment Instructions</Typography>
                    <Typography variant="body2" color="text.secondary">Scan the QR code below to make the payment and upload the screenshot.</Typography>
                  </Box>
                </Box>
                <Box sx={{ mt: 4, textAlign: "center" }}>
                  <img src={qrCodeDetails.qrCodeUrl} alt="Payment QR Code" style={{ maxWidth: "200px", width: "100%", borderRadius: "8px" }} />
                </Box>
              </Box>
            ) : (
              <Box sx={{ bgcolor: "yellow.50", borderRadius: 2, p: 4 }}>
                <Typography color="orange.800">Unable to load QR code details. Please try again later.</Typography>
              </Box>
            )}
          </Box>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Box sx={{ bgcolor: "white", borderRadius: 2, border: 1, borderColor: "grey.200", p: { xs: 4, sm: 6 } }}>
            <Box sx={{ display: "grid", gap: 4 }}>
              {[...form.standardFields, ...form.additionalFields].map((field) => (
                <Box key={field._id || field.name}>
                  <Typography component="label" htmlFor={field.name} sx={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "text.secondary", mb: 1 }}>
                    {field.label}
                    {field.required && <Typography component="span" color="error" sx={{ ml: 0.5 }}>*</Typography>}
                  </Typography>
                  {field.type === "select" ? (
                    <FormControl fullWidth>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleInputChange(e, field.name)}
                        required={field.required}
                      >
                        <MenuItem value="">Select an option</MenuItem>
                        {field.options?.map((option) => (
                          <MenuItem key={option} value={option}>{option}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : field.type === "textarea" ? (
                    <TextField
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(e, field.name)}
                      required={field.required}
                      multiline
                      rows={4}
                      fullWidth
                      sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
                    />
                  ) : field.type === "file" ? (
                    <Box>
                      <input
                        id={field.name}
                        type="file"
                        name={field.name}
                        required={field.required}
                        onChange={(e) => handleFileChange(e, field.name, field.validation)}
                        accept={field.validation?.allowedTypes?.join(",") || "image/*,application/pdf"}
                        style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "8px" }}
                      />
                      {field.validation?.allowedTypes && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                          Allowed formats: {field.validation.allowedTypes.join(", ")}
                        </Typography>
                      )}
                      {uploadedFiles[field.name] && (
                        <Typography variant="caption" color="success.main" sx={{ mt: 1, display: "block" }}>
                          ✓ File selected: {uploadedFiles[field.name].name}
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <TextField
                      id={field.name}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInputChange(e, field.name)}
                      required={field.required}
                      fullWidth
                      sx={{ "& .MuiInputBase-root": { borderRadius: 2 } }}
                    />
                  )}
                </Box>
              ))}

              {(formData.admissionType === "RTE" ? form.rteDocuments : form.regularDocuments).length > 0 && (
                <Box sx={{ borderTop: 1, borderColor: "grey.200", pt: 4 }}>
                  <Typography variant="h6" fontWeight="600" mb={4}>Required Documents</Typography>
                  {(formData.admissionType === "RTE" ? form.rteDocuments : form.regularDocuments).map((doc) => (
                    <Box key={doc._id || doc.name} sx={{ mb: 4 }}>
                      <Typography component="label" htmlFor={doc.name} sx={{ display: "block", fontSize: "0.875rem", fontWeight: "500", color: "text.secondary", mb: 1 }}>
                        {doc.label}
                        {doc.required && (formData.admissionType !== "RTE" || doc.name !== "schoolLeavingCertificate" || formData.appliedClass !== "1st") && (
                          <Typography component="span" color="error" sx={{ ml: 0.5 }}>*</Typography>
                        )}
                      </Typography>
                      <input
                        id={doc.name}
                        type="file"
                        name={doc.name}
                        required={doc.required && (formData.admissionType !== "RTE" || doc.name !== "schoolLeavingCertificate" || formData.appliedClass !== "1st")}
                        onChange={(e) => handleFileChange(e, doc.name, doc.validation)}
                        accept={doc.validation?.allowedTypes?.join(",") || "image/*,application/pdf"}
                        style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "8px" }}
                      />
                      {doc.validation?.allowedTypes && (
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                          Allowed formats: {doc.validation.allowedTypes.join(", ")}
                        </Typography>
                      )}
                      {uploadedFiles[doc.name] && (
                        <Typography variant="caption" color="success.main" sx={{ mt: 1, display: "block" }}>
                          ✓ File selected: {uploadedFiles[doc.name].name}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              )}

              <Box sx={{ borderTop: 1, borderColor: "grey.200", pt: 4 }}>
                <Button
                  type="submit"
                  disabled={submitting}
                  variant="contained"
                  sx={{ width: { xs: "100%", sm: "auto" }, bgcolor: submitting ? "grey.400" : "blue.600", "&:hover": { bgcolor: submitting ? "grey.400" : "blue.700" }, textTransform: "none", fontWeight: 600, px: 8, py: 2, borderRadius: 2 }}
                >
                  {submitting ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 2, color: "white" }} />
                      Submitting...
                    </>
                  ) : (
                    formData.admissionType === "Regular" ? "Submit with Payment Screenshot" : "Submit Form"
                  )}
                </Button>
              </Box>
            </Box>
          </Box>
        </form>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="caption" color="text.secondary">
            Please ensure all required fields are filled before submitting.
            {formData.admissionType === "Regular" && " Make sure to scan the QR code, complete the payment, and upload the payment screenshot."}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdmissionFormPage;
