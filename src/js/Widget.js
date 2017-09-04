import React from 'react';
import axios from 'axios';

class Widget extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataJSON: []
    }
  }

  componentDidMount() {
    axios.get(this.props.dataURL)
      .then(response => {
        this.setState({
          dataJSON: response.data
        });
      })
    this.showCounter();
  }

  showCounter() {
    setTimeout(function(){
      $('.animate-number').each(function () {
        $(this).prop('Counter',0).animate({
          Counter: $(this).text()
        },{
            duration: 2000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
        });
      }); 
    },1000)
  }

  render() {
    let start_date, end_date;
    let data = this.state.dataJSON,
      number_of_incidents = this.state.dataJSON.length,
      number_of_digits = number_of_incidents.toString().length;

    if (data.length === 0) {
      start_date = '';
      end_date = '';
    } else {
      let start_new_date = data[0].date.split("-"),
        start_month = new Date(data[0].date).toLocaleDateString('en-US', {month: 'short'}),
        end_new_date = data[data.length -1].date.split("-"),
        end_month = new Date(data[data.length -1].date).toLocaleDateString('en-US', {month: 'short'});
      start_date = start_new_date[2]+ " " +start_month + " '"+ start_new_date[0].slice(-2);
      end_date = end_new_date[2]+ " " +end_month + " '"+ end_new_date[0].slice(-2)
    }

    return(
      <div className="banner-div">
        <a className="data-url" target="_blank" href="http://protograph.indianexpress.com/mobbed/index.html">
          <div className="counter-area">
            <div className="number-background">
              <div className="single-background"></div>
              <div className="single-background"></div>
              <div className="single-background"></div>
            </div>
            <div className="display-counter">
              {number_of_digits !== 3 ? <span className="light-text">0</span>:'' }
              {number_of_digits === 1 ? <span className="light-text">0</span>:'' }
              <span className="animate-number">{number_of_incidents}</span>
            </div>
          </div>
          <div className="display-summary">Instances of lynching were reported <br/>
            {start_date === '' || end_date === '' ? '' : `from ${start_date} to ${end_date}` }
          </div>
        </a>
      </div>
    )
  }
}

export default Widget;