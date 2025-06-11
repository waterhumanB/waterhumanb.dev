import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
// eslint-disable-next-line import/no-extraneous-dependencies
import rehypeRaw from "rehype-raw"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import light from "react-syntax-highlighter/dist/cjs/styles/prism/one-light"
import Image from "next/image"
import styles from "./content.module.scss"

interface Props {
  content: string | undefined
}

const customComponents = {
  p(paragraph: any) {
    const { node } = paragraph
    if (node.children[0].tagName === "img") {
      const image = node.children[0]
      return (
        <div className={styles.imgBox}>
          <Image
            src={image.properties.src}
            alt={image.alt ?? "alt"}
            width={500}
            height={500}
          />
        </div>
      )
    }
    return <p>{paragraph.children}</p>
  },
  a(anchor: any) {
    return (
      <a href={anchor.href} target='_blank' rel='noopener noreferrer'>
        {anchor.children}
      </a>
    )
  },
  code(code: any) {
    const { className, children, ...props } = code
    const language = /language-(\w+)/.exec(className || "") // language-tsx => tsx

    return language ? (
      <SyntaxHighlighter style={light} language={language[1]} {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code>{children}</code>
    )
  },
}

function ContentHtml({ content }: Props) {
  return (
    <article className={styles.container}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        components={customComponents}
      >
        {content ?? ""}
      </ReactMarkdown>
    </article>
  )
}

export default ContentHtml
