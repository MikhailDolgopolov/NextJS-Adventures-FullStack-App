'use client';

import CityRow from "../../components/entity-components/Rows/CityRow";
import CountryRow from "../../components/entity-components/Rows/CountryRow";
import PersonRow from "../../components/entity-components/Rows/PersonRow";
import AddCountryModal from "../../components/entity-components/Modals/AddCountryModal";
import AddCityModal from "../../components/entity-components/Modals/AddCityModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import AddPersonModal from "../../components/entity-components/Modals/AddPersonModal";
import SouvenirRow from "../../components/entity-components/Rows/SouvenirRow";
import useSwitch from '@/hooks/useSwitch';
import useFetch from '@/hooks/useFetch';
import { AdventuresStatistics } from '@/Helpers/HelperTypes';
import LoadingError from '@/components/LoadingError';
import TitleSubtitle from '@/components/TitleSubtitle';
import Statistics from './Statistics';

function StaticData() {
    const [refetch, flip] = useSwitch()
    const [stats, loadingStats] = useFetch<AdventuresStatistics>("statistics/", refetch)


    if(!stats) return <LoadingError loadingObject={"данные"} loading={loadingStats} wholePage={true}/>
    const countryTable = stats.countries.map(
        country=><CountryRow key={country.country} prop={country}/>)
    const cityTable=stats.cities.map(city=>
        <CityRow key={city.city} prop={city}/>)
    const personTable=stats.people.map(
        person=><PersonRow key={person.person_id} prop={person}/>
    )

    return (<>
        <TitleSubtitle title={"База данных"}/>        
        
        <div className="two-columns side-margins">
            <div className="flow-down">
                <section>
                    <h2>Страны</h2>
                    <table>
                        <tbody>
                            <tr>
                                <th>Название</th>
                                <th>Население</th>
                                <th>Площадь, км<sup>2</sup></th>
                                <th>Столица</th>
                            </tr>
                            <tr className="hoverable button">
                                <AddCountryModal onAdd={()=>{flip()}} addCountryButton={<td colSpan={4}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                </td>}></AddCountryModal>
                                
                            </tr>
                            {countryTable}
                        </tbody>
                    </table>
                </section>
                <section>
                    <h2>Города</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Страна</th>
                            <th>Население</th>
                            <th>Год основания</th>
                        </tr>
                        <tr className="hoverable button">
                            <AddCityModal onAdd={()=>{flip()}} addCityButton={
                                <td colSpan={4}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </td>}/>
                            
                        </tr>
                        {cityTable}
                        </tbody>
                    </table>

                </section>
            </div>
            <div className="flow-down">
                <section>
                    <h2>Люди</h2>
                    <table>
                        <tbody>
                        <tr>
                            <th>Сокращение</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                        </tr>
                        <tr className="hoverable button">
                            <AddPersonModal onAdd={()=>{flip()}} 
                            addPersonButton={
                                <td colSpan={4}>
                                <FontAwesomeIcon icon={faPlus}/>
                            </td>
                        }>
                            
                            </AddPersonModal>
                        </tr>
                        {personTable}
                        </tbody>
                    </table>
                </section>
                <section>
                    <h2>Сувениры</h2>
                    <table><tbody>
                    <tr>
                        <th>Название</th>
                        <th>Город</th>
                        <th>Тип</th>
                        <th>Материал</th>
                    </tr>
                    {stats.souvenirs.map(s=><SouvenirRow s={s} key={s.souvenir_id}/>)}
                    </tbody></table>
                </section>
                <section>
                   <Statistics data={stats} loading={loadingStats}/>
                </section>
            </div>
        </div>
        </>);
}

export default StaticData;