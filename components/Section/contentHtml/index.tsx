import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface Props {
  content: string;
}

const customComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code(code: any) {
    const { className, children, ...props } = code;
    const language = /language-(\w+)/.exec(className || ""); // language-tsx => tsx

    return language ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <SyntaxHighlighter style={oneLight} language={language[1]} {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code>{children}</code>
    );
  },
};

function ContentHtml({ content }: Props) {
  return (
    <article>
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  );
}

export default ContentHtml;
