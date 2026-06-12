import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const role = localStorage.getItem('role');
        
        if (token && username && role) {
            setUser({ token, username, role });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; //Adds JWT token automatically.
        }
        setLoading(false);
    }, []);  // run only once when component loads 

    const login = async (username, password) => {
        const response = await axios.post('http://localhost:8081/api/auth/login', { username, password });
        const { token, role } = response.data;  // backend response
        
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('role', role);
        
        setUser({ token, username, role });
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return response.data;   // return response 
    };  

    const register = async (userData) => {
        const response = await axios.post('http://localhost:8081/api/auth/register', userData);
        return response.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        setUser(null);  // not logged in 
        delete axios.defaults.headers.common['Authorization'];  // remove jwt token from axios
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    ); // Making Authentication Data available to all components.
};
