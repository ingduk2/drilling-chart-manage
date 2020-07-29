import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtil';
import { Link, Route } from 'react-router-dom';
// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
  position: absolute;
  // margin-top: 100px;
  top: 40%;
  left: 40%;
  transform: translate(-40%, -40%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
  width: 120%;
  ${shadow(2)}
`;

// 로고
const LogoWrapper = styled.div`
  background: ${oc.teal[3]};
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(Link)`
  color: white;
  font-family: 'Rajdhani';
  font-size: 2.4rem;
  letter-spacing: 5px;
  text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
  background: white;
  padding: 1rem;
  height: auto;
`;

type wrapperParam = {
  children: React.ReactNode;
};

function AuthWrapper({ children }: wrapperParam) {
  console.log('AuthWrapper', children);
  return (
    <Positioner>
      <ShadowedBox>
        <LogoWrapper>
          <Logo to="/">G.D</Logo>
        </LogoWrapper>
        <Contents>{children}</Contents>
      </ShadowedBox>
    </Positioner>
  );
}

export default AuthWrapper;
