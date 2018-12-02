import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Form, Text, Field, Select, Option, TextArea } from 'informed';
import DatePicker from 'react-datepicker'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#thumper-app')

class CreateSessionModal extends React.Component {
	constructor() {
		super();

		this.handleDateTimeChange = this.handleDateTimeChange.bind(this);
		this.handleDurationChange = this.handleDurationChange.bind(this);
		this.handlePpmChange = this.handlePpmChange.bind(this);
		this.handleRatingChange = this.handleRatingChange.bind(this);
		this.handleNotesChange = this.handleNotesChange.bind(this);
		this.handleNicknameChange = this.handleNicknameChange.bind(this);
		this.handlePartnerNameChange = this.handlePartnerNameChange.bind(this);
		this.handleSubmitClick = this.handleSubmitClick.bind(this);
	}

	handleDateTimeChange(e) {
		this.setState({ dateTime: e.target.value })
	}

	handleDurationChange(e) {
		this.setState({ duration: e.target.value })
	}

	handleNicknameChange(e) {
		this.setState({ nickname: e.target.value })
	}

	handlePpmChange(e) {
		this.setState({ ppm: e.target.value })
	}

	handlePartnerNameChange(e) {
		this.setState({ partnerName: e.target.value })
	}

	handleRatingChange(e) {
		this.setState({ rating: e.target.value })
	}

	handleNotesChange(e) {
		this.setState({ notes: e.target.value })
	}

	handleSubmitClick() {
		$.ajax({
      type: 'POST',
      url: `/users/${this.props.userId}/createThumpSession`,
      data: {
        dateTime: this.state.dateTime,
        duration: this.state.duration,
        ppm: this.state.ppm,
        rating: this.state.rating,
        notes: this.state.notes,
        nickname: this.state.nickname,
        partnerName: this.state.partnerName,
        userId: this.props.userId,
      }
    })
	}

	render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={subtitle => this.subtitle = subtitle}>Add Session</h2>
        <button onClick={this.props.onRequestClose}>close</button>

        <Form id="create-session-form">
	        <label htmlFor="nickname-field">Nickname:</label><br></br>
				  <Text field="nickname" onChange={this.handleNicknameChange} id="nickname-field" /><br></br>

				  <label htmlFor="partner-name-field">Partner Name:</label><br></br>
				  <Text field="partner-name" onChange={this.handlePartnerNameChange} id="partner-name-field" /><br></br>

	        <label htmlFor="dateTime-field">Date:</label><br></br>
	        <input type="datetime-local" name="dateTime" onChange={this.handleDateTimeChange} id="dateTime-field"/><br></br>

				  <label htmlFor="duration-field">Duration:</label><br></br>
				  <Text field="duration" onChange={this.handleDurationChange} id="duration-field" /><br></br>

				  <label htmlFor="ppm-field">Pumps Per Minute (PPM):</label><br></br>
				  <Text field="ppm" onChange={this.handlePpmChange} id="ppm-field" /><br></br>

				  <label htmlFor="rating-field">Rating:</label><br></br>
				  <Select field="rating" onChange={this.handleRatingChange} id="rating"><br></br>
				  	<Option value="" disabled>
				      Select One...
				    </Option>
				  	<Option value="1">1</Option>
				  	<Option value="2">2</Option>
				  	<Option value="3">3</Option>
				  	<Option value="4">4</Option>
				  	<Option value="5">5</Option>
				  </Select><br></br>

				  <label htmlFor="notes-field">Notes:</label><br></br>
				  <TextArea field="notes" onChange={this.handleNotesChange} id="textarea-notes" /><br></br>

				  <button onClick={this.handleSubmitClick} type="submit">
				    Submit
				  </button>
				</Form>
        
      </Modal>
    );
  }
}

export default CreateSessionModal