import { GetStaticPaths, GetStaticProps } from "next";
import useSWR, { unstable_serialize as unstableSerialize } from "swr";
import Layout from "../../../components/Layout";
import Title from "../../../components/Layout/Title";
import Section from "../../../components/Section";
import { getAllNoteSlugs, getNoteData } from "../../../lib/note";
import { IPostData } from "../../../types/post";

interface Props {
  slug: string;
}

export default function Post({ slug }: Props) {
  const { data: noteData } = useSWR<IPostData>(["Props", slug]);

  return (
    <Layout>
      <Title title={noteData?.title} category={noteData?.category} />
      <Section slug={slug} />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllNoteSlugs();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const noteData = await getNoteData(params.slug, params.noteName);
  return {
    props: {
      slug: noteData.slug,
      fallback: {
        [unstableSerialize(["Props", noteData.slug])]: noteData,
      },
    },
  };
};
