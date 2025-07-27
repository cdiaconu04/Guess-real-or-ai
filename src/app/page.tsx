"use client"
import Image from "next/image";
import { useState } from 'react';


export default function Home() {

  const [score, setScore] = useState(0);

  return (
    <div className="w-full bg-gray-100
    "> 
      <div className="max-w-screen-xl mx-auto min-h-screen items-center relative overflow-hidden py-5
      flex flex-col justify-between">
        {/* Score */}
        <p className="text-3xl text-black">
          Score: {score}
        </p>

        <img src="/gamePics/fake/0C3B3TQEHB.jpg"/>

        <div className="flex flex-row gap-5">
          <button className="px-15 py-10 bg-green-400 rounded-lg shadow-lg hover:bg-green-500">
            <p className="text-2xl font-bold"> Real </p>
          </button>

          <button className="px-15 py-10 bg-red-400 rounded-lg shadow-lg hover:bg-red-500">
            <p className="text-2xl font-bold"> Fake </p>
          </button>
        </div>

      </div>
      
    </div>
  );
}
