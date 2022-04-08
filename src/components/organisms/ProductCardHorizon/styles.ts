import styled from 'styled-components'

export const Container = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 30px;
  background: var(--white);
  box-shadow: 0 0 8px rgba(54, 63, 78, 0.2);
  padding: 2rem 1.5rem;
  display: flex;
  img {
    width: 200px;
    height: 180px;
  }
  .title {
    font-size: 1.125rem;
    margin: 0.5rem 0;
    font-weight: 600;
  }
  .price {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      font-size: 1.75rem;
      color: var(--color-secondary);
      font-weight: 600;
      margin-right: 0.5rem;
    }

    small {
      margin-top: 10px;
      font-weight: 600;
      text-decoration: line-through;
      color: var(--gray-200);
      padding-bottom: 0.25rem;
    }
  }
  .score {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: var(--gray-600);

    img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }
  }
  p {
    width: 100%;
    text-align: justify;
    color: var(--black-800);
    margin-top: 0.5rem;
    font-size: 0.875rem;
  }
`
