import React from 'react';
import ReactDOM from 'react-dom';
import CreateSessionModal from './addSessionModal';

class LandingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      currentUserId: null
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    const response = $.ajax({
      type: 'GET',
      url: `/users/checkForUser`
    })

    if(response.id){
      this.setState({
        currentUserId: response.id
      })
    } else {
      this.setState({
        currentUserId: null
      })
    }
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
      	<h1>Thumper</h1>
        <button onClick={this.openModal}>Open Modal</button>
        <CreateSessionModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          userId={this.state.currentUserId}
        />
      </div>
    );
  }
}
export default LandingPage