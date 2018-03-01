import styled from 'styled-components'

const sharedAttributes = color => `
  padding: 8px 16px 8px 16px;
  border: 1px solid ${color};
  transition: ease-out .5s;
`

const outlinedBtn = color => `
  background: white;
  color: ${color};
  ${sharedAttributes(color)}
  &:hover {
    background: ${color};
    color: white;
  }
`
const defaultBtn = color => `
  background: ${color};
  color: white;
  ${sharedAttributes(color)}
  &:hover {
    background: white;
    color: ${color};
  }
`

const Button = styled.button`
  ${({ outlined, color }) => (outlined ? outlinedBtn(color) : defaultBtn(color))};
`

export default Button
