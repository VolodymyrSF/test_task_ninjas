import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';

const SuperheroCard = ({ superhero, onView, onEdit, onDelete }) => {
  const firstImage = superhero.images && superhero.images.length > 0 
    ? superhero.images[0] 
    : '/placeholder-hero.jpg';

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="aspect-square w-full mb-3 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={firstImage}
            alt={superhero.nickname}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/placeholder-hero.jpg';
            }}
          />
        </div>
        <CardTitle className="text-lg font-bold text-center">
          {superhero.nickname}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            <strong>Real Name:</strong> {superhero.real_name}
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView(superhero._id)}
              className="flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(superhero._id)}
              className="flex items-center gap-1"
            >
              <Edit className="w-4 h-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(superhero._id)}
              className="flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperheroCard;

