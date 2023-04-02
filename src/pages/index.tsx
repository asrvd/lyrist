/* eslint-disable @typescript-eslint/no-misused-promises */

import { type NextPage } from "next";
import { useState } from "react";
import { CheckIcon } from "../components/Icons/Check";
import { CopyIcon } from "../components/Icons/Copy";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";

type Lyrics = {
  lyrics: string;
  id: string;
};

const Home: NextPage = () => {
  const [lyrics, setLyrics] = useState<Lyrics | null>(null);
  const [trackName, setTrackName] = useState<string>("");
  const [artistName, setArtistName] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleTrackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrackName(e.target.value);
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtistName(e.target.value);
  };

  const handleClick = async () => {
    if (trackName.trim() === "") {
      toast.error("Track name can't be empty!");
    } else {
      const res = await fetch(`/api/${trackName}/${artistName}`);
      if (res.ok) {
        const data = (await res.json()) as Lyrics;
        setLyrics(data);
      } else {
        if (res.status === 429) {
          toast.error("Rate limit exceeded!");
          return;
        } else {
          toast.error("Lyrics not found!");
        }
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(lyrics?.lyrics || "")
      .then(() => {
        setCopied(true);
        sleep(1000)
          .then(() => setCopied(false))
          .catch(() => null);
      })
      .catch(() => {
        toast.error("Couldn't Copy!");
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
      <section className="flex w-full flex-col items-center justify-center gap-4 p-2 md:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <input
            className="w-full rounded-md border border-zinc-600 bg-zinc-800/60 px-4 py-2 text-pink-100 shadow-xl outline-0 placeholder:text-zinc-400 hover:outline-0"
            placeholder="Enter track name"
            onChange={handleTrackChange}
          ></input>
          <div className="flex w-full items-center justify-start gap-4">
            <input
              className="w-full rounded-md border border-zinc-600 bg-zinc-800/60 px-4 py-2 text-pink-100 shadow-xl outline-0 placeholder:text-zinc-400 hover:outline-0"
              placeholder="Enter artist name (leave blank if unknown)"
              onChange={handleArtistChange}
            ></input>
            <button
              className="rounded-md border border-zinc-600 bg-zinc-800/90 px-4 py-2 text-pink-100 shadow-xl duration-300 hover:bg-zinc-800/60"
              onClick={handleClick}
            >
              Search
            </button>
          </div>
        </div>
        <div className="lyrics relative h-[400px] max-h-[400px] w-full overflow-y-scroll rounded-md border border-zinc-600 bg-zinc-800/60 p-4 text-sm text-pink-100 shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/50 scrollbar-thumb-rounded-md md:h-[250px] md:max-h-[250px]">
          <button
            onClick={handleCopy}
            className="duration:300 absolute top-[1rem] right-[1rem] z-[1000] rounded-md border border-zinc-600 bg-zinc-800/60 p-[0.35rem] text-base text-pink-100 shadow duration-300 hover:bg-zinc-700/40"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <p className="whitespace-pre-line">
            {lyrics?.lyrics || "Nothing here yet ..."}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
