import React from 'react'

const RecentSearch = ({recentHistory, setRecentHistory, setSelectedHistory}) => {

    
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };

  return (
    <>
      <div className=" bg-zinc-800 pt-3 col-span-1">
        <h1 className="text-xl text-white flex justify-center">
          <span>Resent Search </span>
          <button className=" cursor-pointer" onClick={clearHistory}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#D9D9D9"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
            </svg>
          </button>
        </h1>
        <ul className=" text-left overflow-auto mt-3">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                key={index}
                onClick={() => setSelectedHistory(item)}
                className="p-1 pl-5 px-4 truncate text-zinc-400 cursor-pointer hover:bg-zinc-700 hover:text-zinc-200"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  )
}

export default RecentSearch
