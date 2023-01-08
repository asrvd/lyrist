import type { SVGProps } from "react";

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M222 40v144a6 6 0 0 1-12 0V46H72a6 6 0 0 1 0-12h144a6 6 0 0 1 6 6Zm-32 32v144a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V72a6 6 0 0 1 6-6h144a6 6 0 0 1 6 6Zm-12 6H46v132h132Z"
      ></path>
    </svg>
  );
}
