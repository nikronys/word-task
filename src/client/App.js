import React, { Component } from 'react';
import './app.css';
import DatePicker from "react-datepicker";
import styled from 'styled-components';
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.main`
  border-radius: 10px;
  min-width: 1000px;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 30px;
`;
const Header= styled.header`
  width: 100%;
  height: 50px;
  font-size: 20px;
`;
const Fields= styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  & > * {margin-top: 12px;};
`;
const Input= styled.input`
  padding: 2px;
  margin: 10px;
  outline: none;
  margin: auto;
  font-size: 15px;
  &:last-child {
    margin-bottom: 11px;
    height: 19px;
    border: 1px solid #a9a9a9;
  }
`;
const Title= styled.h3`
  margin: auto;
`;
const Table= styled.table`
  margin-top: 40px;
  border: 1px solid black;
  cellpadding: 0;
  border-spacing: 0;
`;
const TableHeader=styled.tr`
  background-color: lightgray;
`;
const TableHeaderCell=styled.th`
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
const TableRow=styled.tr`

`;
const TableColumn=styled.td`
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
const Footer= styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;
const GenerateTitle=styled.h3`
  padding: 0;
  margin: 0;
`;
const GenerateInput= styled.input`
  margin: 0 20px;
  width: 50px;
  font-size: 15px;
`;
const GenerateButton= styled.button`
  border-radius: 10px;
  background: none;
  border: 1px solid black;
  outline: none;
`;
class App extends Component {
  state = {
    devices: [
      {
        name: 'Samsung',
        date: '24.03.1231',
        amount: '10',
        price: '11111'
      }
    ],
    startDate: moment(),
    amount: 0,
    inputValue: '',
    value: 0,
  }
  renderRows = () => {
    return this.state.devices.map((el, i) => {
      return <TableRow key={i}>
        <TableColumn>{el.name}</TableColumn>
        <TableColumn>{el.date}</TableColumn>
        <TableColumn>{el.amount + ' шт.'}</TableColumn>
        <TableColumn>{parseInt(el.price).toFixed(2).toString().replace('.', ',')}</TableColumn>
        <TableColumn></TableColumn>
      </TableRow>
    })
  }
  handleSubmit = () => {
    this.setState(prev => ({ value: prev.inputValue }));
  }
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
  }
  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  }
  render() {
    return (
      <Wrapper>
        <Main>
          <Header>Климович Алексей Иванович, 4 курс, 4 группа, 2018</Header>
          <Fields>
            <Title>ФИО директора:</Title>
            <Input />
            <Title>Номер постановления:</Title>
            <Input />
            <Title>Дата:</Title>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              customInput={<Input />}
            />
          </Fields>
          <Table>
            <tbody>
              <TableHeader>
                <TableHeaderCell>Наименование</TableHeaderCell>
                <TableHeaderCell>Дата выхода на рынок</TableHeaderCell>
                <TableHeaderCell>Количество</TableHeaderCell>
                <TableHeaderCell>Сумма за 1 ед.</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableHeader>
              {this.renderRows(this.state.amount)}
            </tbody>
          </Table>
          <Footer>
            <GenerateTitle>Число строк:</GenerateTitle>
              <GenerateInput value={this.state.inputValue} onChange={this.handleChange} type='text'/>
              <GenerateButton onClick={this.handleSubmit} type='submit'>Сгенерировать</GenerateButton>
          </Footer>
        </Main>
      </Wrapper>
    );
  }
}


export default App;