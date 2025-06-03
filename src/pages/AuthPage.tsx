
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import MainLayout from '@/layouts/MainLayout';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (searchParams.get('signup') === 'true') {
      setIsLogin(false);
    }
  }, [searchParams]);

  // Redirect authenticated users to dashboard or intended page
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  return (
    <MainLayout>
      <div className="w-full max-w-md mx-auto py-12">
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <RegisterForm onToggleForm={toggleForm} />
        )}
      </div>
    </MainLayout>
  );
};

export default AuthPage;
