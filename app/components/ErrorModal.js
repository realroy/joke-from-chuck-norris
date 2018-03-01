import styled from 'styled-components'
import PropTypes from 'prop-types'

import Divider from './Divider'
import Modal from './Modal'

const Content = styled.div`
  padding: 16px;
  background: white;
  color: red;
  text-align: center;
`

const ErrorTitle = styled.h1`
  font-size: 4rem;
  font-weight: 900;
`

const ErrorModal = ({ active, handleToggle, error = '' }) => (
  <Modal active={active} handleToggle={handleToggle}>
    <Content>
      <ErrorTitle>ERROR!</ErrorTitle>
      <Divider color="red" />
      <p>{error}</p>
    </Content>
  </Modal>
)

ErrorModal.propTypes = {
  active: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
}

export default ErrorModal
