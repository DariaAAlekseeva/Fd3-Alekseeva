import React from "react";

class Filter extends React.Component {

  state = {
    isSorted: false,
    filter: '',
    words: this.props.initWords,
  }


  filterChanged = (eo) => {
    this.setState({ filter: eo.target.value}, this.updateWords);

  };

  sortChanged = (eo) => {
    this.setState({ isSorted: eo.target.checked}, this.updateWords);
  };

  updateWords = ()=>{
    let words = [...this.props.initWords];
    if (this.state.isSorted)
      words.sort();
    if (this.state.filter)
      words = words.filter(s => s.includes(this.state.filter));
    this.setState({words}); 
   }

   reset = () =>{
    this.setState({isSorted:false, filter:''}, this.updateWords);
   };


  render() {
   
    return ( 
      <div>
        <input type='checkbox' checked={this.state.isSorted} onChange={this.sortChanged} />
        <input type='text' value={this.state.filter} onChange={this.filterChanged} />
        <input type = 'button' value = 'сброс' onClick={this.reset}/>
        <div style={{ whiteSpace: 'pre' }}>
        {this.state.words.join("\n")}
        </div>
      </div>

    )
  }
}



export default Filter;