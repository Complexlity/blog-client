"use client";

function CustomQuoteRenderer({ data }: any) {
  data;
  console.log(data)

  return (
    <blockquote className="">
      {data.text} <span className="font-bold text-center mx-auto block">{data.caption}</span>
    </blockquote>
  );
}

export default CustomQuoteRenderer;
