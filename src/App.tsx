import "./appStyles/App.css";
import { useState , useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Nav from "./components/nav/Nav";
import "./appStyles/index.css";
import {checkUser, auth, } from "./firebase-config.js";

function App() {

  interface User{
    username: string,
    password: string
  };

const navigate= useNavigate();

const [error,setError]= useState("");
const [user,setUser]=useState({
  username:"",
  password:""
});

useEffect(()=>{
  auth.signOut();
},[])

 const logUser= async ( {username, password}: User)=>{
  
  if(!username || !password) return setError("Ingrese las credenciales")
   const access= await checkUser(auth, username, password); 
  if(Array.isArray(access)) return setError("Datos ingresados incorrectos") 
  navigate(`inicio/${access}`)
  }

const handleChange= (e:  React.ChangeEvent<HTMLInputElement>)=>{
  setUser((prev)=>({
    ...prev,
    [e.target.name]: e.target.value
  }));
}

  return (
    <div className="App bg-zinc-800 w-[99vw] ">
    <Nav token={false}/>
    <div className="h-[100vh] mt-12  flex flex-col items-center justify-start">
       <div className="md:min-h-min max-md:h-auto w-1/3 mt-16 max-md:mt-0  max-md:w-3/4 max-md:h-96 flex flex-col items-center justify-center gap-6 p-2 py-4 bg-zinc-600 border-4 text-white border rounded-lg">
            <h1 className="text-2xl  mb-10">Inicia sesión para continuar</h1>
          
            <div className=" mb-8 h-60 flex flex-col items-center justify-around">
            <div className="flex flex-col gap-6">
              <label htmlFor="username" >Usuario</label>
             <input onChange={(e)=> handleChange(e)} type="text" name="username" className="border text-black border-gray-300 rounded-full h-10 pl-5 pr-10 bg-zinc-400  focus:outline-none" />
            </div>
            {error ? <p className="text-red-400"> {error} </p> : null}
            <div className="flex flex-col gap-6">
              <label htmlFor="password" >Contraseña</label>
              <input onChange={(e)=> handleChange(e)} type="password" name="password" className="border text-black border-gray-300 rounded-full h-10 pl-5 pr-10 bg-zinc-400  focus:outline-none" />
            </div>
          </div>
          <button type="submit" className="w-1/3 bg-amber-800 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-full " onClick={()=> logUser(user)}>Entrar</button>
       </div>
       
    </div>
    </div>
  );
}

export default App;
