import React, { Component } from 'react';
import './app.css';
import momentRandom from 'moment-random';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import devices from './devices.json';
import {
  Table, TableColumn, TableHeader, TableHeaderCell, TableRow, Title,
  Header, Fields, Footer, Input, Wrapper, Main, GenerateButton, GenerateInput,
  GenerateTitle, ChooseFile, GenerateWrapper, Form, Template,
} from './styles';

class App extends Component {
  state = {
    devices,
    startDate: '',
    amount: '',
    currentDevices: [],
    sortType: '',
    hasFile: false,
    name: '',
    contract: '',
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
        <TableColumn>{el.device}</TableColumn>
        <TableColumn>{el.date}</TableColumn>
        <TableColumn>{el.amount}</TableColumn>
        <TableColumn>{el.price}</TableColumn>
      </TableRow>
    })
  };

  handleGenerate = () => {
    let newDevices = this.state.devices;
    if (newDevices.length < +this.state.amount) {
      do {
        newDevices.push(...this.state.devices);
      } while (newDevices.length < +this.state.amount)
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
    const newArray = getRandom(newDevices, +this.state.amount)
    const extendedArray = newArray.map((el) => {
      return {
        price: el.price,
        amount: el.amount+ ' шт.',
        date: el.date,
        device: `${el.brand === '' ? el.model : el.name === '' ? el.brand + ' ' + el.model : el.brand + ' ' + el.name}`
      }
    });
    const a = Object.assign({}, extendedArray);
    this.setState({ currentDevices: Object.values(a) });
  };

  handleInputChange = (event) => {
    if (+event.target.value < 0 || isNaN(+event.target.value)) {
      this.setState({ amount: '' });
    } else {
      this.setState({ amount: event.target.value });
    }
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleContractChange = (event) => {
    this.setState({ contract: event.target.value })
  }

  componentDidUpdate(prevProps, prevState) {
    const { name, date, contract, table } = this.state;
    console.log(prevState.table === this.state.table)
    if (prevState.hasFile && (prevState.name !== name || prevState.date !== date || prevState.contract !== contract || prevState.table !== table)) {
      const data = {
        name: prevState.name,
        date: prevState.date,
        contract: prevState.contract,
        table: prevState.currentDevices,
      }

      axios.post('http://localhost:8080/update', { ...data } ).then((response) => { console.log(response) }).catch((error)=>console.log(error))
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('document', event.target.document.files[0]);
    data.append('name', event.target.name.value);
    data.append('date', this.state.startDate);
    data.append('contract', event.target.contract.value);
    data.append('table', JSON.stringify(this.state.currentDevices))
    axios.post('http://localhost:8080/form', data, {headers: { 'Content-Type': 'multipart/form-data' }}).then((response) => {
      console.log(response); // do something with the response
    });
    this.setState({ hasFile: true })
  }

  onSort = type => () => {
    const { sortType } = this.state;
    switch (type) {
      case 'name':
        if (sortType && sortType === 'name') {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => b.device.localeCompare(a.device)),
            sortType: '',
          }));
        } else {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => a.device.localeCompare(b.device)),
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
            currentDevices: prev.currentDevices.sort((a, b) => +b.amount.substring(0, b.amount.indexOf(' ')) - +a.amount.substring(0, a.amount.indexOf(' ')) ),
            sortType: '',
          }));
        } else {
          this.setState(prev => ({ 
            currentDevices: prev.currentDevices.sort((a, b) => +a.amount.substring(0, a.amount.indexOf(' '))-b.amount.substring(0, b.amount.indexOf(' '))
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
          <Form onSubmit={this.handleFormSubmit}>
          <Header>Климович Алексей Иванович, 4 курс, 4 группа, 2018</Header>
          <Fields>
            <Title>ФИО директора:</Title>
            <Input type="text" name="name" onChange={this.handleNameChange} value={this.state.name} />
            <Title>Номер постановления:</Title>
            <Input type="text" name="contract" onChange={this.handleContractChange} value={this.state.contract} />
            <Title>Дата:</Title>
            <DatePicker
              selected={this.state.startDate || null}
              onChange={this.handleChange}
              customInput={<Input type="text" name="date"/>}
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
              </TableHeader>
              {this.renderRows()}
            </tbody>
          </Table>
          <Footer>
            <Template>
              <GenerateTitle>Шаблон:</GenerateTitle>
              <ChooseFile type="file" accept=".dotx, .docx" name="document" />
              <GenerateButton type="submit">Создать документ</GenerateButton>
            </Template>
            <GenerateWrapper>
              <GenerateTitle>Число строк:</GenerateTitle>
              <GenerateInput value={this.state.amount} onChange={this.handleInputChange} type="text" />
              <GenerateButton onClick={this.handleGenerate} type='button'>Сгенерировать</GenerateButton>
            </GenerateWrapper>
          </Footer>
          </Form>
        </Main>
      </Wrapper>
    );
  }
}


export default App;
