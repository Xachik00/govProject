import "./fullInfoLeftPart.scss";
import {IMemberFullInfo} from "../../types/models"
interface IActive{
    deactivate:boolean,
    remove:boolean,
    setRemove:(remove:boolean)=>void,
    member:IMemberFullInfo,
    status:string,
    setStatus:(status:string)=>void
}
export const FullInfoLeftPart=({member,status,setStatus,deactivate}:IActive)=>{
   

    return(
        <div id={"memberLeftPart"} className={"memberLeftPart"}>
            <div className={"memberLeftPartImage"}>
                <img className={"group"}  id={"group"} onClick={(event)=>{
                    event.preventDefault();
                    if(status === "active"){
                        setStatus("passive");
                    }
                    
                }
                } src={"/government/Group.png"}/>
                <img  className={member.status==="passive"?"img imgPassive":"img"} src={`http://localhost:3030/upload/${member.picture}`} width={"234px"} height={"140px"}/></div>
            <div className={"memberLeftPartDescription"}>
               <div className={"memberLeftPartDescriptionChild"}> <p id={member.status==="passive"?"memberAllParagraph":""} className={"memberLeftPartDescriptionChildParagraph"}>Պաշտոն:<span id={"memberLeftPartDescriptionChildSpan"}>{member.position}</span></p></div>
                <div className={"memberLeftPartDescriptionChild"}><p id={member.status==="passive"?"memberAllParagraph":""} className={"memberLeftPartDescriptionChildParagraph"}>Անուն Ազգանուն:<span id={"memberLeftPartDescriptionChildSpan"}>{member.fullname}</span></p></div>
            </div>
        </div>
    )
}