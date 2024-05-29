"use client";

import EditorOutput from "@/app/posts/[slug]/Main";
import { Post } from "@/lib/types";
import {
  calculateTimeToReadPost,
  formatDate,
  getCategoryColor,
} from "@/lib/utils";
import { BookOpen, MessagesSquare } from "lucide-react";
import Image from "next/image";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";
import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkStringify from "remark-stringify";

function removeHtmlTags(str: string) {
  // Remove HTML tags
  const cleanedFromHtml = str.replace(/<[^>]*>/g, "");

  // Remove newline characters
  const finalCleaned = cleanedFromHtml.replace(/\s+/g, " ");

  return finalCleaned.trim(); // Trim spaces around the text
}

function getPostHtmlAsString(post: Post) {
  const title = `<h1>${post.title}</h1>`;
  const postBanner = `<img src=${post.coverImageSource} alt="Banner"/>`;
  const postContent = document.querySelector(".post-content")?.outerHTML;
  const breakLine = ``;
  const info = `<p>by <strong>${post.author.name}</strong> - ${formatDate(
    post.createdAt,
    "full"
  )} - ${calculateTimeToReadPost(
    post.type == "raw" ? removeHtmlTags(post.content) : post.content
  )} </p>`;
  const fullPost =
    title + breakLine + postBanner + breakLine + postContent + breakLine + info;
  return fullPost.replace(/[\n+]/g, "");
}

async function convertHtmlStringToMarkdown(htmlString: string) {
  const fullPostMarkdown = await unified()
  .use(rehypeParse) // Parse HTML to a syntax tree
  .use(rehypeRemark) // Turn HTML syntax tree to markdown syntax tree
  .use(remarkStringify) // Serialize HTML syntax tree
  .process(htmlString);
const markDownString = String(fullPostMarkdown);
return markDownString
}

function saveMarkdown(markdownString: string, slug:string) {
  // Create a Blob from the markdown string
  let blob = new Blob([markdownString], { type: "text/markdown" });
  // Create a URL for the Blob
  let url = URL.createObjectURL(blob);
  // Create a link element
  let link = document.createElement("a");
  link.href = url;
  link.download = `${slug}.md`;
  // Append the link to the body (required for Firefox)
  document.body.appendChild(link);
  // Programmatically click the link to trigger the download
  link.click();
  // Remove the link from the document
  document.body.removeChild(link);
  // Revoke the object URL after a short delay
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadMarkdown(post: Post, slug:string) {
  const fullPostHtml = getPostHtmlAsString(post);
  const markDownString = await convertHtmlStringToMarkdown(fullPostHtml)
  saveMarkdown(markDownString, slug);
}

function downloadPdf() {
  window.print()
}

const SinglePost = ({ post, slug }: { post: Post, slug: string }) => {
  return (
    <>
      <div className="bg-white pb-8 relative">
        <button
          onClick={async () => {
            downloadPdf()
            // await downloadMarkdown(post, slug);
          }}
          className="absolute right-20 bg-orange-400"
        >
          Check Here
        </button>
        <div className="whole_post">
          <header className="post-header grid max-w-[800px] mx-auto px-8 text-center pt-8">
            <h1 className="font-roboto font-extrabold text-3xl md:text-4xl mb-4">
              {post.title}
            </h1>
            <p className=" mx-auto flex items-center gap-2 md:text-lg mb-4 ">
              <Image
                src={post.author.imageSrc}
                width={24}
                height={24}
                className="rounded-full object-cover h-6 w-6 sm:h-10 sm:w-10 object-top"
                unoptimized
                alt=""
              />
              <span className="font-bold text-sm sm:text-base">
                {post.author.name}
              </span>
              <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-600 align-middle"></span>
              <span className="text-sm sm:text-base">
                {formatDate(post.createdAt, "full")}
              </span>
              <span className="inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gray-600 align-middle"></span>

              <span className="flex sm:gap-1 text-sm sm:text-base">
                <BookOpen />
                {calculateTimeToReadPost(
                  post.type == "raw"
                    ? removeHtmlTags(post.content)
                    : post.content
                )}{" "}
                min read
              </span>
            </p>
            <div className=" flex mx-auto gap-6 items-center justify-center">
              <p
                style={{ backgroundColor: getCategoryColor(post.category) }}
                className="px-2 py-1 sm:px-6 sm:py-2 rounded-full text-blueDarkest font-bold hover:shadow-xl hover:shadow-gray-200 text-sm sm:text-base"
              >
                {post.category}
              </p>
            </div>
            {post.coverImageSource ? (
              <div className="h-[300px] sm:h-[500px] mx-auto w-full m-10">
                <Image
                  src={post.coverImageSource}
                  width={24}
                  height={24}
                  className="w-full h-full object-cover object-top rounded-md"
                  alt=""
                  unoptimized
                />
              </div>
            ) : null}
          </header>
          <main className="pt-0 prose text-black sm:text-gray-900 mx-auto relative space-y-6 p-4 md:p-0">
            <div className="post-content">
              {post.type == "raw" ? (
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <EditorOutput content={JSON.parse(post.content)} />
              )}
            </div>

            {/* Sticky Buttons */}
            <div className="not-prose bg-white rounded-full items-center flex max-w-fit px-5 py-1 text-sm border-2 border-slate-200 mx-auto">
              <div className="flex gap-1 items-center">
                <LikeButton
                  id={post._id}
                  likes={post.likes}
                  likeCount={post.likeCount}
                  type={"posts"}
                />
              </div>

              <div className="w-0.5 h-6 mx-2 bg-slate-200"></div>

              {/* Comments Drawer */}
              <div className="">
                <div className="drawer drawer-end ">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    <label
                      htmlFor="my-drawer-4"
                      className="flex gap-1 items-center"
                    >
                      <div className="rounded-full p-2 hover:bg-sky-100 hover:text-sky-600">
                        <MessagesSquare size={23} />
                      </div>
                      <span>{post.comments.length}</span>
                    </label>
                  </div>
                  <div className="drawer-side overflow-hidden ">
                    <label
                      htmlFor="my-drawer-4"
                      className="drawer-overlay"
                    ></label>
                    <div className="p-4 z-[40] fixed right-0 overflow-y-auto max-w-[400px] w-[75%] h-full bg-white text-base-content ">
                      <CommentSection
                        postId={post._id}
                        comments={post.comments}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SinglePost;
