"use client";

interface QuoteProps {
  text: string,
  caption?: string,
  alignment: string
}

function CustomQuoteRenderer({ data }: { data: QuoteProps }) {
  data;
  console.log(data)

  return (
    <blockquote className="">
      {data.text} <span className="font-bold text-center mx-auto block">{data.caption}</span>
    </blockquote>
  );
}

export default CustomQuoteRenderer;
