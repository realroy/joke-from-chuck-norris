import styled from 'styled-components'

const fDirection = ({ direction = 'row' }) => (direction)
const fWrap = ({ wrap = 'nowrap' }) => wrap
const fJustify = ({ justify = 'flex-start' }) => justify
const fAlignItems = ({ alignItems = 'stretch' }) => alignItems
const fAlignContent = ({ alignContent = 'stretch' }) => alignContent

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${fDirection};
  flex-wrap: ${fWrap};
  justify-content: ${fJustify};
  align-items: ${fAlignItems};
  align-contents: ${fAlignContent};
`
export default FlexBox
