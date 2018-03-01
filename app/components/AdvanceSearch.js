import { compose, withState, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateOptions, getJokes } from '../store/reducers/jokes';
import Divider from './Divider';
import {
  Form,
  Title,
  GroupTitle,
  Group,
  SubGroup,
  Label,
  Input,
  ChoiceSubGroup,
  InputSubmit,
  Select,
} from './Form';


const mapDispatchToProps = dispatch => ({
  dispatchJokes: options => getJokes(dispatch, options),
  dispatchChange: (event) => {
    const { id, value = '' } = event.target;
    const cleanedValue = Number(value) || value.trim();
    let options = { [id]: cleanedValue };
    if (id === 'id') options = { [id]: cleanedValue, num: 0, category: 'all' };
    else if (id === 'num') options = { [id]: cleanedValue, id: 0 };
    dispatch(updateOptions(options));
  },
});

const enhance = compose(
  connect(({ jokes }) => jokes, mapDispatchToProps),
  withState('isMultiple', 'setIsMultiple', true),
  withHandlers({
    handleSubmit: props => (event) => {
      event.preventDefault();
      const {
        options, dispatchJokes, afterSubmit, categories,
      } = props;
      dispatchJokes(options, categories);
      afterSubmit();
    },
    handleSelectMultipleOrSingle: props => (event) => {
      const { id } = event.target;
      const { setIsMultiple, dispatchChange } = props;
      if (id === 'num') setIsMultiple(() => true);
      else if (id === 'id') setIsMultiple(() => false);
      dispatchChange(event);
    },
  }),
);
/* eslint-disable no-shadow */
const AdvanceSearch = ({
  handleSubmit,
  options,
  dispatchChange,
  isMultiple,
  handleSelectMultipleOrSingle,
  maxJokes,
  categories,
}) => (
  <Form onSubmit={handleSubmit}>
    <div>
      <Title>Advance Options</Title>
      <GroupTitle>Insert your prefer name to the joke</GroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <Group>
        <SubGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            value={options.firstName}
            onChange={dispatchChange}
            placeholder="Specify first name"
          />
        </SubGroup>
        <SubGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            value={options.lastName}
            onChange={dispatchChange}
            placeholder="Specify last name"
          />
        </SubGroup>
      </Group>
      <GroupTitle>Want multiple jokes or specific joke ID ?</GroupTitle>
      <Divider color="#AF5A76" border="dotted" />
      <Group>
        <ChoiceSubGroup active={isMultiple} onClick={handleSelectMultipleOrSingle}>
          <Label htmlFor="num">Number of random jokes</Label>
          <Input
            disable={!isMultiple}
            type="number"
            id="num"
            value={options.num}
            onChange={dispatchChange}
            min={0}
            max={maxJokes}
            placeholder="Specify number of jokes"
          />
          <Label htmlFor="categories">Categories</Label>
          <Select name="category" id="category" onChange={dispatchChange} value={options.category}>
            {categories.map(c => (
              <option key={c} value={c}>
                {c[0].toUpperCase() + c.substring(1)}
              </option>
						))}
          </Select>
        </ChoiceSubGroup>
        <ChoiceSubGroup active={!isMultiple} onClick={handleSelectMultipleOrSingle}>
          <Label htmlFor="id">Get joke with id</Label>
          <Input
            disabled={isMultiple}
            type="number"
            id="id"
            min={0}
            max={maxJokes}
            onChange={dispatchChange}
            value={options.id}
            placeholder="Specify id of joke"
          />
        </ChoiceSubGroup>
      </Group>
      <Divider color="#AF5A76" border="dotted" />
      <Group borderSize="0" direction="column" justify="center">
        <InputSubmit color="palevioletred" type="submit" value="Confirm!" />
      </Group>
    </div>
  </Form>
);

AdvanceSearch.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  options: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    num: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  dispatchChange: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  handleSelectMultipleOrSingle: PropTypes.func.isRequired,
  maxJokes: PropTypes.number.isRequired,
};

export default enhance(AdvanceSearch);
