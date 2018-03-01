import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import withRedux from 'next-redux-wrapper';
import { compose, lifecycle } from 'recompose';

import makeStore from '../store';
import {
  getCategoryStatistics,
  getDatesStatistics,
  getDayStatistics,
  getIdStatistics,
  getNameStatistics,
  getNumStatistics,
} from '../store/reducers/statistics';
import { Page, PageTitle } from '../components/Page';
import FlexBox from '../components/FlexBox';
import Button from '../components/Button';

export const RankingCard = styled.div`
	flex-basis: 25%;
	margin-bottom: 5%;
	height: 400px;
	width: 200px;
	background: palevioletred;
	border: 1px solid white;
	padding: 32px;
	box-shadow: 20px 20px #70dbb8;
	transition: ease-out 0.5s;
	&:hover {
		border: 8px solid white;
		background: #70dbb8;
		color: palevioletred;
		box-shadow: 20px 20px palevioletred;
	}
`;

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => getCategoryStatistics(dispatch),
  fetchDates: () => getDatesStatistics(dispatch),
  fetchDays: () => getDayStatistics(dispatch),
  fetchIds: () => getIdStatistics(dispatch),
  fetchNames: () => getNameStatistics(dispatch),
  fetchNums: () => getNumStatistics(dispatch),
});

const enhance = compose(
  withRedux(makeStore, ({ statistics }) => statistics, mapDispatchToProps),
  lifecycle({
    async componentWillMount() {
      const {
        fetchCategories,
        fetchDates,
        fetchDays,
        fetchIds,
        fetchNames,
        fetchNums,
      } = this.props;
      await fetchCategories();
      await fetchDates();
      await fetchDays();
      await fetchIds();
      await fetchNames();
      await fetchNums();
    },
  }),
);

export default enhance(props => (
  <Page>
    <Head>
      <title>Joke Statistic</title>
    </Head>
    <FlexBox justify="space-around" alignItems="center">
      <Link href="/" prefetch>
        <Button color="#70DBB8">BACK</Button>
      </Link>
      <PageTitle>Joke Statistic</PageTitle>
      <div />
    </FlexBox>
    <FlexBox wrap="wrap" justify="space-around" alignItems="center">
      {Object.keys(props.resources).map(key => (
        <RankingCard key={key}>
          <h1>{props.resources[key]}</h1>
          <ol>
            {props.isFetching[key]
							? 'Now loading...'
							: props[key].map(each => <li key={each}>{each}</li>)}
          </ol>
        </RankingCard>
			))}
    </FlexBox>
  </Page>
));
