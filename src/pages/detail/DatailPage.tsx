import { useEffect} from "react";
import "./detail.scss";
import { useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function DatailPage() {
    const navigate = useNavigate();
    const location_data = useLocation();
    const minister = location_data.state.user; 
    // useEffect(() => {
    //     (location_data.state.user)
    // }, [location_data])
    return (
        <div className={'detail'}>
            <header className={"header"}>
            <div className={"headerContainer"}>
                <div>
                    <div className={"headerGerbPart"}>
                        <img src={"../../../../government/logo3.svg"} />
                        <h5 id={"headerContainerH5"} className={"headerContainerH5"}>Հայաստանի Հանրապետության Կառավարություն</h5>
                    </div>
                </div>
                <div className={"headerVectorPartParent"}>
                    <div className={"headerVectorPart"} onClick={(event) => {
                        event.preventDefault();
                        localStorage.removeItem('auth');
                        localStorage.removeItem('id');
                        navigate("/");
                        navigate(0)
                    }
                    }>
                        <img src={"../../../../government/Vectorright.png"} />
                        <h6 id={"headerContainerH6"} className={"headerContainerH6"}>Դուրս գալ</h6>
                    </div>
                </div>
            </div>
            </header>
            <div className='greenline' id='greenline'></div>
            <div className='contan' id='contan'>
                 <div className='chunk' id='chunk'>
                    <div className='chunkleftdiv' id='chunkleftdiv'>
                        <div className='chunkleft' id='chunkleft'>
                            <img src={`http://localhost:3030/upload/${minister.picture}`} />
                        </div>
                    </div>
                    <div className='chunkright' id='chunkright'>
                        <p className='fullName' id='fullName'>{minister?.fullname} </p>
                        <p className='fullInfo' id='fullInfo'>{minister?.position}</p>
                    </div>
                </div> 
            </div>
        </div>
    )
}
