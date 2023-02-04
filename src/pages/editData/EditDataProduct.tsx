import { Header } from "../../components/header";
import "./editDataProduct.scss";
import { editeAProduct, uploadImage } from "../../store/actions/governmentAddRemoveMembers"
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { uniqueProductAction } from "../../store/actions/uniqueProductAction";
import { useAppSelector, useAppDispatch } from "../../hooks";

type MyEdite = Record<string | number, string | string>

export function EditDataProduct() {
  const { product  } = useAppSelector((state) => state.uniqueProduct);
  const uploadedImage = useAppSelector((state) => state.membersFullInfo.uploadedImage);
  const [editeProduct, setEditeProduct] = useState<MyEdite>({
    fullname: "",
    position: "",
    picture: ""
  });
  const [editeErrorProduct, setEditeErrorProduct] = useState<MyEdite>({});
  const navigate = useNavigate();
  const id = useLocation();

  const dispatch = useAppDispatch();
  let fileReader: any = new FileReader();

  const regCheck: { [key: string]: RegExp } = {
    fullname: new RegExp(/^[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}[\s][\u0531-\u0561]{1}[\u0561-\u0586]{2,19}([-]{0,1}[\u0531-\u0561]{1}[\u0561-\u0586]{2,19}){0,1}$/),
    position: new RegExp(/^[\u0531-\u0561]{1,2}[\u0561-\u0586]{0,19}[,]{0,1}[\s]{1}([\u0531-\u0561]{0,5}[\u0561-\u0586]{0,19}[\u0587]{0,3}[,։՝]{0,1}[\s]{0,1}){1,9}$/),
    id: new RegExp(/^[0-9]{1,2}$/)
  }

  const uploadImageHandler = (e: any) => {
    if (e.target.files) {
      dispatch(uploadImage(e.target.files[0]));
    }
  }
  if (id.state != null) {
    localStorage.setItem("id", JSON.stringify(id.state.id));
  }
  let storeId = localStorage.getItem("id");

  useEffect(() => {
    if (storeId) {
      dispatch(uniqueProductAction(parseInt(storeId)));
    }
    
  }, [storeId,dispatch]);
 
  useEffect(() => {
    if (product.length > 0) {
      setEditeProduct({ ...editeProduct, fullname: product[0].fullname, position: product[0].position, picture: product[0].picture })
      if (uploadedImage.path != null && uploadedImage.path != "") {
        editeProduct.picture = uploadedImage.path;
        setEditeProduct({...editeProduct});
      }
    }
  }, [product, uploadedImage,editeProduct.picture]);
  

  if (storeId) {
    editeProduct.id = storeId;
  }

  const blurFullName = (event: React.FocusEvent<HTMLElement>) => {
    event.preventDefault();
    delete editeErrorProduct.fullName;
    setEditeErrorProduct({ ...editeErrorProduct });
    if (editeProduct["fullname"] === "" || editeProduct["fullname"] == null) {
      editeErrorProduct.fullname = "Պարտադիր դաշտ";
      setEditeErrorProduct({ ...editeErrorProduct })
    }
    else if (!regCheck["fullname"].test(editeProduct["fullname"])) {
      editeErrorProduct.fullname = "Դաշտը լրացնել հայատառ";
      setEditeErrorProduct({ ...editeErrorProduct });
    }
  }

  const blurTitle = (event: React.FocusEvent<HTMLElement>) => {
    event.preventDefault();
    delete editeErrorProduct['position'];
    setEditeErrorProduct({ ...editeErrorProduct })
    if (editeProduct["position"] === "" || editeProduct["position"] == null) {
      editeErrorProduct.position = "Պարտադիր դաշտ";
      setEditeErrorProduct({ ...editeErrorProduct });
    }
    else if (editeProduct["position"].length > 150) {
      editeErrorProduct.fullname = "Առավելագույնը 150 հայատառ նիշ";
      setEditeErrorProduct({ ...editeErrorProduct })
    }
    else if (!regCheck["position"].test(editeProduct["position"])) {
      editeErrorProduct.fullname = "Դաշտը լրացնել հայատառ";
      setEditeErrorProduct({ ...editeErrorProduct })
    }

  }
  const addConfirme = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setEditeErrorProduct({});
    let check = 0;
    for (let key in regCheck) {
      if (key !== "picture") {
        if (regCheck[key].test(editeProduct[key])) {
          check++;
          if (editeErrorProduct[key]) {
            delete editeErrorProduct[key];
          }
        }
        else if (editeProduct[key] === "" || editeProduct[key] == null) {
          editeErrorProduct[key] = "Պարտադիր դաշտ"
          setEditeErrorProduct({ ...editeErrorProduct });
        }
        else if (!regCheck[key].test(editeProduct[key])) {
          editeErrorProduct[key] = "Դաշտը լրացնել հայատառ"
          setEditeErrorProduct({ ...editeErrorProduct });
        }
      }
    }
    if (editeProduct.picture) {
      check++;
      delete editeErrorProduct.picture;
      setEditeErrorProduct({ ...editeErrorProduct })
    }
    else {
      setEditeErrorProduct({ ...editeErrorProduct, picture: "Ներբեռնեք նկարը" });
    }

    if (!(Object.keys(editeErrorProduct).length) && check === 4) {
      dispatch(editeAProduct(editeProduct));
      navigate("/homeFullInfo", { state: { id:editeProduct.id } });
    }
  }

  return (
    <div className='createData'>
      <Header />
      <div className="container" id="container">
        <div className="pageTitle" id="createTitle"> Տվյալների խմբագրում</div>
        <div className="createpage" id="createpage">
          <div className={editeErrorProduct.picture ? "createimg imageError" : "createimg"} id="createimg">
            <img id={editeProduct.picture ? "createdImg" : ""} src={uploadedImage.path ? uploadedImage.path : editeProduct.picture ? `http://localhost:3030/upload/${editeProduct.picture}` : "/government/backgroundimage.png"} />
          </div>
          <form className="create" id="create" autoComplete="off">
            <div className="createInput" id="createInput">
              <div className="createName" id="createName">
                <label className={editeErrorProduct.fullname ? "labelError" : ""}>Անուն Ազգանուն</label>
                <input id={editeErrorProduct.fullname ? "inputError" : ""} name={"fullname"} type="text" value={editeProduct.fullname != null ? editeProduct.fullname : ""} onBlur={blurFullName} onChange={(event) => {
                  event.preventDefault();
                  setEditeProduct({ ...editeProduct, [event.target.name]: event.target.value })
                }
                } placeholder='Անուն Ազգանուն' />
                <p className="fullNameError" id="fullNameError">{editeErrorProduct.fullname}</p>
              </div>
              <div className="createInfo" id="createInfo">
                <label className={editeErrorProduct.position ? "labelError" : ""}>Պաշտոն</label>
                <input id={editeErrorProduct.position ? "titleErrorMessage" : ""} type="text" name={"position"} value={editeProduct.position != null ? editeProduct.position : ""} onBlur={blurTitle} onChange={(event) => {
                  event.preventDefault();
                  setEditeProduct({ ...editeProduct, [event.target.name]: event.target.value })
                }
                } placeholder='Օր․՝ ՀՀ վարչապետ' />
                <p className="titleError" id="titleError">{editeErrorProduct.position}</p>
              </div>
            </div>
            <div className="buttons" id="buttons" >
              <div className="rightbtns" id="buttons" >
                <button className="removeBtn" id="removeBtn" onClick={(event) => {
                  event.preventDefault();
                  if (Object.values(editeProduct).length) {
                    for (let key in editeProduct) {
                      delete editeProduct[key];
                    }
                    setEditeProduct({ ...editeProduct });
                  }
                  if (Object.values(editeErrorProduct).length) {
                    for (let key in editeErrorProduct) {
                      delete editeErrorProduct[key];
                    }
                    setEditeErrorProduct({ ...editeErrorProduct });
                  }
                }}>Չեղարկել</button>
                <button className="addBtn" id="addBtn" onClick={addConfirme}> Հաստատել </button>
              </div>
            </div>
            <div className={editeErrorProduct.picture ? "leftbtn imageErrorMessage" : "leftbtn"} id="leftBtn">
              <div id="uppDiv">
                <label htmlFor="file">
                  <img src={editeErrorProduct.picture ? "/government/down.svg" : "/government/vectordown1.png"} alt='img' />
                  Ներբեռնել նկար
                </label>
                <input type="file" accept="image/*" name="file" id="file" style={{ "display": "none" }} value={Object.keys(fileReader).length > 0 ? fileReader.files[0] : ""} onChange={(e) => uploadImageHandler(e)} />
              </div>
              {editeProduct.picture ? <div id="delDiv" onClick={() => {
                delete editeProduct.picture;
                fileReader = "";
                setEditeProduct({ ...editeProduct });
              }}>
                <img src="../../../../government/trash.svg" />
                <label>Ջնջել</label>
              </div> : ""}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
