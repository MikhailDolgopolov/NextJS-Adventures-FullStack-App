'use client';

import { useRouter } from 'next/navigation';

import TitleSubtitle from '@/components/TitleSubtitle';
import AddTripModal from '@/components/entity-components/Modals/AddTripModal';
import useSwitch from '@/hooks/useSwitch';
import YearSplitTrips from '@/components/entity-components/YearSplitTrips';
import { PlusIcon } from '@heroicons/react/24/outline'

export default function GroupedTrips() {
  const [flag, changeFlag] = useSwitch();
  const router = useRouter();

  return (
    <>
      <TitleSubtitle title="Путешествия" />
      

      <div className="side-margins">
        <div className="top-row">
          <div className="right">
            <AddTripModal
        openTrigger={
        <button className="big center-child square">
              <PlusIcon />
            </button>}
          
        onAdd={(trip) => {
          changeFlag();
          router.push(`/trip/${trip.trip_id}`);
        }}
      />
          </div>
        </div>

        <YearSplitTrips />
      </div>
    </>
  );
}
