import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editCriteria } from "../actions";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import "../styles/Slider.css";

class Slider extends Component {
  state = {
    value: { min: 0, max: 0 }
  };

  componentDidMount() {
    if (this.props.type === "budget") {
      this.setState({ value: { min: 100, max: 1800 } });
    }

    if (this.props.type === "seats") {
      this.setState({ value: { min: 2, max: 9 } });
    }
  }

  //edit criteria object to send to backend
  handleChangeComplete = value => {
    this.props.editCriteria(
      null,
      value,
      this.props.minName,
      this.props.maxName
    );
  };

  renderCorrectSliderType = () => {
    const {
      value: { min, max }
    } = this.state;

    if (this.props.type === "budget") {
      return (
        <Fragment>
          <label>{this.props.label}</label>
          <p>
            £{min} - £{max}
          </p>
          <InputRange
            maxValue={3000}
            minValue={100}
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onChangeComplete={value => this.handleChangeComplete(value)}
          />
        </Fragment>
      );
    }

    if (this.props.type === "seats") {
      return (
        <Fragment>
          <label>{this.props.label}</label>
          <p>
            {min} - {max} Seats
          </p>
          <InputRange
            maxValue={9}
            minValue={2}
            step={1}
            value={this.state.value}
            onChange={value => this.setState({ value })}
            onChangeComplete={value => this.handleChangeComplete(value)}
          />
        </Fragment>
      );
    }
  };

  render() {
    return (
      <section className="slider" style={{ paddingTop: ".5rem" }}>
        {this.renderCorrectSliderType()}
      </section>
    );
  }
}

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  minName: PropTypes.string.isRequired,
  maxName: PropTypes.string.isRequired,
  editCriteria: PropTypes.func.isRequired
};

export default connect(
  null,
  { editCriteria }
)(Slider);
