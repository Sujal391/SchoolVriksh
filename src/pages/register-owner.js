// src/pages/register-owner.js
import AuthLayout from '../components/auth/AuthLayout';
import RegisterOwnerForm from '../components/auth/RegisterOwnerForm';

const RegisterOwnerPage = () => {
  return (
    <AuthLayout title="Register as Owner">
      <RegisterOwnerForm />
    </AuthLayout>
  );
};

export default RegisterOwnerPage;