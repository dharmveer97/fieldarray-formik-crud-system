import { useState, useEffect } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com';

interface UseCrudReturn<T extends { id: number }> {
  items: T[];
  loading: boolean;
  error: string | null;
  createItem: (item: Omit<T, 'id'>) => Promise<void>;
  updateItem: (id: number, item: Partial<T>) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
}

export function useCrud<T extends { id: number }>(
  endpoint: string,
  transformer?: (data: unknown[]) => T[]
): UseCrudReturn<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${API_URL}/${endpoint}`);
        const data = await res.json();
        setItems(transformer ? transformer(data) : data.slice(0, 5));
      } catch {
        setError('Failed to fetch');
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [endpoint]);

  const createItem = async (item: Omit<T, 'id'>) => {
    await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    setItems(prev => [...prev, { ...item, id: Date.now() } as T]);
  };

  const updateItem = async (id: number, item: Partial<T>) => {
    await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    setItems(prev => prev.map(i => (i.id === id ? { ...i, ...item } : i)));
  };

  const deleteItem = async (id: number) => {
    await fetch(`${API_URL}/${endpoint}/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return { items, loading, error, createItem, updateItem, deleteItem };
}
