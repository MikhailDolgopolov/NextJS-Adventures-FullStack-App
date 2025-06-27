'use client';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Country } from '@/lib/typeorm/entities/Country';
import { put } from '@/lib/api'; // метод для обновления по API
import { Input } from '@heroui/react';

interface CountryRowProps {
  prop: Country;
  onUpdated?: (updated: Country) => void;
}

export default function CountryRow({ prop, onUpdated }: CountryRowProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue]     = useState(prop.country);
  const inputRef = useRef<HTMLInputElement>(null);

  // Авто-фокус на инпут при входе в режим редактирования
  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const save = async () => {
    setEditing(false);
    if (value === prop.country) return;
    try {
      const payload = { ...prop, country: value };
      const updated = await put<Country, Country>(
        `/api/countries/update/${prop.country}`,
        payload
      );
      onUpdated?.(updated);
    } catch (e) {
      console.error(e);
      setValue(prop.country); // откат
      alert('Ошибка при сохранении');
    }
  };

  return (
    <tr className="hoverable">
      <td onDoubleClick={() => setEditing(true)}>
        {editing ? (
          <Input
            ref={inputRef}
            value={value}
            onChange={(e:ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            onBlur={save}
            onKeyDown={(e: { key: string; }) => e.key === 'Enter' && save()}
          />
        ) : (
          value
        )}
      </td>
      <td>{prop.population || ''}</td>
      <td>{prop.area || ''}</td>
      <td>{prop.capital_city || ''}</td>
    </tr>
  );
}
