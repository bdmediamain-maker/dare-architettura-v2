'use client';

import { useState, useMemo } from 'react';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { projects, categories } from '@/lib/data/projects';
import { translateProjects } from '@/lib/i18n/translateProject';

interface ProjectsGalleryProps {
  locale: string;
  labels: Record<string, string>;
}

export function ProjectsGallery({ locale, labels }: ProjectsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<'tutti' | (typeof categories)[number]['key']>('tutti');
  const localised = useMemo(() => translateProjects(projects, locale), [locale]);

  const filtered =
    activeCategory === 'tutti'
      ? localised
      : localised.filter(p => p.categoria === activeCategory);

  const tabs: { key: 'tutti' | (typeof categories)[number]['key']; label: string }[] = [
    { key: 'tutti', label: labels.tutti },
    ...categories.map(c => ({ key: c.key, label: labels[c.key] || c.label })),
  ];

  return (
    <>
      {/* Category tabs */}
      <div className="border-b border-black mb-12 -mx-2">
        <div className="flex flex-wrap gap-8 px-2">
          {tabs.map(tab => {
            const active = activeCategory === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                style={{
                  fontSize: '15px',
                  fontWeight: active ? 500 : 400,
                  color: active ? '#000' : '#888888',
                  paddingBottom: '12px',
                  borderBottom: active ? '1px solid #000' : '1px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color 200ms ease',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                className="hover:!text-black"
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-10">
        {filtered.map(project => (
          <ProjectCard
            key={project.id}
            slug={project.slug}
            titolo={project.titolo}
            sottotitolo={project.sottotitolo}
            anno={project.anno}
            pictogram={project.pictogram}
            thumbnail={project.thumbnail}
            luogo={project.luogo}
            categoria_label={labels[project.categoria] || project.categoria_label}
            locale={locale}
          />
        ))}
      </div>
    </>
  );
}
