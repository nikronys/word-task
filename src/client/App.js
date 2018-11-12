import React, { Component } from 'react';
import './app.css';
import momentRandom from 'moment-random';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import devices from './devices.json';
import {
  Table, TableColumn, TableHeader, TableHeaderCell, TableRow, Title,
  Header, Fields, Footer, Input, Wrapper, Main, GenerateButton, GenerateInput,
  GenerateTitle, ChooseFile, GenerateWrapper, Form,
} from './styles';

class App extends Component {
  state = {
    devices,
    startDate: '',
    amount: '',
    currentDevices: [],
    sortType: '',
  }

  componentDidMount() {
    this.setState(prev => ({ 
      devices: prev.devices.map((el) => {
        return {
          ...el,
          date: momentRandom('2018-05-30', '2005-01-11').format('L').toString().replace(/\//g, '.'),
          amount: Math.ceil(Math.random() * 10),
          price: parseInt(Math.round(400 + Math.random() * (1100-400))).toFixed(2).toString().replace('.', ',')
        };
      })
    }));
  }

  renderRows = () => {
    return this.state.currentDevices.map((el, i) => {
      return <TableRow key={i}>
        <TableColumn>{el.brand === '' ? el.model : el.name === '' ? el.brand + ' ' + el.model : el.brand + ' ' + el.name}</TableColumn>
        <TableColumn>{el.date}</TableColumn>
        <TableColumn>{`${el.amount} шт.`}</TableColumn>
        <TableColumn>{el.price}</TableColumn>
        <TableColumn></TableColumn>
      </TableRow>
    })
  };

  handleSubmit = () => {
    let newDevices = this.state.devices;
    if (newDevices.length < this.state.amount) {
      do {
        newDevices.push(...this.state.devices);
      } while (newDevices.length < this.state.amount)
    }
    function getRandom(arr, n) {
      let result = new Array(n),
          len = arr.length,
          taken = new Array(len);
      if (n > len)
          throw new RangeError("getRandom: more elements taken than available");
      while (n--) {
          var x = Math.floor(Math.random() * len);
          result[n] = arr[x in taken ? taken[x] : x];
          taken[x] = --len in taken ? taken[len] : len;
      }
      return result;
    }
    const newArray = getRandom(newDevices, this.state.amount);
    this.setState({ currentDevices: newArray });
  };

  handleInputChange = (event) => {
    this.setState({ amount: event.target.value });
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  onSort = (type) => () => {
    const { sortType } = this.state;
    switch (type) {
      case 'name':
        if (sortType && sortType === 'name') {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => b.brand.localeCompare(a.brand)),
            sortType: '',
          }));
        } else {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => a.brand.localeCompare(b.brand)),
            sortType: 'name',
          }));
        }
        break;
      case 'date':
        if (sortType && sortType === 'date') {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => moment(b.date, "MM DD YYYY") - moment(a.date, "MM DD YYYY") ),
            sortType: '',
          }));
        } else {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => moment(a.date, "MM DD YYYY") - moment(b.date, "MM DD YYYY")),
            sortType: 'date',
          }));
        }
        break;
      case 'amount':
        if (sortType && sortType === 'amount') {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => b.amount - a.amount ),
            sortType: '',
          }));
        } else {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => a.amount - b.amount
            ),
            sortType: 'amount',
          }
          ));
        }
        break;
      case 'price':
      if (sortType && sortType === 'price') {
        this.setState(prev => ({ 
          currentDevices: prev.currentDevices.sort((a, b) => b.price.slice(0, b.price.indexOf(',')) - a.price.slice(0, a.price.indexOf(',')) ),
          sortType: '',
        }));
      } else {
        this.setState(prev => ({ 
          currentDevices: prev.currentDevices.sort((a, b) => a.price.slice(0, a.price.indexOf(',')) - b.price.slice(0, b.price.indexOf(',')) ),
          sortType: 'price',
        }));
      }
        break;
      default:
        break;
    }
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
              selected={this.state.startDate || null}
              onChange={this.handleChange}
              customInput={<Input />}
              placeholderText="Выберите дату"
            />
          </Fields>
          <Table>
            <tbody>
              <TableHeader>
                <TableHeaderCell onClick={this.onSort('name')}>Наименование</TableHeaderCell>
                <TableHeaderCell onClick={this.onSort('date')}>Дата выхода на рынок</TableHeaderCell>
                <TableHeaderCell onClick={this.onSort('amount')}>Количество</TableHeaderCell>
                <TableHeaderCell onClick={this.onSort('price')}>Сумма за 1 ед.</TableHeaderCell>
                <TableHeaderCell></TableHeaderCell>
              </TableHeader>
              {this.renderRows()}
            </tbody>
          </Table>
          <Footer>
            <Form>
              <GenerateTitle>Шаблон:</GenerateTitle>
              <ChooseFile type="file" accept=".dotx, .docx" />
              <GenerateButton onClick={this.handleFormSubmit} type="submit">Отправить</GenerateButton>
            </Form>
            <GenerateWrapper>
              <GenerateTitle>Число строк:</GenerateTitle>
              <GenerateInput value={this.state.amount} onChange={this.handleInputChange} type="text" />
              <GenerateButton onClick={this.handleSubmit} type="submit">Сгенерировать</GenerateButton>
            </GenerateWrapper>
          </Footer>
        </Main>
      </Wrapper>
    );
  }
}


export default App;
