import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Button from './Button';
import FlexBox from './FlexBox';
import AdvanceSearch from './AdvanceSearch';

const zoom = keyframes`
  from {
    transform:scale(0);
  }
  to {
    transform:scale(1);
  }
`

export const Modal = styled.div`
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
const ModalForm = ({ active, handleToggle }) => (
  <Modal active={active}>
    <ModalContent>
      <FullWidthFlex>
        <Button color="palevioletred" onClick={handleToggle}>
					&times;
        </Button>
      </FullWidthFlex>
      <AdvanceSearch afterSubmit={handleToggle} />
    </ModalContent>
  </Modal>
);

ModalForm.propTypes = {
  active: PropTypes.bool.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default ModalForm;
