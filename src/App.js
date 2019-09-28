import React from 'react';
import './App.scss';

// The various conditionally rendered components in this app
import Welcome from './components/Welcome/Welcome';
import NDA from './components/NDA/NDA';

// Where OneDrive API would've lived
import OneDrive from './util/OneDrive';
// Library for converting canvas to png
import html2canvas from 'html2canvas';
// Library for converting png to pdf
import jsPDF from 'jspdf';


// Pull current date from the OS
function getCurrentDate() {
  let now = new Date();
  let options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  let date = new Intl.DateTimeFormat('en-US', options).format(now);
  return date;
}

// Pull current time from the OS
function getCurrentTime() {
  let now = new Date();
  let options = {
    hour: 'numeric',
    minute: 'numeric'
  };
  let time = new Intl.DateTimeFormat('en-US', options).format(now);
  return time;
}

// Make sure that form inputs are not empty
function validate(firstname, lastname, company, reason, host) {
  return {
    firstname: firstname.length === 0,
    lastname: lastname.length === 0,
    company: company.length === 0,
    reason: reason.length === 0,
    host: host.length === 0
  };
}

class App extends React.Component {
  // Initialize states and bind functions to this
  constructor(props) {
    super(props);
    // Form inputs are stateful so that they can dynamically change depending on what's typed into them
    this.state = {
      date: getCurrentDate(),
      time: getCurrentTime(),
      // Starts with welcome state, paste in whatever state you want to work on
      render: 'welcome',
      userData: {
        firstname: '',
        lastname: '',
        company: '',
        reason: '',
        host: '',
      },
      // Track whether or not form input has been touched
      touched: {
        firstname: false,
        lastname: false,
        company: false,
        reason: false,
        host: false
      },
      // Animate form field onFocus
      animate: {
        firstname: false,
        lastname: false,
        company: false,
        reason: false,
        host: false
      }
    };

    this.update = this.update(this);

    this.nameCheck = this.nameCheck.bind(this);
    this.updateRender = this.updateRender.bind(this);
    this.markTouched = this.markTouched.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
  };

  // Form inputs are stateful and handled by update functions
  update(event) {
    const property = event.target.name;

    this.setState({
      //firstname: event.target.value
      if ( userData.hasOwnProperty(property) ) {
        userDate[property] = event.target.value;
      }
    });
  }

  // Animate form field onFocus
  animateField(field) {
    this.setState({
      animate: { ...this.state.animate, [field]: true }
    });
  }

  // Mark form if empty onBlur
  markTouched(field) {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  }

  // Run check against restricted persons lists
  runCheck(field) {
    if (this.state.firstname && this.state.lastname)
    {
      // Where restricted persons list API would have lived
      console.log('Name to check: ' + this.state.firstname + ' ' + this.state.lastname);
    }
  }

  // Run both of the above functions for the name check
  nameCheck(field) {
    this.markTouched(field);
    this.runCheck(field);
  }

  // This function does the conditional rendering using state
  // This would need to change if the app needed back functionality
  updateRender(source) {
    if (source === 'welcome') {
      this.setState({
        render: 'form'
      });
    }
    else if (source === 'form') {
      this.setState({
        render: 'NDA'
      });
    }
    else if (source === 'NDA') {
      this.setState({
        render: 'exit'
      });
    }
    else if (source === 'exit') {
      this.setState({
        render: 'welcome'
      });
    }
    else {
      console.log('updateRender received no source argument');
    }
  }

  // PDF conversion did not make it past the testing phase
  // Lots of construction code in there if I ever want to complete it
  handleAccept() {
    html2canvas(document.querySelector('#nda-pdf')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      // Testing output of canvas.toDataURL from above by appending to the bottom of the page
      document.body.appendChild(canvas);
      // const width = canvas.width;
      // console.log(width);
      // const height = canvas.height;
      // console.log(height);
      // const pdf = new jsPDF('', 'mm', [canvas.width, canvas.height]);
      // pdf.addImage(imgData, 'png', 0, -4082, canvas.width, canvas.height);
      // Placeholder for OneDrive functionality
      // const filename = 'NDA_' + this.state.firstname + '_' + this.state.lastname;
      // pdf.save(filename + '.pdf');
      // OneDrive.upload();
    });
  }

  // RENDER FUNCTION
  render() {
    // This would be a great place to map your state to props
    const { userData } = this.state; // But better to pass in props or use hooks

    // Disable submit button until all form fields are populated
    const errors = validate(userData);

    const isDisabled = Object.keys(errors).some(x => errors[x]);

    // Switch for animating the form fields
    const animateTouch = field => {
      const _animate = this.state.animate[field];
      return _animate;
    };

    // Assign form input className to "error" if user enters nothing into form field
    const shouldMarkError = field => {
      // Is there anything in the form field (true if it hasn't been touched)
      const hasError = errors[field];
      // Has the form field with nothing in it been touched yet?
      // If it hasn't been touched and nothing's in it, show error state
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    // Here's where the conditional rendering starts
    // Because form fields all control state, all of the form JSX lives in App.js

    // Render Welcome component if render state = 'welcome'
    if (this.state.render === 'welcome') {
      return (
          <div className="Container" onClick={this.updateRender.bind(this, "welcome")} >
            <Welcome />
          </div>
      );
    }

    else if (this.state.render === 'form') {
      return (
        <div className="Container form-render">

          {/* Main form inputs live in App because they determine state */}
            <div className="Content">
            <div className="Header">
              <div className="Header-Content">
                  <div className="item back"></div>
                  <div className="item"><p>Some information about you</p></div>
                  <div className="item next-active">
                    <button disabled={isDisabled} onClick={this.updateRender.bind(this, "form")}></button>
                  </div>
              </div>
            </div>
            <form>
              <div className="form-wrapper">
              <div className="form-group">
                <label className="form-label">First name
                <input
                  name="firstname"
                  className={(animateTouch("firstname") ? "focused" : "form-input") + (shouldMarkError("firstname") ? " error" : "")}
                  onFocus={this.animateField.bind(this, "firstname")}
                  placeholder=""
                  onChange={this.update}
                  onBlur={this.nameCheck.bind(this, "firstname")}
                />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Last name
                  <input
                    name="lastname"
                    className={(animateTouch("lastname") ? "focused" : "form-input") + (shouldMarkError("lastname") ? " error" : "")}
                    onFocus={this.animateField.bind(this, "lastname")}
                    placeholder=""
                    onChange={this.update}
                    onBlur={this.nameCheck.bind(this, "lastname")}
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Company
                <input
                  className={(animateTouch("company") ? "focused" : "form-input") + (shouldMarkError("company") ? " error" : "")}
                  onFocus={this.animateField.bind(this, "company")}
                  placeholder=""
                  onChange={this.updateCompany}
                  onBlur={this.markTouched.bind(this, "company")}
                />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Reason for visit
                <input
                  className={(animateTouch("reason") ? "focused" : "form-input") + (shouldMarkError("reason") ? " error" : "")}
                  onFocus={this.animateField.bind(this, "reason")}
                  placeholder=""
                  onChange={this.updateReason}
                  onBlur={this.markTouched.bind(this, "reason")}
                />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Host
                  <input
                    className={(animateTouch("host") ? "focused" : "form-input") + (shouldMarkError("host") ? " error" : "")}
                    onFocus={this.animateField.bind(this, "host")}
                    placeholder=""
                    onChange={this.updateHost}
                    onBlur={this.markTouched.bind(this, "host")}
                  />
                </label>
              </div>
            </div>
            </form>
            </div>


        </div>
      );

    // After the user has submitted the form, render the NDA
    }

    else if (this.state.render === 'NDA') {
      return (
        <div className="NDA-render">
          <NDA firstName={this.state.firstname} lastName={this.state.lastname} date={this.state.date} time={this.state.time} updateRender={this.updateRender} />
        </div>
      );
    }

    // Exit screen never actually got Componentized
    else if (this.state.render === 'exit') {
      return (
        <div onClick={this.updateRender.bind(this, "exit")}>
          <div className="Header">
            <div className="Header-Content">
                <div className="item back"></div>
                <div className="item"><p>You are all set</p></div>
                <div className="item next-active"></div>
            </div>
          </div>
        </div>
      );
    }

    else {
      return (
        <div>
          <br />
            Something is broken, refresh app?
        </div>
      );
    }
  }

}

export default App;
