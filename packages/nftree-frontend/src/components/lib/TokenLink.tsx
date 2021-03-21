import Link from '@material-ui/core/Link';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';

import { useTreeIdAt } from '../../hooks';

const propTypes = {
  ownerAddress: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const TokenLink = ({ ownerAddress, index }: InferProps<typeof propTypes>) => {
  const tokenId = useTreeIdAt(ownerAddress, index);
  return <Link href={`/nftree/${tokenId}`}>{tokenId}</Link>;
};

TokenLink.propTypes = propTypes;

export default TokenLink;
