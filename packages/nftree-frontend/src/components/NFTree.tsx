import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';

const NFTree = () => {
  const { tokenId }: { tokenId: string } = useParams();
  return <Typography>{`NFTree id: ${tokenId}`}</Typography>;
};

export default NFTree;
