// import React, { useState, useEffect } from 'react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Stack,
//   useToast,
// } from '@chakra-ui/react';




// const StudentFormModal = ({
//   isOpen,
//   onClose,
//   student,
//   onSave,
//   mode = 'create', // 'create' or 'edit'
// }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     gradeLevel: '',
//     studentId: '',
//     dateOfBirth: '',
//     address: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const toast = useToast();

//   // Set initial form data when student prop changes
//   useEffect(() => {
//     if (mode === 'edit' && student) {
//       setFormData({
//         firstName: student.firstName || '',
//         lastName: student.lastName || '',
//         email: student.email || '',
//         phone: student.phone || '',
//         gradeLevel: student.gradeLevel || '',
//         studentId: student.studentId || '',
//         dateOfBirth: student.dateOfBirth || '',
//         address: student.address || '',
//       });
//     } else {
//       // Reset form for create mode
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         gradeLevel: '',
//         studentId: '',
//         dateOfBirth: '',
//         address: '',
//       });
//     }
//   }, [student, mode]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       await onSave(formData);
//       toast({
//         title: `${mode === 'create' ? 'Student created' : 'Student updated'}`,
//         status: 'success',
//         duration: 3000,
//         isClosable: true,
//       });
//       onClose();
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: error.message || 'Something went wrong',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="lg">
//       <ModalOverlay />
//       <ModalContent as="form" onSubmit={handleSubmit}>
//         <ModalHeader>
//           {mode === 'create' ? 'Add New Student' : 'Edit Student'}
//         </ModalHeader>
//         <ModalCloseButton />
//         <ModalBody pb={6}>
//           <Stack spacing={4}>
//             <FormControl isRequired>
//               <FormLabel>First Name</FormLabel>
//               <Input
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="First name"
//               />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Last Name</FormLabel>
//               <Input
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Last name"
//               />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Email</FormLabel>
//               <Input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email address"
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Phone</FormLabel>
//               <Input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 placeholder="Phone number"
//               />
//             </FormControl>

//             <FormControl isRequired>
//               <FormLabel>Student ID</FormLabel>
//               <Input
//                 name="studentId"
//                 value={formData.studentId}
//                 onChange={handleChange}
//                 placeholder="Student ID"
//                 disabled={mode === 'edit'} // Typically student ID shouldn't be editable
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Grade Level</FormLabel>
//               <Select
//                 name="gradeLevel"
//                 value={formData.gradeLevel}
//                 onChange={handleChange}
//                 placeholder="Select grade level"
//               >
//                 {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
//                   <option key={grade} value={grade}>
//                     Grade {grade}
//                   </option>
//                 ))}
//               </Select>
//             </FormControl>

//             <FormControl>
//               <FormLabel>Date of Birth</FormLabel>
//               <Input
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel>Address</FormLabel>
//               <Input
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 placeholder="Address"
//               />
//             </FormControl>
//           </Stack>
//         </ModalBody>

//         <ModalFooter>
//           <Button variant="outline" mr={3} onClick={onClose}>
//             Cancel
//           </Button>
//           <Button
//             colorScheme="blue"
//             type="submit"
//             isLoading={isSubmitting}
//             loadingText={mode === 'create' ? 'Creating...' : 'Saving...'}
//           >
//             {mode === 'create' ? 'Create Student' : 'Save Changes'}
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default StudentFormModal;


import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const StudentFormModal = ({
  isOpen,
  onClose,
  student,
  onSave,
  mode = 'create',
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gradeLevel: '',
    studentId: '',
    dateOfBirth: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && student) {
      setFormData({
        firstName: student.firstName || '',
        lastName: student.lastName || '',
        email: student.email || '',
        phone: student.phone || '',
        gradeLevel: student.gradeLevel || '',
        studentId: student.studentId || '',
        dateOfBirth: student.dateOfBirth || '',
        address: student.address || '',
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gradeLevel: '',
        studentId: '',
        dateOfBirth: '',
        address: '',
      });
    }
  }, [student, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
      alert(`${mode === 'create' ? 'Student created' : 'Student updated'} successfully.`);
      onClose();
    } catch (error) {
      alert(error.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-all">
                <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">
                  {mode === 'create' ? 'Add New Student' : 'Edit Student'}
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { name: 'firstName', label: 'First Name', required: true },
                    { name: 'lastName', label: 'Last Name', required: true },
                    { name: 'email', label: 'Email', type: 'email', required: true },
                    { name: 'phone', label: 'Phone', type: 'tel' },
                    { name: 'studentId', label: 'Student ID', required: true, disabled: mode === 'edit' },
                    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                    { name: 'address', label: 'Address' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </label>
                      <input
                        type={field.type || 'text'}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.label}
                        disabled={field.disabled}
                        required={field.required}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Grade Level</label>
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Select grade level</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          Grade {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md border px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting
                        ? mode === 'create'
                          ? 'Creating...'
                          : 'Saving...'
                        : mode === 'create'
                        ? 'Create Student'
                        : 'Save Changes'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default StudentFormModal;
