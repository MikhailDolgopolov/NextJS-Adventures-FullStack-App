import CustomModal from '@/components/CustomModal';
import { post } from '@/lib/api';
import { Country } from '@/lib/typeorm/entities/Country';
import React from 'react';
import {useForm} from "react-hook-form";


function AddCountryModal({addCountryButton, onAdd}:{onAdd:()=>void,
    addCountryButton:React.ReactNode}) {
    const {register, handleSubmit, reset} = useForm<Country>();
    const onSubmit = handleSubmit((data,e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        post("countries/create/", JSON.stringify(data)).then(()=>{onAdd(); reset();})
    })
    return (
        <CustomModal header="Добавить страну" trigger={addCountryButton} onClose={reset}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Название</label>
                    <input required={true} {...register("country")}/>
                </div>
                <div className="form-row">
                    <label>Население</label>
                    <input type="number" {...register("population")}/>
                </div>
                <div className="form-row">
                    <label>Площадь</label>
                    <input type="number" {...register("area")}/>
                </div>
                <div className="form-row">
                    <label>Столица</label>
                    <input {...register("capital_city")}/>
                </div>
                <button type="submit">Добавить</button>
            </form>
        </CustomModal>
    );
}

export default AddCountryModal;