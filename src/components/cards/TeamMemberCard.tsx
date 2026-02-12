import Image from 'next/image';
import { Linkedin, Twitter } from 'lucide-react';

import React from 'react'; // Добавлен импорт React

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
}

// Обернули компонент в React.memo для оптимизации перерисовок
const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(function TeamMemberCard({ name, role, imageUrl }) {
  return (
    <div className="text-center p-3">
      <div className="relative w-32 h-32 mx-auto mb-2">
        <Image
          src={imageUrl}
          alt={`Фотография ${name}`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <h3 className="font-heading text-h4 font-bold text-primary">{name}</h3>
      <p className="text-body text-accent">{role}</p>
      <div className="flex justify-center gap-1 mt-1">
        <a href="#" aria-label="Twitter" className="text-text-muted hover:text-accent transition-colors"><Twitter size={24} /></a>
        <a href="#" aria-label="LinkedIn" className="text-text-muted hover:text-accent transition-colors"><Linkedin size={24} /></a>
      </div>
    </div>
  );
});

export default TeamMemberCard;