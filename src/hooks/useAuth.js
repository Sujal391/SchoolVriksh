// src/hooks/useAuth.js
import { useUser } from '@clerk/nextjs';

export function useAuth() {
  const { isSignedIn, user, isLoaded } = useUser();
  
  return {
    isLoading: !isLoaded,
    isAuthenticated: isSignedIn,
    user,
    role: user?.publicMetadata?.role || null // Assuming you store roles in metadata
  };
}