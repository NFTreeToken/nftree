import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const Spinner = styled(CircularProgress).attrs({ color: 'secondary' })`
  display: block;
  margin-top: 20px;
`;

export default Spinner;
