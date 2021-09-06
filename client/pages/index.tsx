import axios from 'axios';
import type { NextPage } from 'next';
import { InferGetStaticPropsType, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/Link';

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('http://localhost:5000/api/items');
  const items = res.data;

  return {
    props: {
      items,
    },
  };
};

interface Item {
  _id: string;
  name: string;
}

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <form>
        <input type="text" onChange={(e) => setSearchText(e.target.value)} />
        <Link href={`/search?q=${searchText}`}>
          <input type="submit" />
        </Link>
      </form>
    </>
  );
};

export default Home;
