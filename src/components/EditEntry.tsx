import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSlidersH, faTrash} from "@fortawesome/free-solid-svg-icons";



function EditEntry({onEdit, onDelete, editRef, deleteRef, children}:{onEdit:()=>void, onDelete:()=>void,children?:React.ReactNode|React.ReactNode[]
    editRef?:React.MutableRefObject<HTMLButtonElement|null>,deleteRef?:React.MutableRefObject<HTMLButtonElement|null>, editModal?:Function, properties?:any[]}) {
    return <div className="row right">
        {children}
        <button ref={editRef} className="center-child big square" onClick={onEdit}>
            <FontAwesomeIcon icon={faSlidersH} size="lg"/>
        </button>
        <button ref ={deleteRef} className="center-child big square" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} size="lg"/>
        </button>
    </div>;
}
export default EditEntry;