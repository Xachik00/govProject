import { Header } from "../../components/header";
import "./createDataProduct.scss";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addProduct, uploadImage } from "../../store/actions/governmentAddRemoveMembers";
interface ICreateMember {
    [key: string]: string
}
export function CreateDataProduct() {

    const uploadedImage = useAppSelector((state) => state.membersFullInfo.uploadedImage);
    const [createProduct, setCreateProduct] = useState<ICreateMember>({});
    const [errorProduct, setErrorProduct] = useState<ICreateMember>({});
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const regCheck: { [key: string]: RegExp } = {
        fullname: new RegExp(/^[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}[\s][\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}$/),
        position: new RegExp(/^[\u0531-\u0561]{1,2}[\u0561-\u0586]{0,19}[,]{0,1}[\s]{1}([\u0531-\u0561]{0,5}[\u0561-\u0586]{0,19}[\u0587]{0,3}[,։՝]{0,1}[\s]{0,1}){1,9}$/),
    }

    const uploadImageHandler = (e: any) => {
        if (e.target.files[0]) {
            dispatch(uploadImage(e.target.files[0]));
        }
    };

    const addConfirme = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let check = 0;
        for (let key in regCheck) {
            if (key !== "img") {
                if (regCheck[key].test(createProduct[key])) {
                    check++;
                    if (errorProduct[key]) {
                        delete errorProduct[key];
                    }
                }
                else if (createProduct[key] == null || createProduct[key] == "") {
                    errorProduct[key] = "Պարտադիր դաշտ";
                    setErrorProduct({ ...errorProduct });
                }
                else if (!regCheck[key].test(createProduct[key])) {
                    errorProduct[key] = "Դաշտը լրացնել հայատառ";
                    setErrorProduct({ ...errorProduct });
                }
            }
        }

        createProduct.picture = uploadedImage.filename;
        if (createProduct.picture) {
            check++;
            if (errorProduct.img) {
                delete errorProduct.img;
                setErrorProduct({ ...errorProduct })
            }
        }
        else {
            setErrorProduct({ ...errorProduct, img: "Ներբեռնեք նկարը" });
        }
        if (!(Object.keys(errorProduct).length) && check === 3) {
             dispatch(addProduct(createProduct));
             navigate("/homeFullInfo", { state:createProduct,}) ;
             navigate(0)
          }
    }

    const blurFullName = (event: any) => {
        event.preventDefault();
        delete errorProduct['fullname'];
        setErrorProduct({ ...errorProduct })
        if (createProduct["fullname"] === "" || createProduct["fullname"] == null) {
            errorProduct.fullname = "Պարտադիր դաշտ";
            setErrorProduct({ ...errorProduct });
        }
        else if (!regCheck["fullname"].test(createProduct["fullname"])) {
            errorProduct.fullname = "Դաշտը լրացնել հայատառ";
            setErrorProduct({ ...errorProduct })
        }
    }
    const blurTitle = (event: any) => {
        event.preventDefault();
        delete errorProduct['position'];
        setErrorProduct({ ...errorProduct })
        if (createProduct["position"] === "" || createProduct["position"] == null) {
            errorProduct.position = "Պարտադիր դաշտ";
            setErrorProduct({ ...errorProduct });
        }
        else if (!regCheck["position"].test(createProduct["position"])) {
            errorProduct.position = "Դաշտը լրացնել հայատառ";
            setErrorProduct({ ...errorProduct })
        }
    }
    

    return (

        <div className='createData'>
            <Header />
            <div className="container" id="container">
                <div className="pageTitle" id="createTitle"> Ավելացնել նոր նկար</div>
                <div className="createpage" id="createpage">
                    <div className={errorProduct.img ? "createimg imageError" : "createimg"} id="createImage">
                        <img id={uploadedImage.path ? "createdImg" : ""} src={uploadedImage.path? `http://localhost:3030/${uploadedImage.path}`:" ../../../../government/backgroundimage.png"} />
                    </div>
                    <form className="create" id="create" autoComplete="off">
                        <div className="createInput" id="createInput">
                            <div className="createName" id="createName">
                                <label className={errorProduct.fullname ? "labelError" : ""}>Անուն Ազգանուն</label>
                                <input id={errorProduct.fullname ? "inputError" : ""} value={createProduct.fullname ? createProduct.fullname : ""} type="text" name={"fullname"} onBlur={blurFullName} onChange={(event) => {
                                    setCreateProduct({ ...createProduct, [event.target.name]: event.target.value })
                                }} placeholder='Անուն Ազգանուն' />
                                <label id={errorProduct.fullname ? "errorMessageForName" : "hideErrorMessage"}>{errorProduct["fullname"]}</label>
                            </div>
                            <div className="createInfo" id="createInfo">
                                <label className={errorProduct.position ? "labelError" : ""}>Պաշտոն</label>
                                <input type="text" id={errorProduct.position ? "inputError" : ""} value={createProduct.position ? createProduct.position : ""} name={"position"} onBlur={blurTitle} onChange={(event) => {
                                    setCreateProduct({ ...createProduct, [event.target.name]: event.target.value })
                                }} placeholder='Օր․՝ ՀՀ վարչապետ' />
                                <label id={errorProduct.position ? "errorMessageForTitle" : "hideErrorMessage"}>{errorProduct["position"]}</label>
                            </div>
                        </div>
                        <div className="buttons" id="buttons" >
                            <div className="rightbtns" id="buttons" >
                                <button type="submit" className="removeBtn" id="removeBtn" onClick={(e) => {
                                    e.preventDefault();
                                    if (Object.values(createProduct).length) {
                                        for (let key in createProduct) {
                                            delete createProduct[key];
                                        }
                                        setCreateProduct({ ...createProduct });
                                    }
                                    if (Object.values(errorProduct).length) {
                                        for (let key in errorProduct) {
                                            delete errorProduct[key];
                                        }
                                        setErrorProduct({ ...errorProduct });
                                    }

                                }}>Չեղարկել</button>
                                <button type="submit" className="addBtn" id="addBtn" onClick={addConfirme}>Հաստատել </button>
                            </div>
                        </div>
                        <div className={errorProduct.img ? "leftbtn imageErrorMessage" : "leftbtn"} id="leftBtn">
                            <label htmlFor="file">
                                <img src={errorProduct.img ? "/government/down.svg" : "/government/vectordown1.png"} className={errorProduct.img ? "imageErrorIcon" : ""} />
                                Ներբեռնել նկար
                            </label>
                            <input type="file" accept="image/*" name="file" id="file" onChange={uploadImageHandler}
                                style={{ "display": "none" }} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
