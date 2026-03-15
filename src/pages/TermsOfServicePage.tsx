import { Suspense } from "react";
import termsMarkdown from "../terms-of-service.md?raw";
import ReactMarkdown from "react-markdown";
import { Loader2 } from "lucide-react";

export function TermsOfServicePage() {
  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
          }
        >
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1
                    className="text-3xl font-bold mt-6 mb-4 text-zinc-100"
                    {...props}
                  />
                ),
                h2: ({ node, ...props }) => (
                  <h2
                    className="text-2xl font-bold mt-6 mb-3 text-zinc-100"
                    {...props}
                  />
                ),
                h3: ({ node, ...props }) => (
                  <h3
                    className="text-xl font-bold mt-4 mb-2 text-zinc-100"
                    {...props}
                  />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-zinc-300 mb-4 leading-7" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside text-zinc-300 mb-4 space-y-2"
                    {...props}
                  />
                ),
                ol: ({ node, ...props }) => (
                  <ol
                    className="list-decimal list-inside text-zinc-300 mb-4 space-y-2"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-emerald-500 pl-4 italic text-zinc-400 my-4"
                    {...props}
                  />
                ),
                code: ({ node, inline, ...props }: any) =>
                  inline ? (
                    <code
                      className="bg-zinc-800 text-emerald-400 px-2 py-1 rounded text-sm"
                      {...props}
                    />
                  ) : (
                    <code
                      className="bg-zinc-900 text-emerald-400 block p-4 rounded mb-4 overflow-x-auto"
                      {...props}
                    />
                  ),
                a: ({ node, href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" underline"
                    {...props}
                  />
                ),
              }}
            >
              {termsMarkdown}
            </ReactMarkdown>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
