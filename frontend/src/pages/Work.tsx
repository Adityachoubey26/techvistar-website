import { useProjectFilters, SortOption } from '@/hooks/useProjectFilters';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const Work = () => {
  const {
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
  } = useProjectFilters();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen bg-slate-50">
        <Navbar />

        {/* Work Hero */}
        <section className="pt-32 pb-16 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-display">
              Our Work
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Explore our portfolio of production-ready systems spanning logistics routing, natural language processing, financial workspaces, and applied machine learning.
            </p>
            <div className="mt-6 text-sm text-slate-500 font-semibold">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </div>
          </div>
        </section>

        {/* Filters & Control Panel */}
        <section className="py-8 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col gap-6">
              
              {/* Search Bar */}
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-slate-200 focus-visible:ring-primary"
                />
              </div>

              {/* Filters & Sorting Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(cat)}
                      className={
                        selectedCategory === cat
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }
                    >
                      {cat}
                    </Button>
                  ))}
                </div>

                {/* Status & Sorting */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* Status Toggle Buttons */}
                  <div className="flex border border-slate-200 rounded-lg overflow-hidden bg-white p-0.5">
                    {(['All', 'Completed', 'In Progress'] as const).map((status) => (
                      <Button
                        key={status}
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedStatus(status)}
                        className={`px-3 py-1.5 h-auto text-xs font-medium rounded-md transition-colors ${
                          selectedStatus === status
                            ? 'bg-slate-100 text-slate-900 font-semibold'
                            : 'text-slate-500 hover:text-slate-950'
                        }`}
                      >
                        {status}
                      </Button>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="w-48">
                    <Select
                      value={sortBy}
                      onValueChange={(value) => setSortBy(value as SortOption)}
                    >
                      <SelectTrigger className="bg-white border-slate-200">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="a-z">Alphabetical (A-Z)</SelectItem>
                        <SelectItem value="z-a">Alphabetical (Z-A)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            {filteredProjects.length > 0 ? (
              <ProjectsGrid projects={filteredProjects} />
            ) : (
              /* Empty State */
              <div className="text-center py-16 bg-white border border-slate-200 rounded-xl max-w-md mx-auto px-6">
                <h3 className="text-lg font-bold text-slate-800 mb-2">No projects found.</h3>
                <p className="text-slate-500 text-sm">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default Work;
