'use client';

import { FC, ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import CustomModal from '@/components/CustomModal';
import SearchInput from '@/components/SearchInput';
import { post } from '@/lib/api';
import { City } from '@/lib/typeorm/entities/City';
import { Country } from '@/lib/typeorm/entities/Country';

interface EditCountryModalProps {
  trigger: ReactNode;
  country: Country;
  cities: City[];
  onChange: () => void;
}

const EditCountryModal: FC<EditCountryModalProps> = ({
  trigger,
  country,
  cities,
  onChange,
}) => {
  const { handleSubmit, reset } = useForm<Country>();
  const router = useRouter();

  // 1) Use state instead of a local variable
  const [selectedCapital, setSelectedCapital] = useState<string>(
    country.capital_city ?? ''
  );

  // 2) Prefill form + sync selectedCapital when "country" prop changes
  useEffect(() => {
    reset({
      country: country.country,
      population: country.population,
      area: country.area,
      capital_city: country.capital_city,
    });
    setSelectedCapital(country.capital_city ?? '');
  }, [country, reset]);

  const onSubmit = handleSubmit(async (data, e) => {
    e?.preventDefault();
    data.capital_city = selectedCapital;

    try {
      const updated = await post<Country, Country>(
        `countries/update/${country.country}`,
        data
      );
      if (updated.country !== country.country) {
        router.push(`/data/countries/${updated.country}`);
      }
      onChange();
    } catch (err) {
      console.error('Update failed:', err);
      alert('Ошибка при обновлении страны.');
    }
  });

  return (
    <CustomModal trigger={trigger} header="Изменить данные" onClose={onChange}>
      <form className="vert-window" onSubmit={onSubmit}>
        {/* ... other form rows ... */}

        <div className="form-row">
          <label>Столица:</label>
          <SearchInput<City>
            id="capitalSearch"
            array={cities}
            stringify={(c) => c.city}
            defaultValue={selectedCapital}
            onSetValue={(c) => setSelectedCapital(c)}
            onlySelect
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Сохранить
        </button>
      </form>
    </CustomModal>
  );
};

export default EditCountryModal;
