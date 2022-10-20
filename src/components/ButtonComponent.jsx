import React from "react";

export default function ButtonComponent({
  children,
  type,
  modifiers,
  callback,
}) {
  const defaultButton =
    "px-2 py-2 rounded-full font-bold w-[300px] h-14 transition ease-in-out delay-150  duration-1000 ";
  const types = {
    primary: "text-white bg-outside-circle",
    secondary: "bg-white text-orange-primary",
    default: "bg-white text-black",
  };
  return (
    <button
      className={`${defaultButton} ${types[type]} ${modifiers}`}
      onClick={callback}
    >
      {children}
    </button>
  );
}
