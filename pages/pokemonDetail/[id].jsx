import axios from 'axios';
import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import styled from 'styled-components';

const pokemonCount = 721;

const pokemonDetail = ({
  pokemonName,
  pokemonId,
  weight,
  height,
  types,
  image,
}) => {
  return (
    <SContainer>
      <h2>{pokemonName}</h2>
      <p>重さ: {weight}</p>
      <p>高さ: {height}</p>
      <img src={image} alt='' />
      <SButtonGroup>
        {Number(pokemonId) > 1 && (
          <Link href={`/pokemonDetail/${Number(pokemonId) - 1}`}>
            <SButton>前へ</SButton>
          </Link>
        )}
        {Number(pokemonId) < pokemonCount && (
          <Link href={`/pokemonDetail/${Number(pokemonId) + 1}`}>
            <SButton>次へ</SButton>
          </Link>
        )}
      </SButtonGroup>
    </SContainer>
  );
};

export async function getStaticProps(context) {
  const id = Number(context.params.id);
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const {
    name: pokemonName,
    id: pokemonId,
    height,
    sprites,
    types,
    weight,
  } = response.data;

  return {
    props: {
      pokemonName,
      pokemonId,
      height,
      weight,
      types,
      image: sprites.front_default,
    },
  };
}

export async function getStaticPaths() {
  const paths = [];
  for (let i = 1; i <= pokemonCount; i++) {
    paths.push({ params: { id: String(i) } });
  }
  return { paths, fallback: true };
}

export default pokemonDetail;
const SContainer = styled.div`
  width: 80%;
  max-width: 500px;
  margin: 0 auto;

  img {
    width: 500px;
    height: 400px;
    border: 5px solid skyblue;
    border-radius: 20px;
  }
`;

const SButtonGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const SButton = styled.button`
  padding: 1rem 2.5rem;
  border: none;
  color: white;
  background-color: skyblue;
  box-shadow: 8px 8px 18px -11px #777777;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.6;
  }
`;
