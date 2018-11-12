import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;
export const Main = styled.main`
  border-radius: 10px;
  min-width: 1000px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 30px;
`;
export const Header = styled.header`
  width: 100%;
  height: 50px;
  font-size: 20px;
`;
export const Fields = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {margin-top: 12px;};
`;
export const Input = styled.input`
  padding: 2px;
  margin: 10px;
  outline: none;
  margin: auto;
  font-size: 15px;
  &:last-child {
    margin-bottom: 11px;
    height: 21px;
    border: 1px solid #a9a9a9;
  }
`;
export const Title = styled.h3`
  margin: auto;
`;
export const Table = styled.table`
  margin-top: 40px;
  border: 1px solid black;
  cellpadding: 0;
  border-spacing: 0;
`;
export const TableHeader = styled.tr`
  background-color: lightgray;
`;
export const TableHeaderCell = styled.th`
  font-size: 18px;
  border-right: 1px solid black;
  padding: 8px 10px;
  &:first-child {
    width: 30%;
    text-align: left;
  }
  &:nth-child(2) {
    width: 22%;
    text-align: center;
  }
  &:nth-child(3) {
    width: 15%;
    text-align: right;
  }
  &:nth-child(4) {
    width: 15%;
    text-align: right;
  }
  &:last-child {
    border-right: 0;
    width: 18%;
  }
`;
export const TableRow = styled.tr`

`;
export const TableColumn = styled.td`
  font-size: 16px;
  border-right: 1px solid black;
  border-top: 1px solid black;
  padding: 8px 10px;
  &:first-child {
    width: 30%;
    text-align: left;
    background-color: lightgray;
  }
  &:nth-child(2) {
    width: 22%;
    text-align: center;
  }
  &:nth-child(3) {
    width: 15%;
    text-align: right;
    font-style: italic;
  }
  &:nth-child(4) {
    width: 15%;
    text-align: right;
    font-weight: bold;
  }
  &:last-child {
    border-right: 0;
    width: 18%;
  }
`;
export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;
export const GenerateTitle = styled.h3`
  padding: 0;
  margin: 0;
`;
export const GenerateInput = styled.input`
  margin: 0 20px;
  width: 50px;
  font-size: 15px;
`;
export const GenerateButton = styled.button`
  border-radius: 5px;
  background: none;
  border: 1px solid black;
  outline: none;
`;

export const ChooseFile = styled.input`
  margin: 0 20px;
  max-width: 180px;
`;

export const GenerateWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
`;