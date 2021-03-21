import Chip from '@material-ui/core/Chip';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { useTreeIdAt } from '../../hooks';

const SpacedChip = styled(Chip)`
  margin: 0 5px 5px 0;
`;

const propTypes = {
  ownerAddress: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const TokenLink = ({ ownerAddress, index }: InferProps<typeof propTypes>) => {
  const history = useHistory();
  const tokenId = useTreeIdAt(ownerAddress, index);
  return <SpacedChip label={tokenId} onClick={() => history.push(`/nftree/${tokenId}`)} />;
};

TokenLink.propTypes = propTypes;

export default TokenLink;
