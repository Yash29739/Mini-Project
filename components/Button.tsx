"use client";

import Image from "next/image";
import Link from "next/link"; // Import the Link component from Next.js

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  dest?: string;
}

const Button = ({ type, title, icon, variant, full, dest }: ButtonProps) => {
  return (
    <Link href={dest || "#"} passHref> {/* Use Link for navigation */}
      <button
        className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}
        type={type}
      >
        {icon && <Image src={icon} alt={title} width={24} height={24} />}
        <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
      </button>
    </Link>
  );
}

export default Button;
