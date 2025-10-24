
import React, { useState } from 'react';
import { Role, Page, User, Post } from './types';
import Header from './components/Header';
import PostList from './components/PostList';
import AIAssistant from './components/AIAssistant';
import SupervisorDashboard from './components/SupervisorDashboard';
import Footer from './components/Footer';
import NewPostForm from './components/NewPostForm'; // Import the new component

const mockUsers: { [key in Role]: User } = {
  [Role.Supervisor]: { id: 'user-sup', name: 'Dr. Supervisor', role: Role.Supervisor, avatarUrl: 'https://picsum.photos/seed/supervisor/100' },
  [Role.Docente]: { id: 'user-doc', name: 'Prof. Innovador', role: Role.Docente, avatarUrl: 'https://picsum.photos/seed/docente/100' },
  [Role.Publico]: { id: 'user-pub', name: 'Visitante', role: Role.Publico, avatarUrl: 'https://picsum.photos/seed/publico/100' },
};

const initialPosts: Post[] = [
  {
    id: 'post-1',
    author: mockUsers[Role.Docente],
    title: 'Estrategias Exitosas para Matemáticas en Aulas Multigrado',
    content: 'Hoy implementamos una estación de trabajo rotativa para enseñar fracciones. Los alumnos de 3° ayudaron a los de 2°, fomentando el aprendizaje colaborativo. La clave fue usar material concreto como legos y frutas. La participación aumentó un 80% y la comprensión fue notablemente mejor...',
    tags: ['multigrado', 'matemáticas', 'primaria', 'rural'],
    createdAt: '2024-07-29',
    imageUrl: 'https://picsum.photos/seed/math/800/400',
    likes: 15,
    comments: [
      { user: mockUsers[Role.Supervisor], text: 'Excelente iniciativa. ¿Podrías compartir la planeación detallada?', createdAt: '2024-07-29' }
    ],
  },
  {
    id: 'post-2',
    author: { id: 'user-doc-2', name: 'Profa. Creativa', role: Role.Docente, avatarUrl: 'https://picsum.photos/seed/docente2/100' },
    title: 'Proyecto de Ciencias: El Huerto Escolar Comunitario',
    content: 'Iniciamos nuestro proyecto de huerto escolar. Los estudiantes están aprendiendo sobre el ciclo de vida de las plantas, la responsabilidad y el trabajo en equipo. Este proyecto integra ciencias naturales con formación cívica y ética. Adjunto el PDF con la guía del proyecto.',
    tags: ['ciencias', 'proyecto', 'comunidad', 'sustentabilidad'],
    createdAt: '2024-07-28',
    imageUrl: 'https://picsum.photos/seed/garden/800/400',
    attachments: [{ name: 'Guia_Huerto.pdf', url: '#', type: 'pdf' }],
    likes: 22,
    comments: [],
  }
];


export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[Role.Docente]);
  const [page, setPage] = useState<Page>('home');
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleRoleChange = (role: Role) => {
    setCurrentUser(mockUsers[role]);
    if (role !== Role.Docente && page === 'new_post') {
        setPage('home');
    }
    if (role !== Role.Supervisor && page === 'dashboard') {
      setPage('home'); // Redirect if public user is on a restricted page
    }
  };

  const handleAddPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };
  
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <PostList posts={posts} currentUser={currentUser} />;
      case 'ai_assistant':
        return <AIAssistant />;
      case 'dashboard':
        return currentUser.role === Role.Supervisor ? <SupervisorDashboard /> : <PostList posts={posts} currentUser={currentUser} />;
      case 'new_post':
        return currentUser.role === Role.Docente ? <NewPostForm currentUser={currentUser} onAddPost={handleAddPost} setPage={setPage} /> : <PostList posts={posts} currentUser={currentUser} />;
      default:
        return <PostList posts={posts} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 font-sans">
      <Header 
        currentUser={currentUser} 
        setPage={setPage} 
        onRoleChange={handleRoleChange} 
      />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
