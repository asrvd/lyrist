export default function Footer() {
  return (
    <p className="absolute bottom-0 w-full p-6 md:p-4 font-sans text-sm text-zinc-300 md:w-2/3 lg:w-1/2 ">
      Made with {`<3`} by{" "}
      <a
        className="text-pink-200"
        href="https://github.com/asrvd"
        target={"_blank"}
        rel="noreferrer"
      >
        Ashish
      </a>
      {" // "}
      <a
        className="text-pink-200"
        href="https://github.com/asrvd/lyrist"
        target={"_blank"}
        rel="noreferrer"
      >
        Source
      </a>
    </p>
  );
}
