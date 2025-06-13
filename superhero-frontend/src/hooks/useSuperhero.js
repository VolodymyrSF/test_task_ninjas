import { useState, useEffect } from 'react';
import { superheroAPI } from '../lib/api';

// ХУК ДЛЯ ОТРИМАННЯ СПИСКУ З ПОШУКОМ
export const useSuperheroes = (page = 1, limit = 5, searchTerm = '') => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchSuperheroes = async () => {
    try {
      setLoading(true);
      const response = await superheroAPI.getAll(page, limit, searchTerm);
      setSuperheroes(response.data.superheroes);
      setTotalPages(response.data.totalPages);
      setTotal(response.data.total);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuperheroes();
  }, [page, limit, searchTerm]);

  return {
    superheroes,
    loading,
    error,
    totalPages,
    total,
    refetch: fetchSuperheroes,
  };
};

// ХУК ДЛЯ ОТРИМАННЯ ОДНОГО ГЕРОЯ
export const useSuperhero = (id) => {
  const [superhero, setSuperhero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchSuperhero = async () => {
      try {
        setLoading(true);
        const response = await superheroAPI.getById(id);
        setSuperhero(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuperhero();
  }, [id]);

  return { superhero, loading, error };
};
