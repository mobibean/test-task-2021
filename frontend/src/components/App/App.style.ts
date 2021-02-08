import styled from 'styled-components';
import { Colors } from 'theme';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 15px;
  background-color: rgb(46, 118, 221);
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 85vw;
  height: 85vh;
  border-radius: 25px;
  overflow: hidden;

  @media (max-width: 950px) {
    flex-direction: column;
    height: auto;
  }
`;

export const LeftSideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  width: 50%;
  height: 100%;
  background-color: #fff;

  @media (max-width: 950px) {
    width: 100%;
  }
`;

export const RightSideContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 40px;
  width: 50%;
  height: 100%;
  background-color: rgb(250, 250, 250);

  @media (max-width: 950px) {
    width: 100%;
  }
`;

export const FileListContainer = styled.div`
  overflow-y: scroll;
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 450px;
  padding-right: 50px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: ${Colors.gray[50]}; 
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${Colors.gray[100]}; 
  }

  @media (max-width: 950px) {
    max-width: 100%;
    overflow-y: auto;
    padding-right: 0;
  }
`;