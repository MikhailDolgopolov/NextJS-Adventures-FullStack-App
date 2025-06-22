import CustomModal from '@/components/CustomModal';
import { post } from '@/lib/api';
import { Person } from '@/lib/typeorm/entities/Person';
import React from 'react';
import {useForm} from "react-hook-form";

function AddPersonModal({addPersonButton, onAdd}:{onAdd:{():void}
    addPersonButton:React.ReactNode}) {
    const {register, handleSubmit, reset} = useForm<Person>();
    const onSubmit = handleSubmit((data, e?: React.BaseSyntheticEvent)=>{
        e!.preventDefault()
        post("people/create/", JSON.stringify(data)).then(()=>{onAdd(); reset();});
    })

    return (
        <CustomModal header="Добавить человека" trigger={addPersonButton} onClose={reset}>
            <form className="vert-window" onSubmit={onSubmit}>
                <div className="form-row">
                    <label>Имя: </label>
                    <input required={true} {...register("first_name")}/>
                </div>
                <div className="form-row">
                    <label>Отчество: </label>
                    <input {...register("patronym")}/>
                </div>
                <div className="form-row">
                    <label>Фамилия: </label>
                    <input {...register("last_name")}/>
                </div>
                <div className="form-row">
                    <label>Кратко: </label>
                    <input {...register("alias")}/>
                </div>
                <button type={"submit"}>Добавить</button>
            </form>
        </CustomModal>
    );
}

export default AddPersonModal;