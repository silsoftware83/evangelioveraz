// components/SermonCard.tsx
import React from 'react';
import { BookOpenIcon, HeadphonesIcon, DownloadIcon, ShareIcon } from 'lucide-react';

interface SermonCardProps {
  image: string;
  title: string;
  speaker: string;
  categories: string[];
  date: string;
}

export const SermonCard: React.FC<SermonCardProps> = ({ image, title, speaker, categories, date }) => {
  return (
    <div className="flex flex-col max-w-sm">
      <img src={image} alt={title} className="w-full h-64 object-cover rounded-t-xl" />
      <div className="flex items-center gap-4 mt-4 text-gray-500 text-sm">
        <BookOpenIcon className="w-5 h-5" />
        <HeadphonesIcon className="w-5 h-5" />
        <DownloadIcon className="w-5 h-5" />
        <ShareIcon className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-semibold text-red-600 mt-4">{title}</h3>
      <p className="italic text-gray-700 mt-2">Speaker: <span className="not-italic text-gray-900">{speaker}</span></p>
      <p className="italic text-gray-700">Categories: <span className="not-italic text-gray-900">{categories.join(', ')}</span></p>
      <p className="text-sm text-gray-500 mt-1">{date}</p>
    </div>
  );
};
