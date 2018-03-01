import styled from 'styled-components'

const createBorderTop = ({ size, border, color }) => (`
  border-top: ${size || 2}px ${border || 'solid'} ${color || 'black'};
`)

const Divider = styled.div`
  ${props => createBorderTop(props)}
  margin: 16px 0 16px 0;
`
export default Divider
