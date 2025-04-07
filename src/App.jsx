import { useState } from "react"
import { URL } from "./constant";
import Answers from "./components/Answers";

function App() {

  const [question, setQuestion] = useState('');
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory]=useState(JSON.parse(localStorage.getItem('history')));

  const payload = {
    "contents": [{
    "parts":[{"text": question}]
    }]
  }

  const handelAskQue= async()=>{

    if(localStorage.getItem('history')){
      let history = JSON.parse(localStorage.getItem('history'))
      history = [question, ...history]
      localStorage.setItem('history',JSON.stringify(history))
      setRecentHistory(history)
    } else {
      localStorage.setItem('history',JSON.stringify([question]))
      setRecentHistory([question])
    }
    

    let response = await fetch(URL, {
      method: 'POST',
      body:JSON.stringify(payload)
    })
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString= dataString.map((item)=>item.trim())

    // console.log(dataString)
    setResult([...result, {type:'q', text:question},{type:'a', text:dataString}])
  }
     
  console.log(recentHistory);
  

  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  }

  return (
   <div className="grid grid-cols-5 h-screen text-center">
    <div className=" bg-zinc-800 pt-3 col-span-1">
    <h1 className="text-xl text-white flex justify-center">
    <span>Resent Search </span>
    <button className=" cursor-pointer" onClick={clearHistory}>
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#D9D9D9"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
    </button></h1>
      <ul className=" text-left overflow-auto mt-3">
        {
          recentHistory && recentHistory.map((item) => (
            <li className="p-1 pl-5 px-4 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200">{item}</li>
          ))
        }
      </ul>
    </div>
    <div className=" col-span-4 p-4">
      <div className=" container h-[500px] overflow-y-auto">
        <div className=" text-zinc-300">
        {/* {result} */}

          <ul>
            {
              result.map((item,index) => (
               <div key={index+Math.random()} className={item.type == 'q' ? 'flex justify-end' : ''}>
                {
                  item.type=='q' ? <li key={index+Math.random()} className="text-right p-1 border-4
                   border-zinc-700 bg-zinc-700 w-fit rounded-tl-3xl rounded-br-3xl rounded-bl-3xl "><Answers ans={item.text} totalResult={1} index={index} type={item.type}/></li> : item.text.map((ansItem, ansIndex) =>(
                  <li key={ansIndex+Math.random()} className="text-left "><Answers ans={ansItem} totalResult={item.length} index={ansIndex} type={item.type}/></li>
                ))
                }
               </div>
              ))
            }
          </ul>

        {/* <ul>
        {
           result && result.map((item, index) => (
            <li key={index+Math.random()} className="text-left "><Answers ans={item} totalResult={result.length} index={index}/></li>
           ))
        }
        </ul> */}
        
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
