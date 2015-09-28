var Button = require('../forms/Button.jsx');

module.exports = React.createClass({
	
	getInitialState: function() {
		return {
			view: 'list',
			profile: {}
		};
	},
	
	componentWillMount: function() {
		ajax({
			url: 'api/dashboard/profiles/' + this.props.id,
			dataType: 'json',
			success: function(result) {
				this.setState({profile: result.profile});
			}.bind(this)
		});
	},
	
	toggleView: function() {
		if (this.state.view == 'list')
			this.setState({view: 'full'});
		else
			this.setState({view: 'list'});
	},
	
	deleteProfile: function() {
		ajax({
			url: 'api/dashboard/profiles/' + this.props.id,
			method: 'DELETE',
			dataType: 'json',
			success: function(result) {
				if (!result.error)
					this.props.update();
			}.bind(this)
		});
	},
	
	updateProfile: function() {
		var data = {
			name: React.findDOMNode(this.refs.name).value,
			email: React.findDOMNode(this.refs.email).value,
			fname: React.findDOMNode(this.refs.fname).value,
			lname: React.findDOMNode(this.refs.lname).value,
			gender: React.findDOMNode(this.refs.gender).value,
			phone: React.findDOMNode(this.refs.phone).value,
			birthdate: React.findDOMNode(this.refs.birthdate).value,
			address: React.findDOMNode(this.refs.address).value,
			zip: React.findDOMNode(this.refs.zip).value,
			region: React.findDOMNode(this.refs.region).value,
			country: React.findDOMNode(this.refs.country).value
		};
		
		ajax({
			url: 'api/dashboard/profiles/' + this.props.id,
			method: 'PUT',
			dataType: 'json',
			data: data,
			success: function(result) {
				if (!result.error)
					this.props.update();
			}.bind(this)
		});
	},
	
	render: function() {
		if (this.state.view == 'list') {
			return (
				<div className="profile-list-view">
					<h2>{this.state.profile.name}</h2>
					<Button type="secondary" onClick={this.toggleView}>Edit</Button>
					<Button type="danger" onClick={this.deleteProfile}>Delete</Button>
				</div>
			);
		}
		else {
			var p = this.state.profile;
		
			return (
				<div className="profile-form-view">
					<h2>{p.name}</h2>
					<a className="link-lg" onClick={this.toggleView}>Hide Form</a>
					<hr />
				
					<input type="text" placeholder="Profile Name" ref="name" defaultValue={p.name} />
					<input type="email" placeholder="Email" ref="email" defaultValue={p.email} />
					
					<br />
					
					<input type="text" placeholder="First Name" ref="fname" defaultValue={p.fname} />
					<input type="text" placeholder="Last Name" ref="lname" defaultValue={p.lname} />
					<select ref="gender" defaultValue={p.gender}>
						<option value="0">-</option>
						<option value="1">Male</option>
						<option value="2">Female</option>
						<option value="3">Other</option>
					</select>
					<input type="tel" placeholder="Phone Number" ref="phone" defaultValue={p.phone} />
					<input type="text" placeholder="Birthdate (2020-07-31)" ref="birthdate" defaultValue={p.birthdate} />
					
					<br />
					
					<input type="text" placeholder="Address" ref="address" defaultValue={p.address} />
					<input type="number" placeholder="Zip" ref="zip" defaultValue={p.zip} />
					<input type="text" placeholder="Region/State/Province" ref="region" defaultValue={p.region} />
					<input type="text" placeholder="Country (US/CA/UK/etc)" ref="country" defaultValue={p.country} />
					
					<Button onClick={this.updateProfile}>Update Profile</Button>
				</div>
			);
		}
	}
	
});