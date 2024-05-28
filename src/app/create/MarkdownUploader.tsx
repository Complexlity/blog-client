// components/MarkdownUploader.js
import React, { useState, Dispatch, SetStateAction } from "react";
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
 

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
  // console.log({markdownTitle: title})
  const extractTitle = (content: string) => {
    const lines = content.split("\n");

    for (const line of lines) {
      if (line.trim() === '') continue; 
      if (line.startsWith("# ")) {
        return line.replace("# ", "").trim();
      }
      else {
        const firstTwoWords = content.split(/\s+/).slice(0, 2).join(" ");
        return firstTwoWords;    
      }

    }
    
  };

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
      console.log({file})
      const reader = new FileReader();
      reader.onload = async (e) => {
        //@ts-expect-error
        
        const content = e.target.result as string;
        const markdown = await unified()
        .use(remarkParse) // Convert into markdown AST
        .use(remarkRehype) // Transform to HTML AST
        .use(rehypeSanitize) // Sanitize HTML input
        .use(rehypeStringify) // Convert AST into serialized HTML
        .process(content)
        
        console.log({markdown})
        const html = String(markdown)
        setPreviewContent(html);

        setMarkdownDetails({
          //@ts-expect-error
          title: extractTitle(content),
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
    <div>
      {previewContent && (
        <div>
          <h3>Preview (readonly)</h3>
          <div>
            <div className="prose" dangerouslySetInnerHTML={{ __html: previewContent }} />
  );
            </div>
        </div>
      )}     
      <form>
        <input type="file" accept=".md" onChange={handleFileChange} />
      </form>
    </div>
  );
};

export default MarkdownUploader;
