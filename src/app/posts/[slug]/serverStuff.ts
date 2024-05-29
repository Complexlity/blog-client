"use server"

import {
    calculateTimeToReadPost,
    formatDate
} from "@/lib/utils"
import { Post } from "@/lib/types"
import rehypeParse from 'rehype-parse'
import rehypeRemark from 'rehype-remark'
import remarkStringify from 'remark-stringify'
import { unified } from 'unified'

export async function downloadMarkdown(post: Post) {
    const fullPost = getPostHtmlAsString(post).replace(/[\n+]/g, '');
    console.log(fullPost)
    console.log("Converting to markdown")
    const fullPostMarkdown = await unified()
    .use(rehypeParse) // Parse HTML to a syntax tree
    .use(rehypeRemark) // Turn HTML syntax tree to markdown syntax tree
    .use(remarkStringify) // Serialize HTML syntax tree
      .process(fullPost)
    console.log("Done converting to markdown")
    const markDownString = String(fullPostMarkdown)
    console.log({ markDownString })
    
}
  

function getPostHtmlAsString(post: Post) {
    const title = `<h1>${post.title}</h1>`
    const postBanner = `<img src=${post.coverImageSource} alt="Banner"/>`
    const postContent = document.querySelector('.post-content')?.outerHTML
    const breakLine = ``
    const info = `<p>by <strong>${post.author.name}</strong> - ${formatDate(post.createdAt, "full")} - ${calculateTimeToReadPost(post.type == "raw" ? removeHtmlTags(post.content) : post.content)} </p>`
    const fullPost = title + breakLine + postBanner +  breakLine + postContent + breakLine + info
    return fullPost
  }
  
  
  function removeHtmlTags(str: string) {
    // Remove HTML tags
    const cleanedFromHtml = str.replace(/<[^>]*>/g, '');
  
    // Remove newline characters
    const finalCleaned = cleanedFromHtml.replace(/\s+/g, ' ');
  
    return finalCleaned.trim(); // Trim spaces around the text 
  }
  