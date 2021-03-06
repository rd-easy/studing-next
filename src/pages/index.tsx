/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { api } from '../services/api';
import { Container } from '../styles/pages/Home';

type UserProps = {
  id: string;
  name: string;
  image: string;
};

type Props = {
  data: UserProps[];
};

const Home: NextPage<Props> = ({ data }) => {
  return (
    <Container>
      {data.map(data => (
        <div key={data.id}>
          <h1>{data.name}</h1>
          <Link href={`/info/filter?user_id=${data.id}`}>
            <a>{data.name}</a>
          </Link>
          <p>{data.image}</p>
        </div>
      ))}
    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // Retornar os dados já prontos para fazer a renderização
  const { data } = await api.get<UserProps[]>('/user');

  return {
    props: {
      data
    }
  };
};
