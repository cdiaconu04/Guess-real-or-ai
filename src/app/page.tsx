"use client"
import Image from "next/image";
import { useState, useEffect } from 'react';
import { motion } from "motion/react";
import { realPics } from "@/constants/reals";
import { fakePics } from "@/constants/fakes";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowSize, setWindowSize] = useState("");

  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);
  const [curIsReal, setCurIsReal] = useState(false);
  const [curPic, setCurPic] = useState(fakePics[0]);
  const numPics = 100;

  function getPicDimensions(): number {
    if (windowSize == "xs") return 160;
    else if (windowSize == "sm") return 220;
    else if (windowSize == "md") return 280;
    else if (windowSize == "lg") return 330;
    else if (windowSize == "xl") return 400;
    else return 400;
  }

  function getNewPic() {
    const choice = Math.floor(Math.random() * 2);
    const picNum = Math.floor(Math.random() * numPics);

    if (choice === 0) {
      setCurIsReal(true);
      setCurPic(realPics[picNum]);
    } else {
      setCurIsReal(false);
      setCurPic(fakePics[picNum]);
    }
  }

  function checkGuess(guess: boolean) {
    if (guess === curIsReal) { // Correct
      setScore(prev => {
        const next = prev + 1;
        setHighscore(h => Math.max(h, next));
        return next;
      });
    } else { // Incorrect
      setScore(0);
    }

    getNewPic();
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
  
      if (windowWidth >= 1536) setWindowSize("2xl");
      else if (windowWidth >= 1280) setWindowSize("xl");
      else if (windowWidth >= 1024) setWindowSize("lg");
      else if (windowWidth >= 768) setWindowSize("md");
      else if (windowWidth >= 640) setWindowSize("sm");
      else setWindowSize("xs")
    };
  
    handleResize();
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="w-full bg-gray-100
    "> 
      <div className="max-w-screen-xl mx-auto min-h-screen items-center relative overflow-hidden py-5
      flex flex-col justify-between">
        {/* Score */}

        <div className="flex flex-col md:gap-2 sm:gap-1">
          <p className="text-black
            xl:text-3xl lg:text-2xl md:text-xl sm:text-lg
          ">
            Highscore: {highscore}
          </p>
          <p className="text-black
            xl:text-3xl lg:text-2xl md:text-xl sm:text-lg
          ">
            Score: {score}
          </p>
        </div>
        

        <img src={curPic} className="rounded-lg" width={getPicDimensions()} height={getPicDimensions()}/>

        <div className="flex flex-row gap-5">
          <motion.button className="bg-green-400 rounded-lg shadow-lg hover:bg-green-500
            xl:px-15 lg:px-13 md:px-10 sm:px-7 px-6
            xl:py-10 lg:py-8 md:py-5 sm:py-3 py-2
          "
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 2 }}
            onClick={() => checkGuess(true)}
          >
            <p className="font-bold
              xl:text-2xl lg:text-xl md:text-lg sm:text-base text-base
            "> Real </p>
          </motion.button>

          <motion.button className="bg-red-400 rounded-lg shadow-lg hover:bg-red-500
            xl:px-15 lg:px-13 md:px-10 sm:px-7 px-6
            xl:py-10 lg:py-8 md:py-5 sm:py-3 py-2
          "
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 2 }}
            onClick={() => checkGuess(false)}
          >
            <p className="font-bold
              xl:text-2xl lg:text-xl md:text-lg sm:text-base text-base
            "> Fake </p>
          </motion.button>
        </div>

      </div>
      
    </div>
  );
}
