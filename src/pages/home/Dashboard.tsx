import { useAuthStore } from '@/hooks/useAuth';
import { CheckCircle } from 'lucide-react';

const DashboardPage = () => {
  const authStore = useAuthStore();

  const handleLogout = () => {
    authStore.logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
        <p className="text-gray-600 mb-6">
          Hello, {authStore.user?.firstName} {authStore.user?.lastName}
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg text-left">
            <h3 className="font-medium text-gray-900 mb-2">
              User Information:
            </h3>
            <p className="text-sm text-gray-600">
              Email: {authStore.user?.email}
            </p>
            <p className="text-sm text-gray-600">
              Username: {authStore.user?.username}
            </p>
            <p className="text-sm text-gray-600">ID: {authStore.user?.id}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
