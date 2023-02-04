import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchGovernmentMembersInfo } from "../../store/actions/governmentMembersFullInfoAction";
import { IMemberInfo } from "../../types/models";
import { HomeInfoProduct } from "../../components/homeInfoProduct";
import { Header } from "../../components/header";
import "./home.scss";
import  io  from "socket.io-client"
import { useNavigate } from "react-router-dom";
import auth from "../../auth";
import { SocketPage } from "../socketPage";



// interface accessToken {
//     auth_token: string
// }
export const Home = () => {
    const navigate = useNavigate()
    const [socket, setSocket] = useState<any>(null)
    const [socketColor,setSocketColor]=useState(0);
    const { membersFullInfo, loading, error } = useAppSelector((state) => state.membersFullInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
    const ws = io("http://localhost:3030", {
    extraHeaders: {
            auth_token: auth().accessToken,
        }
    });
    setSocket(ws);
    
    dispatch(fetchGovernmentMembersInfo())
    }, [dispatch]);
    
    return (
        <div id={"body"} className={"body"}>
            <Header />
            <div className={"container"}>
                <h1 id={"containerTitle"}>ՀՀ Կառավարության անդամներ</h1>
                <div id={"members"} className={"members"}>
                    {membersFullInfo.length > 0 ? membersFullInfo.map((member: IMemberInfo) => {
                    return (
                            <HomeInfoProduct member={member} key={member.id} socket={socket} socketColor={socketColor} setSocketColor={setSocketColor} />
                        )
                    }) : loading
                    
                    }
                </div>
            </div>
        </div>
    );
}

