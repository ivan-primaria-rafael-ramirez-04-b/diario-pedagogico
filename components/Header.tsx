
import React from 'react';
import { Role, Page, User } from '../types';

interface HeaderProps {
  currentUser: User;
  setPage: (page: Page) => void;
  onRoleChange: (role: Role) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, setPage, onRoleChange }) => {
  return (
    <header className="bg-red-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-2 md:mb-0">
            <h1 className="text-xl lg:text-2xl font-bold">Diario Pedagógico Digital</h1>
            <p className="text-sm text-gray-300">Supervisión Escolar 32FIZ0091U - Villanueva, Zacatecas</p>
          </div>
          <div className="flex items-center space-x-4">
             {/* Role Switcher for Demo */}
            <div className="flex items-center space-x-2 bg-red-800 p-2 rounded-md">
                <label htmlFor="role-select" className="text-sm font-medium">Simular Rol:</label>
                <select 
                    id="role-select"
                    value={currentUser.role}
                    onChange={(e) => onRoleChange(e.target.value as Role)}
                    className="bg-red-700 text-white border-none rounded-md text-sm focus:ring-2 focus:ring-white"
                >
                    <option value={Role.Supervisor}>Supervisor</option>
                    <option value={Role.Docente}>Docente</option>
                    <option value={Role.Publico}>Público</option>
                </select>
            </div>
          </div>
        </div>
        <nav className="mt-3 border-t border-red-700 pt-2 flex justify-center md:justify-start space-x-6 text-sm md:text-base">
          <button onClick={() => setPage('home')} className="hover:text-gray-200 hover:underline">Inicio</button>
          <button onClick={() => setPage('ai_assistant')} className="hover:text-gray-200 hover:underline">Asistente IA</button>
          {currentUser.role === Role.Supervisor && (
            <button onClick={() => setPage('dashboard')} className="hover:text-gray-200 hover:underline">Panel de Control</button>
          )}
          {currentUser.role === Role.Docente && (
            <button 
              onClick={() => setPage('new_post')}
              className="bg-white text-red-900 font-bold py-1 px-3 rounded-md hover:bg-gray-200 transition-colors">
              Nueva Publicación
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
