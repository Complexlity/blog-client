// components/MarkdownUploader.js
import React, { useState, Dispatch, SetStateAction } from "react";

const MarkdownUploader = ({
  setMarkdownDetails: setMarkdownDetails,
}: {
  setMarkdownDetails: Dispatch<SetStateAction<{
    title: string;
    file: File | null;
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
      file: null
    })
    const selectedFile = event.target.files[0];
    
    if (
      (selectedFile && selectedFile.name.endsWith(".md")) ||
      selectedFile.name.endsWith(".MD")
    ) {

      setFile(selectedFile);
      console.log({file})
      const reader = new FileReader();
      reader.onload = (e) => {
        //@ts-expect-error
        const content = e.target.result as string;
        setPreviewContent(content);
        setMarkdownDetails({
          //@ts-expect-error
          title: extractTitle(content),
          file: file
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
          <h3>Preview:</h3>
          <pre>{previewContent}</pre>
        </div>
      )}     
      <form>
        <input type="file" accept=".md" onChange={handleFileChange} />
      </form>
    </div>
  );
};

export default MarkdownUploader;
