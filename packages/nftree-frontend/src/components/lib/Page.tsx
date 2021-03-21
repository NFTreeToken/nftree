import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const propTypes = {
  children: PropTypes.node.isRequired,
};

const PaddedContainer = styled(Container)`
  padding-top: 50px;
`;

const Page = ({ children }: InferProps<typeof propTypes>) => (
  <PaddedContainer>
    <Grid container>
      {children}
    </Grid>
  </PaddedContainer>
);

Page.propTypes = propTypes;

export default Page;
