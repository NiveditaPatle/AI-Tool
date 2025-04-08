import { useEffect, useRef, useState } from "react";
import { URL } from "./constant";
import Answers from "./components/Answers";
import RecentSearch from "./components/RecentSearch";
import QueAns from "./components/QueAns";
import Loader from "./components/Loader";

function App() {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    JSON.parse(localStorage.getItem("history"))
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loading, setLoading] = useState(false);

  const handelAskQue = async () => {
    if (!question && !selectedHistory) {
      return false;
    }

    if (question) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history"));
        history = [question, ...history];
        localStorage.setItem("history", JSON.stringify(history));
        setRecentHistory(history);
      } else {
        localStorage.setItem("history", JSON.stringify([question]));
        setRecentHistory([question]);
      }
    }

    const payloadData = question ? question : selectedHistory;
    const payload = {
      contents: [
        {
          parts: [{ text: payloadData }],
        },
      ],
    };

    setLoading(true);

    let response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    response = await response.json();

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    // console.log(dataString)
    setResult([
      ...result,
      { type: "q", text: question ? question : selectedHistory },
      { type: "a", text: dataString },
    ]);
    setQuestion("");

    setTimeout(() => {
      scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
    }, 500);

    setLoading(false);

  };

  // console.log(recentHistory);

  // const clearHistory = () => {
  //   localStorage.clear();
  //   setRecentHistory([]);
  // };

  const isEnter = (event) => {
    // console.log(event.key)
    if (event.key === "Enter") {
      handelAskQue();
    }
  };

  useEffect(() => {
    console.log(selectedHistory);
    handelAskQue();
  }, [selectedHistory]);

  return (
    <div className="grid grid-cols-5 h-screen text-center">
      <RecentSearch recentHistory={recentHistory} setRecentHistory={setRecentHistory} setSelectedHistory={setSelectedHistory} />
      <div className=" col-span-4 px-5">
         <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-700">Hello User, Ask Me Anything</h1>
        {
          loading ? (
          <Loader/>
        ) : null
        }

        <div ref={scrollToAns} className=" container h-[500px] overflow-y-auto">
          <div className=" text-zinc-300 p-5">
            {/* {result} */}

            <ul>
              {result.map((item, index) => (
                <QueAns key={index} item={item} index={index}/>
              ))}
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
          <input
            className=" bg-zinc-800 w-full h-full p-3 outline-none"
            type="text"
            placeholder="Ask me anything"
            value={question}
            onKeyDown={isEnter}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handelAskQue}>Ask</button>
        </div>
      </div>
    </div>
  );
}

export default App;
