import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .imageContainer {
    width: 132px;
    height: 132px;

    display: flex;
    align-items: center;
    justify-content: center;

    color: var(--white);
    background-color: var(--color-primary);

    border: 4px solid #ffffff;

    border-radius: 100%;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;

      border-radius: 100%;
    }
  }

  .imageBtn {
    position: relative;
    left: 30px;
    bottom: 25px;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 41px;
    height: 41px;

    background-color: var(--color-primary);

    border-radius: 100%;
    border: 4px solid var(--white);

    label {
      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;
    }
  }
`
