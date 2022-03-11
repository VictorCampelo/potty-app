import styled from 'styled-components';
import sizes from '@/utils/sizes';

export const Banner = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  background-color: white;

  img {
    max-width: 546px;
    filter: drop-shadow(0px 0px 20px rgba(54, 63, 78, 0.2));
    border-radius: 0px 0px 57px 0px;
  }

  ${[sizes.down('md')]} {
    img {
      display: none;
    }
  }

  .texts {
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-sm);

    padding: var(--spacing-xs);

    button {
      width: 65%;
      height: 50px;
      font-size: var(--font-size-xs);
    }
  }
`;
