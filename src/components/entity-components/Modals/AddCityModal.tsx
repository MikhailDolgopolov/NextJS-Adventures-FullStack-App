'use client';

import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSWR from 'swr';
import CustomModal from '@/components/CustomModal';
import SearchInput from '@/components/SearchInput';
import LoadingError from '@/components/LoadingError';
import { City } from '@/lib/typeorm/entities/City';
import { Country } from '@/lib/typeorm/entities/Country';
import { post } from '@/lib/api';

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json() as Promise<Country[]>;
  });

interface Props {
  openTrigger: React.ReactNode;
  onAdd: () => void;
  defaultCountry?: string;
}

export const AddCityModal: FC<Props> = ({ openTrigger, onAdd, defaultCountry }) => {
  const { data: countries, error } = useSWR<Country[]>('/api/countries/all', fetcher);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<City>({ defaultValues: { country: defaultCountry || '' } });

  watch('country');

  // Reset the 'city' field when modal closes/reopens
  useEffect(() => {
    reset({ city: '', population: 0, founded_year: 0, country: defaultCountry || '' });
  }, [defaultCountry, reset]);

  if (error) {
    return <LoadingError loadingObject="страны" loading={false} />;
  }
  if (!countries) {
    return null;
  }

  const onSubmit: SubmitHandler<City> = async (data) => {
    if (!data.country) {
      alert('Страна введена некорректно');
      return;
    }
    try {
      await post<City, City>('cities/create', data);
      onAdd();
    } catch (e) {
      console.error('Failed to add city', e);
      alert('Ошибка при добавлении города.');
    }
  };

  return (
    <CustomModal
      header="Добавить город"
      trigger={openTrigger}
      onCloseCallback={() => {
        reset({ city: '', population: 0, founded_year: 0, country: defaultCountry || '' });
      }}
    >
      <form className="vert-window" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label>Название:</label>
          <input {...register('city', { required: 'Название обязательно' })} />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </div>

        {!defaultCountry && (
          <div className="form-row">
            <label>Страна:</label>
            <SearchInput<Country>
              id="countrySearch"
              array={countries}
              stringify={(c) => c.country}
              defaultValue={defaultCountry}
              onlySelect
              onSetValue={(c) => reset({ ...watch(), country: c })}
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

        <button type="submit" className="btn btn-primary">
          Добавить
        </button>
      </form>
    </CustomModal>
  );
};

export default AddCityModal;