import { IMemberInfo } from "../../types/models";
import "./homeInfoProduct.scss";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
interface IMember {
    socket:any,
    member: IMemberInfo,
    socketColor:number,
    setSocketColor:(socketColor:number)=>void,
}

export const HomeInfoProduct = ({ member,socket,socketColor,setSocketColor }: IMember) => {
    let user: string | any = localStorage.getItem("auth");
    const user_id = JSON.parse(user)?.id;

    return (
        <div className={"member"} onClick={(event) => {
            event.preventDefault();
            if (member.id) {
                setSocketColor(member.id);
            }
            const payload = {
                loginUserId: user_id,
                currentUserid: member.id
            }
            socket.emit("click",3,member.id)
        }
        }>
            <div id={"memberTitle"} className={"title"}> <div className="image"><img src={`http://localhost:3030/upload/${member.picture}`}/></div><p id={"memberTitleP"} className={"memberTitleP"}>{member.position}</p></div>
            <div id={"memberName"} className={member.id===socketColor?"socketColor": "memberName"}><h5 className={member.id===socketColor?"socketTextColor":  "memberNameH5"} >{member.fullname}</h5></div>
        </div>
    );
}