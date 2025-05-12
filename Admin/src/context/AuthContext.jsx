import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (credentials) => {
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                setUser({ adminId: data.adminId });
                return true;
            }

            return false;
        } catch (err) {
            console.error("Login failed:", err);
            return false;
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/admin/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    useEffect(() => {
        // Optional: could ping a protected route to check session
        setLoading(false); // Skip if no `/me`
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
