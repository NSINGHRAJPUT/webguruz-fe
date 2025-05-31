'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import io from 'socket.io-client';

// Create auth context
const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Set isClient to true when component mounts on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is logged in on initial load
  useEffect(() => {
    // Skip if not on client side yet
    if (!isClient) return;
    
    const checkLoggedIn = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, [isClient]);

  // Initialize socket connection when user is logged in
  useEffect(() => {
    
    const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8888';
    // console.log('Initializing socket connection to:', SOCKET_URL);
    
    const newSocket = io(SOCKET_URL, {
      auth: { 
        userId: user?._id,
        token: localStorage.getItem('token')
      }
    });
    
    // Listen for any incoming socket events
    newSocket.onAny((eventName, ...args) => {
      // console.log('Received socket event:', eventName, 'with data:', args);
    });
    
    // Listen for force-logout event
    newSocket.on('force-logout', (data) => {
      // console.log('Force logout event received:', data);
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (data.userId === storedUser?._id) {
        logout(data.message);
      }
    });
    
    // console.log('Socket connection established');
    setSocket(newSocket);
    
    // Clean up socket connection
    return () => {
      if (newSocket) {
        // Leave the room before disconnecting
        newSocket.emit('leave-room', user?._id.toString());
        // console.log('Cleaning up socket connection');
        newSocket.disconnect();
      }
    };
  }, [isClient, user?._id]);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.auth.login({ email, password });
      
      // Save token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
      
      // Redirect based on role
      if (response.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check your credentials.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = (message = null) => {
    // Disconnect socket if exists
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
    
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    
    // Redirect to login with message if provided
    router.push('/');
    
    // Show message if provided
    if (message && typeof window !== 'undefined') {
      // alert(message);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      await api.auth.register(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  // Auth context value
  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    socket,
    isClient
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}