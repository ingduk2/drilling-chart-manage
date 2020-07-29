import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Aligner = styled.div`
  margin-top: 1rem;
  text-align: right;
`;

const StyledLink = styled(Link)`
  color: ${oc.gray[6]};
  &:hover {
    color: ${oc.gray[7]};
  }
`;

export type parameter = {
  to: string;
  children: React.ReactNode;
  onClick?: any;
};

const RightAlignedLink = ({ to, children }: parameter) => (
  <Aligner>
    <StyledLink to={to}>{children}</StyledLink>
  </Aligner>
);

export default RightAlignedLink;
