import { useState } from "react";
import { IMemberFullInfo } from "../../types/models";
import "./homeFullInfoProduct.scss"
import { FullInfoRightPart } from "../fullInfoRightPart/FullInfoRightPart";
import { FullInfoLeftPart } from "../fullInfoLeftPart";

interface IMember {
    done:boolean,
    setDone:(done:boolean)=>void,
    setKeyId: (keyId: number) => void,
    keyId: number | null | undefined
    remove: boolean,
    setRemove: (remove:boolean) => void,
    member: IMemberFullInfo,
}

export const HomeFullInfoProduct = ({ member, remove, setRemove, keyId, setKeyId,done,setDone }: IMember) => {
    const [deactivate, setDeactivate] = useState(false);
   
    const [status, setStatus] = useState("active");
    return (
        <div className={status ? "memberActive member" : member.status ? "member deactivate" : "member"}>
            <div className={"memberContent"}>
                <FullInfoLeftPart member={member} deactivate={deactivate} remove={remove} setRemove={setRemove} status={status} setStatus={setStatus} />
                <FullInfoRightPart member={member} deactivate={deactivate} setDeactivate={setDeactivate} setRemove={setRemove} remove={remove} keyId={keyId} setKeyId={setKeyId} status={status} setStatus={setStatus} done={done} setDone={setDone}/>
            </div>
        </div>
    )
}