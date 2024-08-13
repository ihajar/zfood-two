import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getLoggedInUser, logout } from '@/api/users';
import { User } from '@/models/user';;
import { toast } from 'sonner';

// Define the type for the context value
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    setUser: (user: User | null) => void;
    signOut: () => void;
}

// Create the context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const loggedInUser = await getLoggedInUser();
                setUser(loggedInUser);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    // signOut method
    const signOut = async() => {
        try {
            await logout();
            setUser(null);
            toast.success('Logged out successfully')
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Failed to logout out, please try again');
        }
    }

    // Return the provider component with its value
    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, setUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using the authentication context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


