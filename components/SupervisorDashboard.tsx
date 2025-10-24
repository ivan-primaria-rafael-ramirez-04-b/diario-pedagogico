
import React from 'react';
import { Users, FileText, BarChart2 } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="bg-red-100 text-red-800 p-4 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};


const SupervisorDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-red-900">Panel de Control del Supervisor</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Publicaciones Totales" value="48" icon={<FileText size={28} />} />
        <StatCard title="Docentes Activos" value="12 / 15" icon={<Users size={28} />} />
        <StatCard title="Participación Promedio" value="85%" icon={<BarChart2 size={28} />} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Actividad Reciente</h3>
        <ul className="divide-y divide-gray-200">
            <li className="py-3">
                <p><strong className="text-red-800">Prof. Innovador</strong> ha publicado <a href="#" className="underline">"Estrategias Exitosas para Matemáticas..."</a></p>
                <p className="text-sm text-gray-500">hace 2 horas</p>
            </li>
            <li className="py-3">
                <p><strong className="text-red-800">Profa. Creativa</strong> ha comentado en <a href="#" className="underline">"Fomentando la Lectura en Primaria"</a></p>
                <p className="text-sm text-gray-500">hace 5 horas</p>
            </li>
            <li className="py-3">
                <p>Se ha generado un <strong className="text-red-800">Reporte de Participación Mensual</strong>.</p>
                <p className="text-sm text-gray-500">hace 1 día</p>
            </li>
        </ul>
        <button className="mt-4 bg-red-800 text-white font-bold py-2 px-4 rounded-md hover:bg-red-900 transition-colors">
            Generar Reporte PDF
        </button>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
