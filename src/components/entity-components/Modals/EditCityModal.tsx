'use client';

import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import CustomModal from '@/components/CustomModal';
import SearchInput from '@/components/SearchInput';
import { City } from '@/lib/typeorm/entities/City';
import { Country } from '@/lib/typeorm/entities/Country';
import { post } from '@/lib/api';

const fetcher = (url: string) =>
  fetch(url).then(r => {
    if (!r.ok) throw new Error('Failed to fetch');
    return r.json() as Promise<Country[]>;
  });

interface EditCityModalProps {
  city: City;
  openTrigger: React.ReactNode;
  onChange: () => void;
  onClose?: () => void;
}

export const EditCityModal: FC<EditCityModalProps> = ({
  city,
  openTrigger,
  onChange,
  onClose,
}) => {
  const router = useRouter();
  const { data: countries, error } = useSWR<Country[]>('/api/countries', fetcher);

  const { register, handleSubmit, reset, watch } = useForm<City>();

  // Reset form whenever `city` changes or modal re-opens
  useEffect(() => {
    reset({
      city: city.city,
      population: city.population,
      founded_year: city.founded_year,
      country: city.country,
    });
  }, [city, reset]);

  // Submission handler
  const onSubmit: SubmitHandler<City> = async (data) => {
    try {
      const updated: City = await post<City, City>(
        `cities/update/${city.city}`,
        data
      );
      onChange(); // notify parent
      if (updated.city !== city.city) {
        router.push(`/data/cities/${updated.city}`);
      }
    } catch (e) {
      console.error('Update failed', e);
      alert('Ошибка при обновлении города.');
    }
  };

  // Loading / Error states for country list
  if (error) {
    return <p className="note">Не удалось загрузить страны.</p>;
  }
  if (!countries) {
    return null; // or a spinner
  }

  return (
    <CustomModal
      header="Изменить город"
      trigger={openTrigger}
      onClose={() => {
        onChange();
        onClose?.();
        reset();
      }}
    >
      <form className="vert-window" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <label>Название:</label>
          <input
            defaultValue={city.city}
            {...register('city', { required: true })}
          />
        </div>

        <div className="form-row">
          <label>Страна:</label>
          <SearchInput<Country>
            id="countrySearch"
            array={countries}
            stringify={c => c.country}
            defaultValue={city.country}
            onlySelect
            onSetValue={value => reset({ ...watch(), country: value })}
          />
        </div>

        <div className="form-row">
          <label>Население:</label>
          <input
            type="number"
            defaultValue={city.population}
            {...register('population', { valueAsNumber: true })}
          />
        </div>

        <div className="form-row">
          <label>Год основания:</label>
          <input
            type="number"
            defaultValue={city.founded_year}
            {...register('founded_year', { valueAsNumber: true })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </CustomModal>
  );
};

export default EditCityModal;