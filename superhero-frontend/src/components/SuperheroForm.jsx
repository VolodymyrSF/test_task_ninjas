import { useState, useEffect } from 'react';
import { superheroAPI } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, Save, Plus, X } from 'lucide-react';

const SuperheroForm = ({ id, onBack, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    images: ['']
  });

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const fetchSuperhero = async () => {
        try {
          setLoading(true);
          const response = await superheroAPI.getById(id);
          const superhero = response.data;
          setFormData({
            nickname: superhero.nickname || '',
            real_name: superhero.real_name || '',
            origin_description: superhero.origin_description || '',
            superpowers: superhero.superpowers || '',
            catch_phrase: superhero.catch_phrase || '',
            images: superhero.images && superhero.images.length > 0 ? superhero.images : ['']
          });
          setError(null);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchSuperhero();
    }
  }, [id, isEditing]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError(null);

      // Filter out empty image URLs
      const cleanedData = {
        ...formData,
        images: formData.images.filter(img => img.trim() !== '')
      };

      if (isEditing) {
        await superheroAPI.update(id, cleanedData);
      } else {
        await superheroAPI.create(cleanedData);
      }

      onSave();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading superhero...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Superhero' : 'Add New Superhero'}
        </h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Edit Superhero Details' : 'Create New Superhero'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">Nickname *</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  placeholder="e.g., Superman"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="real_name">Real Name *</Label>
                <Input
                  id="real_name"
                  value={formData.real_name}
                  onChange={(e) => handleInputChange('real_name', e.target.value)}
                  placeholder="e.g., Clark Kent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin_description">Origin Description *</Label>
              <Textarea
                id="origin_description"
                value={formData.origin_description}
                onChange={(e) => handleInputChange('origin_description', e.target.value)}
                placeholder="Describe the superhero's origin story..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="superpowers">Superpowers *</Label>
              <Textarea
                id="superpowers"
                value={formData.superpowers}
                onChange={(e) => handleInputChange('superpowers', e.target.value)}
                placeholder="List the superhero's powers..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="catch_phrase">Catch Phrase *</Label>
              <Input
                id="catch_phrase"
                value={formData.catch_phrase}
                onChange={(e) => handleInputChange('catch_phrase', e.target.value)}
                placeholder="e.g., Up, up and away!"
                required
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Images (URLs)</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageField}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Image
                </Button>
              </div>
              
              {formData.images.map((image, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1"
                  />
                  {formData.images.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeImageField(index)}
                      className="flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onBack}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="flex items-center gap-2">
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Saving...' : (isEditing ? 'Update' : 'Create')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperheroForm;

