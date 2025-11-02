import { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const PopularTopics = ({ setBlogPosts, fetchNews }) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const topics = [
    "Inteligencia Artificial", "Criptomonedas", "Bitcoin", "Blockchain", "Negocios", 
    "Marketing Digital", "E-commerce", "Fintech", "Startups", "Innovación",
    "Transformación Digital", "Ciberseguridad", "Economía Digital", "Big Data", 
    "Análisis de Datos", "Emprendimiento", "Tecnología Financiera", "Publicidad Online",
    "Automatización", "Desarrollo de Software"
  ];

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
    fetchNews(topic.toLowerCase());

    // Scroll hacia arriba
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">Temas Populares</h2>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <button
            key={index}
            onClick={() => handleTopicClick(topic.toLowerCase())}
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-blue-400 hover:text-white transition-all duration-200
              ${selectedTopic === topic.toLowerCase() ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTopics;
