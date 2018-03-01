import styled from 'styled-components'

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px 0 16px 0;
  background: ${({ color }) => color || 'white'};
`
export default Footer
