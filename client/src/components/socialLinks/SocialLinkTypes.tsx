import Image from "next/image";
import { ReactElement } from "react";

export type SocialLinks = {
  symbol: ReactElement;
  name: string;
};

export const SocialLinks: SocialLinks[] = [
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/LinkedIn.svg"
        alt="LinkedIn"
        width={40}
        height={40}
      />
    ),
    name: "LinkedIn",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Github.svg"
        alt="GitHub"
        width={40}
        height={40}
      />
    ),
    name: "GitHub",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Website.svg"
        alt="Website"
        width={40}
        height={40}
      />
    ),
    name: "Website",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Youtube.svg"
        alt="YouTube"
        width={40}
        height={40}
      />
    ),
    name: "YouTube",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Instagram.svg"
        alt="Instagram"
        width={40}
        height={40}
      />
    ),
    name: "Instagram",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/X.svg"
        alt="Twitter"
        width={40}
        height={40}
      />
    ),
    name: "Twitter",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Facebook.svg"
        alt="Facebook"
        width={40}
        height={40}
      />
    ),
    name: "Facebook",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Email.svg"
        alt="Email"
        width={40}
        height={40}
      />
    ),
    name: "Email",
  },
  {
    symbol: (
      <Image
        src="/socialicons/newIcons/Discord.svg"
        alt="Discord"
        width={40}
        height={40}
      />
    ),
    name: "Discord",
  },
];
