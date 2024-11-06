"use client";

type LoadingCursorProps={
  w:number;
  h:number;
}

export default function LoadingCursor({w, h}:LoadingCursorProps) {
  return (
    <div
      className=" flex items-center justify-center flex-col overflow-hidden bg-white "
      style={{ width: w, height:h}}
    >
      <div className="text-center m-10 font-serif">
        Loading.....
        <img
          src="http://a.top4top.net/p_1990j031.gif"
          alt="Loading animation"
          className="h-auto w-auto text-center"
        />
      </div>
    </div>
  );
}
