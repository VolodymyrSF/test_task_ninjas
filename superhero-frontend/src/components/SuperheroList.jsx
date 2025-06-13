import { useState, useEffect} from 'react';
import axios from 'axios';
import { useSuperheroes } from '../hooks/useSuperhero';
import { superheroAPI } from '../lib/api';
import SuperheroCard from './SuperheroCard';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const SuperheroList = ({ onView, onEdit, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');



  const { superheroes, loading, error, totalPages, total, refetch } = useSuperheroes(currentPage, 5, appliedSearchTerm);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this superhero?')) {
      try {
        await superheroAPI.delete(id);
        refetch();
      } catch (err) {
        alert('Failed to delete superhero: ' + err.message);
      }
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading superheroes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading superheroes: {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Superheroes ({total})</h2>
          <Button onClick={onAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Superhero
          </Button>
        </div>

        <div className="flex gap-2">
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by nickname..."
              className="border p-2 rounded w-full"
          />

          <Button onClick={() => {
            setAppliedSearchTerm(searchTerm);
            setCurrentPage(1);
          }}>Search</Button>
        </div>



  {(superheroes?.length ?? 0) === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No superheroes found.</p>
          <Button onClick={onAdd}>Add Your First Superhero</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {superheroes.map((superhero) => (
              <SuperheroCard
                key={superhero._id}
                superhero={superhero}
                onView={onView}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SuperheroList;

