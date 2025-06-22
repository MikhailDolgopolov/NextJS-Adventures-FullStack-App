
import { useCallback, useEffect } from "react";
import Loading from "../Pages/Loading";

function ButtonSelect<Type>({array, id, stringify, onSelect, children, clearSwitch, resetSwitch, defaultValue, hideContent}:
                                {array:Type[]|undefined, id:string, stringify:{(arg0:Type):string}, clearSwitch?:any,resetSwitch?:boolean
    defaultValue?:string, onSelect:{(arg0:Type):void}, children?:React.ReactNode[]|React.ReactNode, hideContent?:boolean}) {
    
     const deselectAll = useCallback(()=>{
        let buttons=document.getElementsByClassName("my-select-button-"+id);
        let iter = Array.from(buttons)
        iter.forEach(function (e){
            e.setAttribute("data-selected", "0")
        })
    }, [id])
    function styleSelection(l_id:string){
        if(!l_id) return
        deselectAll()
        document.getElementById(l_id)!.setAttribute("data-selected", "1")
    }
    useEffect(()=>{
        deselectAll()
    },[clearSwitch, deselectAll])
    useEffect(()=>{
        if (!array) return
        if(!defaultValue) styleSelection(stringify(array[0]))
        else styleSelection(defaultValue)
    },[array, defaultValue, resetSwitch])
    if(!array) return <Loading object={"данные"}/>
    return (
        <div className="flex-grid wide">
            {!hideContent&&array.map(item=>
                <button type="button" key={stringify(item)} id={stringify(item)}
                        className={"flex-block hoverable my-select-button-"+id}
                        onClick={()=>{
                            styleSelection(stringify(item))
                            onSelect(item)
                }}>
                    {stringify(item).includes("(")?<p className="note">{stringify(item)}</p> :stringify(item)}
                </button>
            )}
            {children}
        </div>
    );
}

export default ButtonSelect;