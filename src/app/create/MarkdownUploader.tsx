// components/MarkdownUploader.js
import React, { useState, Dispatch, SetStateAction } from "react";
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { MinusCircle } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/Components/ui/hover-card";
 
function lineIsHeaderOne(str: string) {
  const startsWithHash = (str.startsWith("# ")) 
  const startsWithMultiHash =  str.startsWith("#") && !str.startsWith("##")
  return startsWithHash && startsWithMultiHash
}

const extractTitle = (content: string) => {
  let [firstLine, ...rest] = content.trim().split("\n");

  firstLine = firstLine.trim()
  let others: string = rest.join("\n")
  let title = "";
  let newContent = "";

  //It starts with a heading1 (# and not ## or ###....)
  if (lineIsHeaderOne(firstLine)) {
      let heading1 = firstLine.replace(/^#+\s*/, '')
      // The heading one is short and coincise
      if (heading1.length < 50) {
          title = heading1;
          
          newContent = `# ${title}\n${newContent}`
      } else {
          let longTitle = heading1.split(/\s+/)
          title = longTitle.slice(0, 2).join(" ");
          newContent = `# ${title}\n##${longTitle}\n${others.replace(/^# /, '## ')}`;
      }
  } else {
      if (firstLine.length > 50) {
          let longTitle = firstLine.split(/\s+/)
          title = longTitle.slice(0, 2).join(" ");
          newContent = `# ${title}\n##${longTitle}\n${others.replace(/^# /, '## ')}`;
      } else {
          title = title = firstLine.replace(/^#+\s*/, '')
          newContent = others.replace(/(^# .+\n?)/, '## ');
          newContent = `# ${title}\n${newContent}`;
      }
  }

  return { title, content: newContent };
};

function replaceH1WithH2(htmlString: string): string {
  // Use a regex to match all <h1> tags
  const h1Regex = /<h1\b[^>]*>(.*?)<\/h1>/gi;

  // Find all <h1> tags in the HTML string
  let match: RegExpExecArray | null;
  const matches: RegExpExecArray[] = [];
  while ((match = h1Regex.exec(htmlString)) !== null) {
      matches.push(match);
  }

  // Keep the first two <h1> tags as is and replace the rest with <h2>
  let replacementCount = 0;
  const result = htmlString.replace(h1Regex, (match, content) => {
      replacementCount++;
      if (replacementCount <= 1) {
          return match; // Keep the first two <h1> tags
      } else {
          return `<h2>${content}</h2>`; // Replace with <h2>
      }
  });

  return result;
}



const MarkdownUploader = ({
  setMarkdownDetails: setMarkdownDetails,
}: {
  setMarkdownDetails: Dispatch<SetStateAction<{
    title: string;
    file: File | null;
    rawHtml: string
}>>
}) => {
  const [file, setFile] = useState(null);
  const [previewContent, setPreviewContent] = useState("");
  // const [title, setTitle] = useState("");
  // const extractTitle = (content: string) => {
  //   const lines = content.split("\n");

  //   for (const line of lines) {
  //     if (line.trim() === '') continue; 
  //     if (line.startsWith("# ")) {
  //       return line.replace("# ", "").trim();
  //     }
  //     else {
  //       const firstTwoWords = content.split(/\s+/).slice(0, 2).join(" ");
  //       return firstTwoWords;    
  //     }

  //   }
    
  // };

  const handleFileChange = (event: any) => {
    setMarkdownDetails({
      title: "", 
      file: null,
      rawHtml: ""
    })
    const selectedFile = event.target.files[0];
    
    if (
      (selectedFile && selectedFile.name.endsWith(".md")) ||
      selectedFile.name.endsWith(".MD")
    ) {

      setFile(selectedFile);
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        //@ts-expect-error
        const { title, content } = extractTitle(e.target.result)
        const markdown = await unified()
        .use(remarkParse) // Convert into markdown AST
        .use(remarkRehype) // Transform to HTML AST
        .use(rehypeSanitize) // Sanitize HTML input
        .use(rehypeStringify) // Convert AST into serialized HTML
        .process(content)
        
        let html = String(markdown)
        html = replaceH1WithH2(html)
        setPreviewContent(html);

        setMarkdownDetails({
          title,
          file: file,
          rawHtml: html
        });
      };
      reader.readAsText(selectedFile);

    } else {
      alert("Please upload a valid Markdown file (.md)");
    }
  };

  

  return (
    <div className="grid py-4 px-2 gap-4 ">
      <form className="flex ">
        <input id="markdownFile" type="file" accept=".md" onChange={handleFileChange} />
        {
          (previewContent || file) &&
          
          <HoverCard openDelay={1} closeDelay={0}>
          <HoverCardTrigger>
          <div
            onClick={() => {
              setPreviewContent("")
            setMarkdownDetails({
              title: "",
              file: null,
              rawHtml: ""
            })
                    setFile(null)
            //@ts-expect-error
            document.querySelector('#markdownFile')!.value = ""
          }}
          className="aspect-square h-10 w-10 rounded-full  hover:bg-rose-100 text-red-400 text-sm md:text-base cursor-pointer  flex justify-center items-center"
        >
          <MinusCircle />
        </div>
                <HoverCardContent className="px-2 py-1">
                {/* @ts-expect-error */}
              Remove {file ? file.name : "file"}
            </HoverCardContent>
          </HoverCardTrigger>
        </HoverCard>
          
        }
      </form>
      {previewContent && (
        <div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: previewContent }} />

        </div>
      )}     
      
    </div>
  );
};

export default MarkdownUploader;
