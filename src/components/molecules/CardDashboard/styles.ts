import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  max-height: 44vh;
  background: var(--white);
  box-shadow: 0px 0px 20px rgba(54, 63, 78, 0.2);
  border-radius: var(--border-radius-gg);
  padding: var(--spacing-xxxs);
`

export const Container = styled.div`
  height: 100%;
`

export const Title = styled.h2`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: var(--font-weight-light);
  font-size: var(--font-size-md);

  text-align: center;

  color: var(--gray-700);

  margin: var(--spacing-xxs) 0;
`

export const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
