import styled from 'styled-components';

export const Page = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
export const PageTitle = styled.h1`
  border: 6px solid white;
  padding: 8px;
  margin: 8px;
  font-size: 1em;
  align-self: center;
  @media (min-width: 768px) {
    font-size: 2em;
  }
`;

export default Page;
