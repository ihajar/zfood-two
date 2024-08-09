// import { getLoggedInUser } from "@/api/users";
// import { User } from "@/models/user";
// import React, { createContext, useContext, useEffect, useState } from "react";
// interface AuthContextType {
//     user: User | null;
//     isAuthenticated: boolean;
//     loading: boolean;
//     setUser: (user: User | null) => void;
//     setIsAuthenticated: (isAuthenticated: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
//     const [user, setUser] = useState<User | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const fetchUser = async() => {
//             try {
//                 const loggedInUser = await getLoggedInUser();
//                 setUser(loggedInUser);
//                 setIsAuthenticated(true);
//             } catch {
//                 setUser(null);
//                 setIsAuthenticated(false);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUser();
//     }, []);
//     return (
//         <AuthContext.Provider value={{ user, isAuthenticated, loading, setUser, setIsAuthenticated }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if(context === undefined) {
//         throw new Error('useAuth must ne used within an AuthProvider');
//     }
//     return context;
// }

// With React QUERY

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getLoggedInUser, logout } from '@/api/users';
import { User } from '@/models/user';

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
        } catch (error) {
            console.error('Logout error:', error);
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


