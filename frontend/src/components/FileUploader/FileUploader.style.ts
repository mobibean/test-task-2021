import styled from 'styled-components';

import { Colors } from 'theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 370px;
`;

export const IconWrapper = styled.div`
  width: 100%;
  max-width: 90px;
  margin-bottom: 50px;

  @media (max-width: 950px) {
    margin-bottom: 15px;
    max-width: 50px;
  }
`;

export const BrowseButton = styled.label`
  width: 100%;

  @media (max-width: 950px) {
    margin-top: 10px;
  }
`;

export const Span = styled.span`
  font-size: 48px;
  color: ${Colors.black[100]};
  margin-bottom: 10px;

  @media (max-width: 950px) {
    font-size: 28px;
    margin-bottom: 0;
  }
`;

export const Browse = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${Colors.white[100]};
  background-color: ${Colors.blue[100]};
  font-size: 40px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;

  @media (max-width: 950px) {
    font-size: 28px;
    padding: 5px;
  }
`;

export const FileInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;