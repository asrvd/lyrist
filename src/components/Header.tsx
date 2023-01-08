import { useRouter } from "next/router";

const navLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Guide",
    path: "/guide",
  },
];

export default function Header() {
  const router = useRouter();
  const path = router.asPath;

  return (
    <p className="absolute py-4 top-0 w-full p-6 font-sans text-sm text-zinc-300 md:w-2/3 md:p-4 lg:w-1/2 flex gap-2">
      {navLinks.map((link, index) => {
        if (link.path === path) {
          return (
            <a
              key={index}
              href={link.path}
              className="font-semibold text-pink-200 bg-zinc-800/60 duration-200 rounded-md p-2 border border-zinc-600"
            >
              {link.name}
            </a>
          );
        } else {
          return (
            <a key={index} href={link.path} className="hover:bg-zinc-800/60 duration-200 rounded-md p-2">
              {link.name}
            </a>
          );
        }
      })}
    </p>
  );
}
