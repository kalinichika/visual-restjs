import React, { Component } from "react";

export default class RestJsResult extends Component {
  render() {
    const { data } = this.props;
    return Array.isArray(data) ? (
      <div className="result-panel">
        {data.map(item => (
          <li key={item.key}>
            <span className="data-key"> {item.key} :</span>
            <span className="data-value"> {item.value}</span>
          </li>
        ))}
      </div>
    ) : data.message ? (
      <div className="result-panel">
        <li className="result-message">{data.message}</li>
      </div>
    ) : data.result ? (
      <div className="result-panel">
        <li className="result-error">{data.result}</li>
      </div>
    ) : (
      <div className="result-panel">
        <li>
          <span className="data-key"> {data.key} :</span>
          <span className="data-value"> {data.value}</span>
        </li>
      </div>
    );
  }
}
