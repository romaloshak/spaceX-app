
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Calendar from './components/calendar/Calendar';
import Details from './components/details/Details';
import Features from './components/features/Features';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Home from './components/home/Home';
import FetchData from './service/FetchData';
import './style.css'

class App extends React.Component {

  fetchData = new FetchData()

  state = {
    rocket: 'Falcon 1',
    rocketFeatures: null,
    rockets: [],
    company: null,
  }

  componentDidMount() {
    this.updateRocket()
    this.updateCompany()
  }

  updateRocket() {
    this.fetchData.getRocked()
      .then(data => {
        this.setState({ rockets: data.map(item => item.name) })
        return data
      })
      .then(data => data.find(item => item.name === this.state.rocket))
      .then(rocketFeatures => {
        this.setState({ rocketFeatures })
      })
  }

  updateCompany() {
    this.fetchData.getCompany()
      .then(company => this.setState({ company }))
  }

  changeRocket = rocket => {
    this.setState({
      rocket
    }, this.updateRocket)
  }

  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />

        <Route exact path='/' render={() => this.state.company && <Home company={this.state.company} />} />

        <Route
          path='/rocket'
          render={() => this.state.rocketFeatures &&
            <Features {... this.state.rocketFeatures} />} />

        <Route path='/calendar' component={Calendar} />

        <Route path='/details/:id' component={Details} />

        {this.state.company && <Footer {...this.state.company.links} />}
      </BrowserRouter>
    )
  }
}

export default App;