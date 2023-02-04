import "./fullInfoRightPart.scss";
import { IMemberFullInfo } from "../../types/models";
import { useNavigate } from "react-router-dom";
import {activeProduct} from "../../store/actions/governmentAddRemoveMembers";
import  {useAppDispatch} from "../../hooks";


interface IActive {
    done:boolean,
    setDone:(done:boolean)=>void,
    deactivate: boolean,
    setDeactivate: (deactivate: boolean) => void,
    keyId?: number | null | undefined,
    setKeyId: (keyId: number) => void,
    member: IMemberFullInfo,
    remove: boolean,
    setRemove:(remove:boolean)=>void,
    status: string,
    setStatus: (status: string) => void
}

export const FullInfoRightPart = ({ member, remove, setRemove, status, setStatus, deactivate, setDeactivate, setKeyId,keyId,done,setDone }: IActive) => {
    const navigate = useNavigate();
    const dispatch=useAppDispatch();

    

    return (
        <div id={status==="passive" ? "" : "memberRightPartHiden"} className={"memberRightPart"}>
            <div className={"active1"} id={"active1"}>
                <img className={deactivate ? "groupPassive iconDisabled" : "groupPassive"} src={"../../../government/Grouppassive.png"} onClick={(event)=>{
                    setStatus("active");
                }} />
                <p style={member.status==="passive" ? { color: "#9C9C9C" } : { color: "black" }}>Ապաակտիվացնել</p>
                <div className={"active_logos"}> 
                <img className={"switch_img"} src={member.status==="passive"? "../../../government/deactivate.png" : "../../../government/Switch.png"} onClick={(event)=>{
                event.preventDefault();
                setDone(!done);
               dispatch(activeProduct(member.id));
                setDeactivate(!deactivate) 
                }
                } 
                />
                </div>
            </div>
            <div className={"editTrash"}>
                <div className={member.status==="passive"? "edite_logo iconDisabled" : "edite_logo"} onClick={(e) => {
                    e.preventDefault();
                    
                    
                    navigate(`/edite/${member.id }`, { state: { id: member.id } });

                    
                }
                }><img className={"edite_img"} src={member.status==="passive" ? "../../../government/editePassive.png" : "../../../government/edite.svg"} /><p id={member.status==="passive" ? "memberAllParagraph" : ""}>Խմբագրել</p></div>
                <div onClick={(e) => {
                    e.preventDefault();
                     setRemove(!remove);
                    if(member.status === "active"){
                        setStatus("passive");
                    }
                    else{
                        setStatus("active");
                    }
                    setKeyId(member.id);
                    navigate("/homeFullInfo");
                }
                } className={member.status==="passive" ? "trash_logo iconDisabled" : "trash_logo"}><img className={"trash_img"} src={member.status==="passive" ? "../../../government/trashPassive.png" : "../../../government/trash.svg"} /><p id={member.status==="passive"? "memberAllParagraph" : ""}>Ջնջել</p></div>
            </div>
        </div>
    );
}