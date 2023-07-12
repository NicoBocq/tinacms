import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { Jobs } from "../components/jobs";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const jobs = props.data.jobConnection.edges;

  return (
    <Layout metaData={{
      title: "Jobs at inforca",
      description: "Jobs at Inforca",
    }}>
      <Section className="flex-1">
        <Container size="large" width="small">
          <Jobs data={jobs} />
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type JobsType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["jobConnection"]["edges"][number];
