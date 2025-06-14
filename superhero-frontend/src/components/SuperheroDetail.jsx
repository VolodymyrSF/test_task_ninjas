import { useSuperhero } from '../hooks/useSuperhero';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, Edit } from 'lucide-react';

const SuperheroDetail = ({ id, onBack, onEdit }) => {
  const { superhero, loading, error } = useSuperhero(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading superhero details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading superhero: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (!superhero) {
    return (
      <Alert>
        <AlertDescription>
          Superhero not found.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Button>
        <Button onClick={() => onEdit(id)} className="flex items-center gap-2">
          <Edit className="w-4 h-4" />
          Edit Superhero
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {superhero.nickname}
          </CardTitle>
          <p className="text-xl text-center text-muted-foreground">
            {superhero.real_name}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Origin Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              {superhero.origin_description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Superpowers</h3>
            <p className="text-muted-foreground leading-relaxed">
              {superhero.superpowers}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Catch Phrase</h3>
            <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
              "{superhero.catch_phrase}"
            </blockquote>
          </div>

          {Array.isArray(superhero.images) && superhero.images.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Images</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {superhero.images.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={image}
                      alt={`${superhero.nickname} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        if (e.target.src !== '/placeholder-hero.jpg') {
                          e.target.src = '/placeholder-hero.jpg';
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperheroDetail;

