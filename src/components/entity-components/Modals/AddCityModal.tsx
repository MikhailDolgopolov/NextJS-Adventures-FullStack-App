'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import CustomModal from '@/components/CustomModal';
import SearchInput from '@/components/SearchInput';
import LoadingError from '@/components/LoadingError';
import useFetch from '@/hooks/useFetch';
import { useState } from 'react';
import { post } from '@/lib/api';
import { Country } from '@/lib/typeorm/entities/Country';
import { City } from '@/lib/typeorm/entities/City';

interface Props {
  addCityButton: React.ReactNode;
  onAdd: () => void;
  defaultCountry?: string;
}

export default function AddCityModal({ addCityButton, onAdd, defaultCountry }: Props) {
  const [countries, loading] = useFetch<Country[]>('/api/countries');
  const [selectedCountry, setCountry] = useState(defaultCountry ?? '');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<City>();

  if (loading && !countries) return <LoadingError loadingObject="страна" loading />;
  if (!countries) return null;

  const onSubmit: SubmitHandler<City> = async (data: { country: string; }) => {
    if (!selectedCountry) {
      alert('Страна введена некорректно');
      return;
    }
    data.country = selectedCountry;
    await post('cities/create', data);
    onAdd();
    reset({ city: '' });
  };

  return (
    <CustomModal header="Добавить город" trigger={addCityButton}>
      <form onSubmit={handleSubmit(onSubmit)} className="vert-window">
        <div className="form-row">
          <label>Название:</label>
          <input {...register('city', { required: 'Название обязательно' })} />
          {errors.city && <span>{errors.city.message}</span>}
        </div>
        {!defaultCountry && (
          <div className="form-row">
            <label>Страна:</label>
            <SearchInput<Country>
              id="allCountries"
              array={countries}
              stringify={(c) => c.country}
              onSetValue={(c) => setCountry(c)}
              onlySelect
            />
          </div>
        )}
        <div className="form-row">
          <label>Население:</label>
          <input type="number" {...register('population', { valueAsNumber: true })} />
        </div>
        <div className="form-row">
          <label>Год основания:</label>
          <input type="number" {...register('founded_year', { valueAsNumber: true })} />
        </div>
        <button type="submit">Добавить</button>
      </form>
    </CustomModal>
  );
}
