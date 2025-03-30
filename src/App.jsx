import { useState } from "react"
import { URL } from "./constant";
import Answers from "./components/Answers";

function App() {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined);

  const payload = {
    "contents": [{
    "parts":[{"text": question}]
    }]
  }

  const handelAskQue= async()=>{
    let response = await fetch(URL, {
      method: 'POST',
      body:JSON.stringify(payload)
    })
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString= dataString.map((item)=>item.trim())

    // console.log(dataString)
    setResult(dataString)
  }

  return (
   <div className="grid grid-cols-5 h-screen text-center">
    <div className=" bg-zinc-800 col-span-1"></div>
    <div className=" col-span-4 p-4">
      <div className=" container h-[500px] overflow-y-auto">
        <div className=" text-zinc-300">
        {/* {result} */}
        <ul>
        {
           result && result.map((item, index) => (
            <li key={index+Math.random()} className="text-left "><Answers ans={item} totalResult={result.length} index={index}/></li>
           ))
        }
        </ul>
        
        </div>
      </div>
      <div className=" bg-zinc-800 w-1/2 text-white m-auto rounded-3xl border border-zinc-700 px-3 py-1 flex h-12">
        <input className=" bg-zinc-800 w-full h-full p-3 outline-none" type="text" placeholder="Ask me anything" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
        <button onClick={handelAskQue}>Ask</button>
      </div>
    </div>
   </div>
  )
}

export default App
