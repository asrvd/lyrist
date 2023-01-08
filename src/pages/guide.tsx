import Layout from "../components/Layout";
import { CheckIcon } from "../components/Icons/Check";
import { CopyIcon } from "../components/Icons/Copy";
import { useState } from "react";

const copyCode = `await fetch('https://lyrist.vercel.app/api/fumes/eden').then(
	res => {
	    if (res.status === 200) {
		    console.log(res.json())
	    } else {
		    console.log('Not Found')
	    }
    }
).catch(...)`;

export default function Guide() {
  const [copied, setCopied] = useState<boolean>(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleCopy = () => {
    navigator.clipboard
      .writeText(copyCode)
      .then(() => {
        setCopied(true);
        sleep(1000)
          .then(() => setCopied(false))
          .catch(() => null);
      })
      .catch(() => {
        alert("Failed to copy lyrics to clipboard");
      });
  };

  return (
    <Layout>
      <section className="mt-4 flex w-full flex-col items-center justify-center p-2 md:w-2/3 lg:w-1/2">
        <h2 className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-[5rem] font-black text-transparent md:text-[7rem]">
          lyrist
        </h2>
        <p className="text-center text-base text-pink-100 md:text-xl">
          a simple and easy to use RESTful lyrics API that just works
        </p>
      </section>
      <section className="mt-4 flex w-full flex-col items-center justify-center gap-4 p-2 md:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col gap-2">
          <p className="text-zinc-200">API Endpoint</p>
          <p className="rounded-md border border-zinc-600 bg-zinc-800/60 px-4 py-2 font-mono text-sm tracking-tighter text-zinc-300 shadow-xl">
            /api/<span className="text-pink-200">:track_name</span>/
            <span className="text-pink-200">:artist_name</span>
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="text-zinc-200">JavaScriptCode Example</p>
          <p className="relative overflow-x-scroll whitespace-pre-wrap rounded-md border border-zinc-600 bg-zinc-800/60 p-4 font-mono text-sm leading-tight tracking-tighter text-pink-200 shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/50 scrollbar-thumb-rounded-md">
            {copyCode}
            <button
              onClick={handleCopy}
              className="duration:300 absolute top-[1rem] right-[1rem] z-[1000] rounded-md border border-zinc-600 bg-zinc-800/60 p-[0.35rem] text-base text-pink-100 shadow duration-300 hover:bg-zinc-700/40"
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
            </button>
          </p>
        </div>
      </section>
    </Layout>
  );
}
