import styled from 'styled-components';

import { Colors } from 'theme';

export const FileItemWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const FileExtension = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${Colors.blue[100]};
  background-color: ${Colors.blue[30]};
  width: 50px;
  min-width: 50px;
  height: 50px;
  overflow: hidden;
  color: ${Colors.blue[100]};
  border-radius: 50%;
  text-transform: uppercase;
  font-size: 19px;
  margin-right: 20px;

  @media (max-width: 500px) {
    display: none;
  }
`;

export const FileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;

export const FileName = styled.span`
  margin-bottom: 5px;
  font-size: 19px;
  cursor: pointer;
`;

export const FileSize = styled.span`
  font-size: 12px;
  color: ${Colors.gray[100]};
`;

export const IconWrapper = styled.div`
  width: 15px;
  min-width: 15px;
  cursor: pointer;
  margin-left: 5px;
`;