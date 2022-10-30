import * as XLSX from "xlsx";
import "./App.css";
import { useEffect, useState } from "react";
import Cupon from "./components/Cupons";
function App() {

  interface cupons{
    cupons: Icupon[];
  }
  
  interface Icupon {
    nombre: string;
    primerVencimiento:number | string ;
    segundoVencimiento:number |string ;
    tercerVencimiento:  number | string;
  }
 
  const [data, setData] = useState<Icupon[]>([]);   
  const [cupons, setCupons] = useState<Icupon[]>([]);

  
  const readExcel = (file: any) => {
    const fileReaded: any = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e: any) => {
        const bufferArray: any = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsName = wb.SheetNames[0];
        const ws = wb.Sheets[wsName];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (err) => reject(err);
    });
    
    fileReaded.then((data: []) => {
   
  
      let cupones: Icupon[]= data.map(e=> {
        let obj: Icupon = {
          nombre: e[`Nombre`],
          primerVencimiento: e["1er venc"], // DOT NOTATION NOT USEFUL ON TYPESCRIPT APARENTLY.
          segundoVencimiento: e["2venc"],
          tercerVencimiento: e["3er venc"]
        }
        return obj
      })
     

      

      setData(cupones)
    }); // arr of items
    
  };

  useEffect(() => {
 

    if (data.length) {

      //  if cupons.venc has length of 5 (i.e: 50000) needs to be converted to string as "50.000"
    const editPrice = (str: string) => {
    let slice = str.slice(0, 2).concat(".")
    return slice.concat(str.slice(2))
  }
    // we can also have a function to check correct spelling names -> need a database to compare.
    // later need a feature to ADD a name on the list

      var cuponsToDisplay: Icupon[] = data.map((e) => {    // this should be Object.keys to have any name to edit correctly (to not depend on human typed errors )


      let oneCuote = e.primerVencimiento.toString();
      let twoCuote = e.segundoVencimiento.toString();
      let threeCuote = e.tercerVencimiento.toString();
      
      if (oneCuote.length === 5) {
        return {
          ...e,
         primerVencimiento: editPrice(oneCuote),
        segundoVencimiento: editPrice(twoCuote),
        tercerVencimiento: editPrice(threeCuote)
        }
      }
      return e
    })
     setCupons(cuponsToDisplay)


      
    } 
  }, [data])
  if (cupons.length) {
    console.log("cupons,", cupons)
  }
  return (
    <div className="App">
      <input type="file" onChange={(e: any) => readExcel(e.target.files[0])} />
     <Cupon cupons={cupons} />
    </div>
  );
}


export default App;
