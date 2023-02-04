import * as XLSX from "xlsx";
import Nav from "../nav/Nav";
import { useEffect, useState } from "react";
import Cupon from "../cupons/Cupons";
import Swal from "sweetalert2";
import {useParams, useNavigate} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";


function Dashboard() {
  const { token } = useParams();
  const navigate= useNavigate();
  interface Icupon {
    nombre: string;
    primerVencimiento: number | string;
    segundoVencimiento: number | string;
    tercerVencimiento: number | string;
  }
  const [data, setData] = useState<Icupon[]>([]);
  const [cupons, setCupons] = useState<Icupon[]>([]);

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
     if(user.accessToken !== token) navigate("/");
      } 
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const normalize = (ws: any) => {
    ws.A1 = {
      ...ws.A1,
      w: "Nombre",
    };
    ws.B1 = {
      ...ws.B1,
      w: "venc1",
    };
    ws.C1 = {
      ...ws.C1,
      w: "venc2",
    };
    ws.D1 = {
      ...ws.D1,
      w: "venc3",
    };
    return ws;
  };
  
const readExcel = (file: any) => {
    if (file.name.includes("xlsx") || file.type.includes("xml")) {
      const fileReaded: any = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e: any) => {
          const bufferArray: any = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsName = wb.SheetNames[0];
          const ws = wb.Sheets[wsName];
          const newKeys = normalize(ws);
          const data = XLSX.utils.sheet_to_json(newKeys);
          resolve(data);
        };
        fileReader.onerror = (err) => reject(err);
      });
      fileReaded.then((data: []) => {
        let cupones: Icupon[] = data.map((e: any) => {
          let obj: Icupon = {
            nombre: e.Nombre,
            primerVencimiento: e.venc1,
            segundoVencimiento: e.venc2,
            tercerVencimiento: e.venc3,
          };
          return obj;
        });
        setData(cupones);
      });
    } else {
      Swal.fire("Ups! El archivo ingresado es inválido", undefined, "error")
    }
  };
  useEffect(() => {
    if (data.length) {
      const editPrice = (str: string) => {
        let slice = str.slice(0, 2).concat(".");
        return slice.concat(str.slice(2));
      };
     let cuponsToDisplay: Icupon[] = data.map((e) => {
       if(!e.primerVencimiento) e.primerVencimiento= 0;
       if(!e.segundoVencimiento) e.segundoVencimiento=0;
       if(!e.tercerVencimiento) e.tercerVencimiento=0;
        let oneCuote = e.primerVencimiento.toString();
        let twoCuote = e.segundoVencimiento.toString();
        let threeCuote = e.tercerVencimiento.toString();
        if (oneCuote.length === 5) {
          return {
            ...e,
            primerVencimiento: editPrice(oneCuote),
            segundoVencimiento: editPrice(twoCuote),
            tercerVencimiento: editPrice(threeCuote),
          };
        }
        return e;
      });
      setCupons(cuponsToDisplay); 
    }
  }, [data]);
  return (
    <div className="App bg-zinc-800 w-[99vw]">
      <Nav token= {token} />
      <div className=" h-[100vh] mt-12  flex flex-col items-center justify-start ">
        <div className="h-2/4 mb-6 flex flex-col items-center justify-center" >
          <div className="h-10 flex items-center justify-center">
            <p className="text-white text-lg mb-12">Arrastra o busca tu archivo <b>EXCEL</b></p>
          </div>
          <input
            type="file"
            className=" border-4 border-dotted border-gray-100 h-1/2  md: h-20 h-40 px-10 py-32 md:p-40 md:pt-1/2 text-white bg-zinc-600  "
            onChange={(e: any) => readExcel(e.target.files[0])}
            onDrop={(e:any)=> readExcel(e.target.files[0])}
          />
        </div>
        <div className="" >
        <Cupon cupons={cupons} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;