"use client"
import Image from "next/image";
import { useState } from 'react';
import { motion } from "motion/react";
import { realPics } from "@/constants/reals";
import { fakePics } from "@/constants/fakes";

export default function Home() {

  const [score, setScore] = useState(0);
  const [curIsReal, setCurIsReal] = useState(false);
  const [curPic, setCurPic] = useState(fakePics[0]);
  const numPics = 5;

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
      setScore(prev => prev + 1);
    } else { // Incorrect
      setScore(0);
    }

    getNewPic();
  }

  return (
    <div className="w-full bg-gray-100
    "> 
      <div className="max-w-screen-xl mx-auto min-h-screen items-center relative overflow-hidden py-5
      flex flex-col justify-between">
        {/* Score */}
        <p className="text-3xl text-black">
          Score: {score}
        </p>

        <img src={curPic} className="rounded-lg" width={400} height={400}/>

        <div className="flex flex-row gap-5">
          <motion.button className="px-15 py-10 bg-green-400 rounded-lg shadow-lg hover:bg-green-500"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 2 }}
            onClick={() => checkGuess(true)}
          >
            <p className="text-2xl font-bold"> Real </p>
          </motion.button>

          <motion.button className="px-15 py-10 bg-red-400 rounded-lg shadow-lg hover:bg-red-500"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 2 }}
            onClick={() => checkGuess(false)}
          >
            <p className="text-2xl font-bold"> Fake </p>
          </motion.button>
        </div>

      </div>
      
    </div>
  );
}
