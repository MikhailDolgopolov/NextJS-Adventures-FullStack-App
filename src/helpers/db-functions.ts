import { Souvenir } from "@/lib/typeorm/entities/Souvenir";

export function SouvenirTitle(s:Souvenir){
    return s.name?(s.type?s.type+" "+s.name:s.name):(s.material?s.material+" "+s.type:s.type) ?? undefined
}