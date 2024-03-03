import styled from 'styled-components'

export const Container = styled.div`
  background-color: var(--white);
  width: 484px;
  height: 192px;
  border-radius: 30px;
  box-shadow: 0 0 20px 0 rgba(54, 63, 78, 0.2);
  display: grid;
  padding: 27px 24px;
  grid-template-columns: 3fr 8fr 1fr;

  .img-profile {
    width: 138px;
    height: 138px;
    border-radius: 50%;
  }

  .wrap-texts {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 150%;
      line-height: 54px;
      text-transform: uppercase;
      text-align: justify;
      font-weight: 700;
    }
  }

  .wrap-starts {
    display: flex;
    justify-content: space-between;
    span {
      margin-left: 10px;
    }
  }
`
