import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      products: ""
    }
  }
  componentDidMount(){
    axios.get("http://localhost:8000/api/products").then(res => {
      // console.log(res);
      this.setState({
        products: res.data
      });
    }).catch();
  }

  render(){
    return (
      <div>
        {this.state.products && this.state.products.map(element => {
          return (
            <div key={element.id}>
              <h2>{element.productName}</h2>
              <p>{element.unitPrice}</p>
            </div>
          );
        }) }
      </div>
    );
  }

}

export default App;
