// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import clsx from "clsx"; // Install clsx or classnames for cleaner class handling

// type ButtonProps = {
//   type?: 'button' | 'submit'; // Default to 'button'
//   title: string;
//   icon?: string; // Optional icon source
//   variant: 'primary' | 'secondary' | 'tertiary'; // Restrict variant to predefined styles
//   full?: boolean; // Determines if button takes full width
//   dest?: string; // Optional destination for navigation
// };

// const Button: React.FC<ButtonProps> = ({
//   type = 'button',
//   title,
//   icon,
//   variant,
//   full = false,
//   dest,
// }) => {
//   const buttonClasses = clsx(
//     "flexCenter gap-3 rounded-full border",
//     variant,
//     { "w-full": full } // Conditionally add the `w-full` class
//   );

//   const content = (
//     <button
//       className={buttonClasses}
//       type={type}
//       aria-label={title} // Accessibility improvement
//     >
//       {icon && (
//         <Image
//           src={icon}
//           alt={`${title} icon`}
//           width={24}
//           height={24}
//           priority={true} // Preload the icon for better performance
//         />
//       )}
//       <span className="bold-16 whitespace-nowrap">{title}</span>
//     </button>
//   );

//   return dest ? (
//     <Link href={dest} passHref>
//       {content}
//     </Link>
//   ) : (
//     content
//   );
// };

// export default Button;