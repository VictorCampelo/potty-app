import styled from 'styled-components'

export const Container = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 30px;
  background: var(--white);
  box-shadow: 0 0 8px rgba(54, 63, 78, 0.2);
  padding: 2rem 1.5rem;
  display: flex;
  gap: 15px;
  position: relative;
  img {
    width: 200px;
    height: 180px;
    border-radius: 15px;
    margin-right: 1.5rem;
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
