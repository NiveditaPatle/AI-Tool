import React, { useEffect, useState } from 'react'
import { checkHeading, replaceHeadingStars } from '../helper';

const Answers = ({ans, totalResult, index, type}) => {
  
  const [heading, setHeading] = useState(false);
  const [answer, setAnswer] = useState(ans);

  useEffect(()=> {
    // console.log(ans, checkHeading(ans));
    // console.log(index);
    
    if(checkHeading(ans)){
      setHeading(true);
      setAnswer(replaceHeadingStars(ans));
    }
  }, [])

  

  return (
    <>
      {
        index==0 && totalResult>1 ?<span className=' pt-2 text-xl block text-zinc-200'>{answer}</span> :
        heading? <span className=' pt-2 text-lg block text-white'>{answer}</span> : <span className={type == 'q' ? 'pl-1' : 'pl-5'}>{answer}</span>
      }
    </>
  )
}

export default Answers
