import React from 'react'
interface ICardProductSearchProps {
  storeName: string
  stars: number
  price: number
  description: string
  imgUrl: string
}

export const CardProductSearch = ({
  description,
  price,
  stars,
  storeName,
  imgUrl
}: ICardProductSearchProps) => {
  return (
    <Container>
      <img
        src={imgUrl || '/images/emptyProducts.svg'}
        alt="img-produto"
        className="img-product"
      />
      <div className="wrap-info-card">
        <h3>{description}</h3>
        <div className="wrap-footer">
          <p className="price">R$ {price}</p>
          <div className="wrap-star">
            <img src="/images/Star.svg" alt="estrela" />
            <p>4,5 ({stars} avaliações)</p>
          </div>
          <a href="">{storeName}</a>
        </div>
      </div>
    </Container>
  )
}

import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1035px;
  padding: 24px;
  margin: 25px 0;

  height: 250px;
  background-color: var(--white);
  border-radius: 30px;

  display: grid;
  grid-template-columns: 3fr 9fr;

  .img-product {
    width: 200px;
    height: 200px;
  }

  .wrap-info-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-wrap: wrap;

    h3 {
      font-size: 24px;
      font-weight: 500;
    }

    .price {
      color: var(--color-secondary-darker);
      font-size: 32px;
      font-weight: 600;
    }

    .wrap-star {
      p {
        font-size: 24px;
        font-weight: 400;
      }
    }

    div {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
        color: #ffc658;
      }
    }
  }

  .wrap-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`
