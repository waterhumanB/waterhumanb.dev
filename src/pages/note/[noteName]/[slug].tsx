import { GetStaticPaths, GetStaticProps } from "next";
import useSWR, { unstable_serialize as unstableSerialize } from "swr";
import Layout from "../../../components/Layout";
import Title from "../../../components/Layout/Title";
import Section from "../../../components/domain/Section";
import { getAllNoteSlugs, getNoteData } from "../../../lib/note";
import { INoteItem } from "../../../types/note";

interface Props {
  slug: string;
}

export default function Post({ slug }: Props) {
  const { data: noteData } = useSWR<INoteItem>(["Props", slug]);

  return (
    <Layout>
      <Title title={noteData?.title} />
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
