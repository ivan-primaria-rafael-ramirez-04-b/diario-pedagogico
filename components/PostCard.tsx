
import React from 'react';
import { Post, User, Role } from '../types';
import { FileText, Video, Link, MessageCircle, Heart, Edit, Trash2 } from 'lucide-react';

// Using lucide-react SVGs directly for simplicity, assuming it's available.
// If not, these would be custom SVG components.

interface PostCardProps {
  post: Post;
  currentUser: User;
}

const iconMap = {
  pdf: <FileText className="w-4 h-4 mr-2" />,
  video: <Video className="w-4 h-4 mr-2" />,
  link: <Link className="w-4 h-4 mr-2" />,
};

const PostCard: React.FC<PostCardProps> = ({ post, currentUser }) => {
  const canEdit = currentUser.role === Role.Supervisor || currentUser.id === post.author.id;

  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden transition-shadow hover:shadow-xl">
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />}
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full mr-4 border-2 border-red-200" />
          <div>
            <p className="font-semibold text-gray-800">{post.author.name}</p>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          {canEdit && (
            <div className="ml-auto flex items-center space-x-2">
               <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                 <Edit size={18} />
               </button>
               <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full transition-colors">
                 <Trash2 size={18} />
               </button>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-red-900 mb-2">{post.title}</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">#{tag}</span>
          ))}
        </div>
        
        {post.attachments && post.attachments.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-600 mb-2">Archivos Adjuntos:</h4>
            <div className="flex flex-col space-y-2">
              {post.attachments.map(att => (
                <a href={att.url} key={att.name} className="flex items-center text-red-800 hover:underline">
                  {iconMap[att.type]} {att.name}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pt-4 flex justify-between items-center text-gray-600">
          <div className="flex space-x-6">
            <button className="flex items-center space-x-1 hover:text-red-700">
              <Heart size={20} />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-700">
              <MessageCircle size={20} />
              <span>{post.comments.length} Comentarios</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
