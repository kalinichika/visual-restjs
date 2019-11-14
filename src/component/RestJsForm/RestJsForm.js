import React, { Component } from "react";
import RestJsResult from "../RestJsResult";
import {
  fetchGetData,
  fetchPostData,
  fetchPutData,
  fetchDeleteData
} from "./fetchData.js";

export default class RestJsForm extends Component {
  state = {
    valueInputUrl: "",
    valueInputKey: "",
    valueInputValue: "",
    data: []
  };

  handleChangeUrl = event => {
    this.setState({ valueInputUrl: event.target.value });
  };
  handleChangeKey = event => {
    this.setState({ valueInputKey: event.target.value });
  };
  handleChangeValue = event => {
    this.setState({ valueInputValue: event.target.value });
  };

  handleSubmit = event => {
    const {
      valueInputUrl: url,
      valueInputKey: key,
      valueInputValue: value
    } = this.state;

    switch (event.target.value) {
      case "Get":
        fetchGetData(url, key, value).then(data => {
          this.setState({ data: data });
        });
        break;
      case "Post":
        fetchPostData(url, key, value).then(data =>
          this.setState({ data: data })
        );
        break;
      case "Put":
        fetchPutData(url, key, value).then(data =>
          this.setState({ data: data })
        );
        break;
      case "Delete":
        fetchDeleteData(url, key, value).then(data =>
          this.setState({ data: data })
        );
        break;
    }
  };

  render() {
    const { data } = this.state;
    const ifData =
      "result" in data ||
      "message" in data ||
      "key" in data ||
      (Array.isArray(data) && data.length !== 0);
    const result = ifData ? <RestJsResult data={data} /> : null;
    return (
      <div>
        <div className="main-panel">
          <div className="input-panel">
            <span className="input-label">url:</span>
            <input
              className="text"
              name="url"
              type="text"
              onChange={this.handleChangeUrl}
            ></input>
          </div>
          <div className="input-panel">
            <span className="input-label">key:</span>
            <input
              className="text"
              name="key"
              type="text"
              onChange={this.handleChangeKey}
            ></input>
          </div>
          <div className="input-panel">
            <span className="input-label">value:</span>
            <input
              className="text"
              name="value"
              type="text"
              onChange={this.handleChangeValue}
            ></input>
          </div>
          <div className="input-panel submit-panel" onClick={this.handleSubmit}>
            <input className="submit" type="submit" value="Get" />
            <input className="submit" type="submit" value="Post" />
            <input className="submit" type="submit" value="Put" />
            <input className="submit" type="submit" value="Delete" />
          </div>
        </div>
        <div>{result}</div>
      </div>
    );
  }
}
