import React from 'react';
import ReactDOM from 'react-dom';
import ReactTable from "react-table";

const columns = [
	{
		Header: 'Start Time',
		accessor: 'startTime'
	},
	{
		Header: 'Partner Name',
		accessor: 'partnerName'
	}, 
	{
		Header: 'Duration (mins)',
		accessor: 'duration',
	},
	{
		Header: 'Pumps Per Minute (PPM)',
		accessor: 'pumpsPerMinute',
	},
	{
		Header: 'Rating',
		accessor: 'rating',
	},
	{
		Header: 'Penetrative Distance (mi)',
		accessor: 'penetrativeDistance',
	},
]

class UserThumpSessionsList extends React.Component {
	constructor() {
		super();

		this.state = {
			thumpSessionsData: []
		};
	}

	componentDidMount() {
		$.ajax({
      type: 'GET',
      url: `/users/${this.props.userId}/getThumpSessions`,
    }).done(response => {
    	this.setState({thumpSessionsData: response})
    })
	}

	getTotalDuration() {
		return this.state.thumpSessionsData.reduce((prev, cur) => {
			return prev + cur.duration
		}, 0)
	}

	getTotalPenetrativeDistance() {
		return this.state.thumpSessionsData.reduce((prev, cur) => {
			return prev + cur.penetrativeDistance
		}, 0)
	}

	getAvgPumpsPerMinute() {
		const totalPumpsPerMinute = this.state.thumpSessionsData.reduce((prev, cur) => {
			return prev + cur.pumpsPerMinute
		}, 0)

		return totalPumpsPerMinute / this.state.thumpSessionsData.length
	}

	render() {
    return (
    	<div>
    		<div className="summary-stats">
    			<h3>Performance Summary:</h3>
    			Total Duration: {this.getTotalDuration()}<br></br>
    			Total Penetrative Distance (mi): {this.getTotalPenetrativeDistance()}<br></br>
    			Avg PPM: {this.getAvgPumpsPerMinute()}<br></br>
    		</div>
	      <ReactTable 
	      	data={this.state.thumpSessionsData} 
	      	columns={columns}
	      />
      </div>
    );
  }
}

export default UserThumpSessionsList