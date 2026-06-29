import { useState, useMemo } from 'react';
import { PROJECTS, Project } from '../data/projects';

export type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

export const useProjectFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  // Compute unique categories dynamically from PROJECTS
  const categories = useMemo(() => {
    const list = new Set(PROJECTS.map((p) => p.category));
    return ['All', ...Array.from(list)];
  }, []);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...PROJECTS];

    // 1. Search Query Filter (Title, Description, Tags - case insensitive)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // 2. Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 3. Status Filter
    if (selectedStatus !== 'All') {
      result = result.filter((p) => p.status === selectedStatus);
    }

    // 4. Sorting logic
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  return {
    filteredProjects,
    categories,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    sortBy,
    setSortBy,
  };
};
