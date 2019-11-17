import React, { Component } from "react";
import PropTypes from "prop-types";
import RestJsResult from "../RestJsResult";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  fetchGetData,
  fetchPostData,
  fetchPutData,
  fetchDeleteData
} from "./fetchData.js";

const styles = theme => ({
  root: {
    width: "100%",
    height: "100vh"
  },
  paper: {
    margin: theme.spacing(0, 4),
    marginTop: "10vw",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    fontFamily: "'Gruppo', cursive",
    fontWeight: "900",
    fontSize: "calc( (100vw - 480px)/(1280 - 480) * (30 - 16) + 25px)"
  },
  form: {
    width: "100%"
  },
  textArea: {
    "&:focus": {
      backgroundColor: "lightblue"
    },
    height: "calc( (100vw - 480px)/(1280 - 480) * (24 - 16) + 40px)"
  },
  button: {
    marginTop: "calc( (100vw - 480px)/(1280 - 480) * (24 - 16) + 5px)",
    background: "rgb(250, 173, 143)",
    borderRadius: 3,
    color: "white",
    height: 40,
    padding: "0 5px",
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.3)",
    "&:hover": {
      backgroundColor: "rgba(22, 150, 182, 0.637)"
    },
    "&:focus": {
      backgroundColor: "rgba(22, 150, 182, 1)"
    }
  },
  result: {
    width: "100%",
    border: "2px solib black",
    padding: theme.spacing(3),
    backgroundColor: "rgba(142, 230, 236, 0.4)"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

class RestJsForm extends Component {
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
    switch (event.currentTarget.value) {
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
    const { classes } = this.props;
    const { data } = this.state;
    const ifData =
      "result" in data ||
      "message" in data ||
      "key" in data ||
      (Array.isArray(data) && data.length !== 0);
    const result = ifData ? <RestJsResult data={data} /> : null;

    return (
      <Grid
        container
        component="main"
        className={classes.root}
        id="back-to-top-anchor"
      >
        <CssBaseline />
        <Grid item xs={12} sm={6} md={5} component={Paper}>
          <div className={classes.paper}>
            <Typography component="h1" variant="h4" className={classes.header}>
              REST JS
            </Typography>
            <form className="form">
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="url"
                label="URL"
                name="url"
                autoFocus
                onChange={this.handleChangeUrl}
                className={classes.textArea}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="key"
                label="KEY"
                name="key"
                autoFocus
                onChange={this.handleChangeKey}
                className={classes.textArea}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="value"
                label="VALUE"
                name="value"
                autoFocus
                onChange={this.handleChangeValue}
              />
              <div xs={9}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={6} sm={6} md={3}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      value="Get"
                      fullWidth
                      className={classes.button}
                      onClick={this.handleSubmit}
                    >
                      Get
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      value="Post"
                      fullWidth
                      className={classes.button}
                      onClick={this.handleSubmit}
                    >
                      Post
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      value="Put"
                      fullWidth
                      className={classes.button}
                      onClick={this.handleSubmit}
                    >
                      Put
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={3}>
                    <Button
                      type="button"
                      variant="contained"
                      color="primary"
                      value="Delete"
                      fullWidth
                      className={classes.button}
                      onClick={this.handleSubmit}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={7} className={classes.result}>
          {result}
          <ScrollTop {...this.props}>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </Grid>
      </Grid>
    );
  }
}

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        className={useStyles().root}
      >
        {children}
      </div>
    </Zoom>
  );
}

RestJsForm.propTypes = {
  classes: PropTypes.object.isRequired
};
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

export default withStyles(styles)(RestJsForm);
