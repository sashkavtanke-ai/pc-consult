'use client';

import { useState } from 'react'; // Для управления состоянием модального окна
// Импортируем компонент PageHeader из layout
import PageHeader from "@/components/layout/PageHeader";
import TeamMemberCard from "@/components/cards/TeamMemberCard";
import dynamic from "next/dynamic"; // ленивый импорт
const Modal = dynamic(() => import("@/components/layout/Modal")); // ленивый импорт модального окна
import { motion } from 'framer-motion';
import { staggerContainer, fadeInItem } from '@/lib/animations';
import Image from 'next/image';

interface TeamMember {
 name: string;
 role: string;
 imageUrl: string;
 bio: string;
}

// Массив сотрудников с биографией
const teamMembers: TeamMember[] = [
  {
    name: 'Комков Георгий',
    role: 'Управление и экономика',
    imageUrl: '/team/komkov.jpg',
    bio: 'Ведущий эксперт по управлению и экономике с опытом оптимизации бизнес-моделей и повышения операционной эффективности на 30%. Помогает компаниям находить баланс между ростом и рентабельностью.',
  },
  {
    name: 'Ратаев Василий',
    role: 'Экономика, финансы и налоги',
    imageUrl: '/team/rataev.jpg',
    bio: 'Профессионал в области корпоративных финансов и налогового планирования. Сократил налоговые выплаты своих клиентов на 20% без рисков и ошибок в отчетности.',
  },
  {
    name: 'Чернышев Виктор',
    role: 'Бизнес-архитектура и автоматизация',
    imageUrl: '/team/chernyshev.jpg',
    bio: 'Специалист по построению архитектуры процессов и автоматизации. Внедрил цифровые решения, которые сократили операционные издержки более чем на 25%.',
  },
];

export default function TeamPage() {
 // Состояние для выбранного сотрудника (открытие модального окна)
 const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

 return (
   <main>
     <PageHeader
       title="Наша команда"
       subtitle="Движущая сила нашего успеха — это люди. Познакомьтесь с экспертами, которые будут работать над вашими проектами."
       className="mt-28 md:mt-32 frosted-glass py-16 md:py-20 text-center overflow-hidden"
     />
     
     <div className="container mx-auto px-6 py-6">
       <motion.div
         variants={staggerContainer}
         initial="hidden"
         animate="show"
         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
       >
         {teamMembers.map((member) => (
           <motion.div
             variants={fadeInItem}
             key={member.name}
             onClick={() => setSelectedMember(member)}
             className="frosted-glass  p-8 rounded-card shadow-md text-center flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1 my-4"
           >
            <TeamMemberCard {...member} />
           </motion.div>
         ))}
       </motion.div>
     </div>

    {/* Модальное окно с биографией сотрудника */}
    <Modal
      isOpen={!!selectedMember}
      onClose={() => setSelectedMember(null)}
      variant="people"
    >
       {selectedMember && (
         <div className="text-center p-8 max-w-md mx-auto my-8">
           <Image
             src={selectedMember.imageUrl}
             alt={`Фотография ${selectedMember.name}`}
             className="w-40 h-40 rounded-full mx-auto mb-4 object-cover"
             width={160}
             height={160}
           />
           <h2 className="font-heading text-h2 font-bold text-primary">{selectedMember.name}</h2>
           <p className="text-accent font-semibold text-body mb-4">{selectedMember.role}</p>
           <p className="text-body text-text-muted text-left">{selectedMember.bio}</p>
         </div>
       )}
     </Modal>
   </main>
 );
}