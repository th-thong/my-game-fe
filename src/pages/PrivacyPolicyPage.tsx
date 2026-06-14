import privacyMarkdown from "../privacy-policy.md?raw";
import ReactMarkdown from "react-markdown";

type CodeProps = { inline?: boolean } & React.HTMLAttributes<HTMLElement>;

export function PrivacyPolicyPage() {
  return (
    <div className="w-full h-full overflow-y-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown
            components={{
              h1: (props) => (
                <h1
                  className="text-3xl font-bold mt-6 mb-4 text-foreground"
                  {...props}
                />
              ),
              h2: (props) => (
                <h2
                  className="text-2xl font-bold mt-6 mb-3 text-foreground"
                  {...props}
                />
              ),
              h3: (props) => (
                <h3
                  className="text-xl font-bold mt-4 mb-2 text-foreground"
                  {...props}
                />
              ),
              p: (props) => (
                <p className="text-muted-foreground mb-4 leading-7" {...props} />
              ),
              ul: (props) => (
                <ul
                  className="list-disc list-inside text-muted-foreground mb-4 space-y-2"
                  {...props}
                />
              ),
              ol: (props) => (
                <ol
                  className="list-decimal list-inside text-muted-foreground mb-4 space-y-2"
                  {...props}
                />
              ),
              blockquote: (props) => (
                <blockquote
                  className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4"
                  {...props}
                />
              ),
              code: ({ inline, ...props }: CodeProps) =>
                inline ? (
                  <code
                    className="bg-muted text-primary px-2 py-1 rounded text-sm"
                    {...props}
                  />
                ) : (
                  <code
                    className="bg-muted text-primary block p-4 rounded mb-4 overflow-x-auto"
                    {...props}
                  />
                ),
              a: (props) => (
                <a
                  href={props.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  {...props}
                />
              ),
            }}
          >
            {privacyMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
