import styled from 'styled-components'

export const Finish = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 250px;
    margin-bottom: 40px;
  }

  h1,
  p {
    margin-bottom: 1rem;
  }

  span {
    margin-top: 1rem;
    color: var(--gray-700);
    font-size: 0.865rem;
  }

  a {
    color: var(--color-secondary);
  }
`

export const Container = styled.main`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 4rem;
`

export const Content = styled.section`
  max-width: 1420px;
  height: 100%;
  width: 100%;
  padding-top: 3rem;
`
