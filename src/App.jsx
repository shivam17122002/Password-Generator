import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numInclude, setnumInclude] = useState(false);
  const [charInclude, setcharInlude] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

 const copyPasswordToClibbord = useCallback(()=>{
  passwordRef.current?.select() 
  passwordRef.current?.setSelectionRange(0, length) 
  window.navigator.clipboard.writeText(password)
 }, [password])

  const passwordGenrator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numInclude) str += "0123456789";
    if (charInclude) str += "!@#$%^&*()_+{}[]<>?/|";

    let pass = "";

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str[index];
    }

    setPassword(pass);
  }, [length, numInclude, charInclude, setPassword]);
   useEffect( ()=>{
      passwordGenrator()
    }, [length, numInclude, charInclude, passwordGenrator])
  return (
    <div className="bg-black h-screen ">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-semibold text-green-500 mt-8">
          Password Generator
        </h1>
      </div>

      <div className="border border-green-600 w-[600px] mx-auto mt-10 p-6 bg-gray-900 rounded-lg">
        {/* Input + Button */}
        <div className="flex mb-6 border border-green-500 overflow-hidden">
          <input
            type="text"
            placeholder="Password"
            readOnly
            value={password}
            className="w-full px-3 py-2 bg-black text-green-400 outline-none"
            ref={passwordRef}
          />

          <button className="bg-green-500 text-black px-5 hover:bg-green-400 transition" 
          onClick={copyPasswordToClibbord}>
            Copy
          </button>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-green-400 mb-2">
            <label>Password Length</label>
            <span>{length}</span>
          </div>

          <input
            type="range"
            min={6}
            max={60}
            value={length}
            className="cursor-pointer w-full accent-green-500"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="flex gap-6 text-green-400 text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={numInclude}
              onChange={() => setnumInclude((prev) => !prev)}
              className="accent-green-500 cursor-pointer"
            />
            Numbers
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={charInclude}
              onChange={() => setcharInlude((prev) => !prev)}
              className="accent-green-500 cursor-pointer"
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
