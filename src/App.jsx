import { useCallback, useEffect, useRef, useState } from "react"


function App() {

 const [length, setLength] = useState(8);
 const [useNumber, setUsenumber] = useState(false);
 const [useCharacter, setUsecharacter] = useState(false);
 const [password, setPassword] = useState("");

 const passwordRef = useRef(null);

 const copyPass = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);
 },[password])

 const passwordGenerator = useCallback(()=>{

  let pass = '';
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

  if(useNumber) str += "0123456789"
  if(useCharacter) str += "~!@#$%^&*()-_=+[]{}:;|?/.>,<`"
  for(let i = 1; i<length; i++){
    let char = Math.floor(Math.random() * str.length + 1)
    pass += str.charAt(char)
  }

  setPassword(pass);

 },[length,useNumber,useCharacter,setPassword])

 useEffect(()=>{
    passwordGenerator();
 },[length, useNumber,useCharacter, passwordGenerator])


  return (
    <div className="w-full max-w-max mx-auto shadow-md rounded-lg px-4 py-3
    my-8 bg-gray-800 text-orange-500">
      
      <h1 className=" text-white text-center my-3 text-4xl">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
      <input 
          type="text" 
          value={password} 
          className="outline-none w-full py-1 px-3 text-3xl"
          placeholder="Password" 
          ref={passwordRef}
      />
      <button
      className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0
      hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600
      dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={copyPass}
      >copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range"
          min={8}
          max={48}
          value={length}
          className="cursor-pointer" 
          onChange={(e)=> {
            setLength(e.target.value)
          }}
          />
          <label className="text-2xl">Lenght: {length}</label>

        </div>
        <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={useNumber} 
            onChange={(e)=>{setUsenumber((prev) => !prev)}} 
            />
            <label className="text-2xl">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
            <input 
            type="checkbox" 
            defaultChecked={useCharacter} 
            onChange={(e)=>{setUsecharacter((prev) => !prev)}} 
            />
            <label className="text-2xl" htmlFor="characterInput"> Characters</label>
        </div>

      </div>
      
    </div>
  )
}

export default App
