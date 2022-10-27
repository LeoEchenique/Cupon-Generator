import * as XLSX from "xlsx";
import "./App.css";
import { useEffect, useState } from "react";
import Cupon from "./components/Cupons";
function App() {
  
  const [data, setData] = useState([]); 
  const [cupons, setCupons] = useState([]);
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
    fileReaded.then((data: any) => setData(data)); // arr of items
    
  };
  
  useEffect(() => {
    data.length && console.log(data, "here") // && function to map and create sub-component in pdf view

    if (data.length) {
      //  if cupons.venc has length of 5 (i.e: 50000) needs to be converted to string as "50.000"

  const editPrice = (str) => {
    let slice = str.slice(0, 2).concat(".")
    return slice.concat(str.slice(2))
  }
  

    var cuponsToDisplay= data.map(e => {
      let vencOne = "1er venc";
      let vencTwo= "2venc"
      let vencThree = "3er venc";

      let oneCuote = e[vencOne].toString();
      let twoCuote = e[vencTwo].toString();
      let threeCuote = e[vencThree].toString();
      
      if (oneCuote.length === 5) {
        return {
          ...e,
          [`${vencOne}`]: editPrice(oneCuote),
          [`${vencTwo}`]: editPrice(twoCuote),
          [`${vencThree}`]: editPrice(threeCuote)
        }
      }
      return e
    })
      setCupons(cuponsToDisplay)
    // console.log(cuponsToDisplay, "RES TOSRING")

      
    } 
  }, [data])
  
  return (
    <div className="App">
      <input type="file" onChange={(e: any) => readExcel(e.target.files[0])} />
      {/* mapping the arr to make Cupon/s in pdf format because u dont want to display every single one */}
      <Cupon cupons={cupons} />
    </div>
  );
}

export default App;
