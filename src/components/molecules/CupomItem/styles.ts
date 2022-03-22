import styled from 'styled-components'

export const Container = styled.div`
width: 45%;
height: 68px;
display: flex;
position: relative;

button {
  width: 50px;
  height: 45%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 15px;

  background: #ffffff;
  border-radius: 8px;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 22px;

  &:first-child {
    margin-right: 16px;
  }

  :hover {
    background: #f4f5f6;
  }
}

.edit-btn {
  color: var(--gray-700);
}

.close-btn {
  color: #ff4d4b;
}

.buttons-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 64px;
  width: 80px;
  padding: 4px;
  background: white;
  border-radius: 8px;
  box-shadow: rgba(99, 99, 99, 0.15) 0px 0px 3px 0px;
  z-index: 0;
  margin-top: 2px;

  margin-left: -14px;
  padding-left: 20px;
}
`

export const CupomValue = styled.div`
height: 100%;
width: 160px;
border-radius: 8px;
background: var(--gray-700);
display: flex;
align-items: center;
justify-content: center;
color: white;
font-size: 1.25rem;
font-weight: bold;
padding: 0 0.5rem;
flex: 3;
`

export const CupomInfo = styled.div`
background: var(--yellow-600);
border-radius: 8px;
border: 2px solid var(--gray-700);
display: flex;
align-items: center;
justify-content: center;
padding: 0 0.5rem;
z-index: 1;
flex: 5;
`
