import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import ItemCard from '../../components/ItemCard';
import { IItem } from '../../../shared/interfaces/Item';

interface SearchProps {
  items: IItem[];
  query: string;
}

const Search: React.FC<SearchProps> = ({ items, query }) => {
  return (
    <>
      <div>Results for &quot;{query.toLowerCase()}&quot;</div>
      <div>
        {items.map(
          ({
            _id,
            name,
            price,
            seller,
            category,
            image,
            description,
            quantity,
          }: IItem) => (
            <ItemCard
              key={_id}
              name={name}
              price={price}
              seller={seller}
              category={category}
              image={image}
              description={description}
              quantity={quantity}
            />
          ),
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query;
  const query = q;

  const res = await axios.get(
    `http://localhost:5000/api/items/search?q=${query}`,
  );
  const items = res.data;

  return {
    props: {
      items,
      query,
    },
  };
};

export default Search;
