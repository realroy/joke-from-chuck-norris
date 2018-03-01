import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

import FlexBox from './FlexBox'
import Button from './Button'

const zoom = keyframes`
  from {
    transform:scale(0);
  }
  to {
    transform:scale(1);
  }
`

export const ModalForm = styled.div`
	display: ${({ active }) => (active ? 'flex' : 'none')};
	width: 100%;
	height: 100%;
	flex-direction: column;
	position: fixed;
	z-index: 99;
	background-color: rgba(0, 0, 0, 0.7);
  padding: 0px;
`;
const ModalContent = styled.div`
	position: fixed;
	top: 2%;
	left: 25%;
  width: 50%;
  animation: ${zoom} .3s ease-out;
  @media (max-width: 425px) {
	  top: 2.5%;
    left: 5%;
    width: 90%;
  }
`;
const FullWidthFlex = FlexBox.extend`
  background: white;
	justify-content: flex-end;
	width: 100%;
`;
const Modal = ({ active, handleToggle, children }) => (
  <ModalForm active={active}>
    <ModalContent>
      <FullWidthFlex>
        <Button color="palevioletred" onClick={handleToggle}>
					&times;
        </Button>
      </FullWidthFlex>
      { children }
    </ModalContent>
  </ModalForm>
);

Modal.propTypes = {
  children: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default Modal;
