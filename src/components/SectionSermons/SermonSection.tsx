// components/SermonSection.tsx
import React from 'react';
import { SermonCard } from './SermonCard';

interface Sermon {
  image: string;
  title: string;
  speaker: string;
  categories: string[];
  date: string;
}

interface SermonSectionProps {
  sermons: Sermon[];
}

export const SermonSection: React.FC<SermonSectionProps> = ({ sermons }) => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-4xl font-bold">Latest Sermons</h2>
      <p className="italic mt-2 text-gray-600">iPod? iPad? Try iPray...</p>
      <div className="mt-6 w-8 h-1 bg-gray-300 mx-auto mb-12 rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
        {sermons.map((sermon, index) => (
          <SermonCard key={index} {...sermon} />
        ))}
      </div>
    </section>
  );
};
