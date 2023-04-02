import Layout from "../components/Layout";

const responseObject = `{
  "title": "Fumes",
  "artist": "EDEN",
  "lyrics": "The morning light...",
  "source": "Musixmatch"
}`;

export default function Guide() {
  return (
    <Layout>
      <section className="mt-4 flex w-full flex-col items-center justify-center p-2 md:w-2/3 lg:w-1/2">
        <h2 className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-[5rem] font-black text-transparent md:text-[7rem]">
          lyrist
        </h2>
        <p className="text-center text-base text-pink-100 md:text-lg">
          a simple and easy to use RESTful lyrics API that just works, please note that you can only make 150 requests per hour to prevent abuse of the API.
        </p>
      </section>
      <section className="mt-4 flex w-full flex-col items-center justify-center gap-4 p-2 md:w-2/3 lg:w-1/2">
        <div className="flex w-full flex-col gap-2">
          <p className="text-zinc-200">
            API Endpoint (Artist name is optional)
          </p>
          <p className="rounded-md border border-zinc-600 bg-zinc-800/60 px-4 py-2 font-mono text-sm tracking-tighter text-zinc-300 shadow-xl">
            /api/<span className="text-pink-200">:track_name</span>/
            <span className="text-pink-200">:artist_name</span>
          </p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="text-zinc-200">Response Example</p>
          <div className="overflow-x-scroll whitespace-pre-wrap rounded-md border border-zinc-600 bg-zinc-800/60 p-4 font-mono text-sm leading-tight tracking-tighter text-pink-200 shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/50 scrollbar-thumb-rounded-md">
            <span className="text-xs text-zinc-400">
              /api/fumes/eden will return this JSON object
            </span>
            <p className="mt-4">{responseObject}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
