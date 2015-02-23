//SVG clock: http://demosthenes.info/blog/943/An-SVG-Analog-Clock-In-6-Lines-of-JavaScript

var Clock = React.createClass({
	componentWillMount: function() { //Invoked immediately before the initial rendering occurs
		this.intervals = [];
	},
	componentDidMount: function() {
   		this.setInterval(this.tick, 1000); 
   	},
   	setInterval: function() {
   		this.intervals.push(setInterval.apply(null, arguments));
   	},
   	componentWillUnmount: function() { //Invoked immediately before a component is unmounted from the DOM.
   		this.intervals.map(clearInterval);
   	},
   	tick: function (){
   		this.setState({date : new Date()});
   	},
	getDefaultProps: function (){ //Runs once on init, must return default prop values
		return { 
			bgColor: '#F1F1F1', 
			fgColor: '#2D2A2E',
		};
	}, 
	getInitialState: function (){ //Runs once on init, must return object with state values
		return {date : new Date()};
	}, 
	render: function (){ //Required! Renders component and children
		return (
			<svg viewBox="0 0 100 100">
				<Face />
				<g id="hands">
					 <SecondHand seconds = {this.state.date.getSeconds()} />
					<MinuteHand minutes = {this.state.date.getMinutes()} />
					<HourHand hours = {this.state.date.getHours()} minutes = {this.state.date.getMinutes()} />
				</g>
			</svg>
		);
	},

});


var AnimateMixin = { //Mixins are shared between components. 
	rotate: function(deg) {
		//deg+=180;
		return 'rotate('+ deg +' 15 15)';
	}
};

var SecondHand = React.createClass({
	mixins: [AnimateMixin],
	render: function (){
		return (
			<line id="sec" x1="15" y1="0" x2="15" y2="15" transform={this.rotate(6*this.props.seconds)} />
			);
	},	
});

var MinuteHand = React.createClass({
	mixins: [AnimateMixin],
	render: function (){
		return (
			<rect id="min" x="15" y="13.5" width="1.5" height="15" rx="1.5" ry="1.5" transform={this.rotate(6*this.props.minutes+180)} />
			);
	},	
});

var HourHand = React.createClass({
	mixins: [AnimateMixin],
	render: function (){
		return (
			<rect id="hour" x="14" y="14" width="2" height="15" rx="2" ry="2" transform={this.rotate(30*(this.props.hours%12) + this.props.minutes/2 + 180)} />
			);
	},	
});

var Face = React.createClass({
	render: function (){
		return (
			<circle id="face" cx="15" cy="15" r="15"/>
			);
	},	
});


React.render(<Clock />, document.getElementById('content'));
