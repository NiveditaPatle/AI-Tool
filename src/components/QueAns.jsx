import React from "react";
import Answers from "./Answers";

const QueAns = ({item, index}) => {
  return (
    <>
      <div
        key={index + Math.random()}
        className={item.type == "q" ? "flex justify-end" : ""}
      >
        {item.type == "q" ? (
          <li
            key={index + Math.random()}
            className="text-right p-1 border-4
                   border-zinc-700 bg-zinc-700 w-fit rounded-tl-3xl rounded-br-3xl rounded-bl-3xl "
          >
            <Answers
              ans={item.text}
              totalResult={1}
              index={index}
              type={item.type}
            />
          </li>
        ) : (
          item.text.map((ansItem, ansIndex) => (
            <li key={ansIndex + Math.random()} className="text-left ">
              <Answers
                ans={ansItem}
                totalResult={item.length}
                index={ansIndex}
                type={item.type}
              />
            </li>
          ))
        )}
      </div>
    </>
  );
};

export default QueAns;
