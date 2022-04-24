import styled from 'styled-components'
import sizes from '@/utils/sizes'

export const Container = styled.div`
  cursor: pointer;
  width: 330px;
  height: 450px;
  border-radius: 30px;
  background: var(--white);
  box-shadow: 0 0 8px rgba(54, 63, 78, 0.2);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  ${[sizes.down('lg')]} {
    width: 230px;
  }
  :hover {
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 240px;
    border-radius: 15px;
    background-size: cover;
    margin: 0 auto;
  }
  .title {
    text-align: left;
    width: 100%;
    margin: 0.5rem 0;
    span {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }
  .price {
    display: flex;
    flex-direction: column;
    width: 100%;
    span {
      font-size: 1.75rem;
      color: var(--color-secondary);
      font-weight: 600;
      margin-right: 0.5rem;
    }

    .discount {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: var(--spacing-nano) 0%;
      gap: var(--spacing-nano);

      small {
        margin-top: 0.5rem;
        font-weight: 600;
        text-decoration: line-through;
        color: var(--gray-200);
        font-size: 1rem;
      }

      span {
        font-size: 0.9rem;
        margin-top: 0.5rem;
        background: var(--color-primary);
        color: white;
        padding: 3px;
        border-radius: 5px;
      }
    }
  }
  .score {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--gray-600);
    margin-right: auto;

    img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }
  }
  p {
    width: 100%;
    color: var(--black-800);
    hyphens: auto;
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
  ${sizes.down('sm')} {
    width: auto;
    height: auto;
    border-radius: 10px;
    padding: 10px;
    img {
      width: 150px;
      height: 150px;
    }
    .title {
      font-size: 0.8rem !important;
    }
    span {
      font-size: 1.25rem !important;
    }
    p {
      display: none;
    }
    .score {
      img {
        width: 18px;
        height: 18px;
      }
      span {
        font-size: 0.6rem !important;
      }
    }
  }
`
