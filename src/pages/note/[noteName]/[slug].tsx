import { GetStaticPaths, GetStaticProps } from "next";
import useSWR, { unstable_serialize as unstableSerialize } from "swr";
import Layout from "../../../components/Layout";
import Title from "../../../components/Layout/Title";
import Section from "../../../components/domain/Article";
import {
  getAllNoteSlugs,
  getNoteData,
  getSortedNotesData,
} from "../../../lib/note";
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
  const allNoteData = await getSortedNotesData();
  return {
    props: {
      slug: noteData.slug,
      allNoteData,
      fallback: {
        [unstableSerialize(["Props", noteData.slug])]: noteData,
      },
    },
  };
};
