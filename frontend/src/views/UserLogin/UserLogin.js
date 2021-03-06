import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveUserDetails } from "../../redux/actions";
import { clearUserDetails } from "../../redux/actions";

import { message } from "antd";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

const mapStateToProps = (state) => {
  return state.user_details || {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUserDetails: (userdetails) => dispatch(saveUserDetails(userdetails)),
  clearUserDetails: () => dispatch(clearUserDetails()),
});

function UserLogin(props) {
  const [formstate, setFormstate] = useState({
    user_name: "",
    password: "",
    error_user: false,
    error_pass: false,
  });
  console.log(formstate);
  let history = useHistory();

  const handleChange = (e) => {
    // console.log(e.target);
    let nam = e.target.id;
    let val = e.target.value;
    setFormstate({ ...formstate, [nam]: val });
    // console.log(formstate);
  };

  const Login = (e) => {
    e.preventDefault();

    // console.log(formstate);
    if (formstate.user_name.length > 0 && formstate.password.length > 0) {
      setFormstate({ ...formstate, error_user: false, error_pass: false });
      axios
        .post("/api/LogInUser", {
          userDetails: formstate,
        })
        .then(function(response) {
          // handle success
          message.success({
            content:
              "You success log in. We immediately transfer you to profile page",
            className: "custom-class",
            style: {
              marginTop: "10vh",
            },
            duration: 3,
          });
          console.log(response.data);

          setTimeout(() => {
            props.saveUserDetails(response.data.userdetails);
            history.push("/admin/user");
          }, 2000);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
          message.error({
            content:
              "You not success log in. We sorry but you can try again.. Never Give Up",
            className: "custom-class",
            style: {
              marginTop: "10vh",
            },
            duration: 3,
          });
        })
        .then(function() {
          // always executed
        });
    } else {
      if (formstate.user_name.length === 0 && formstate.password.length === 0) {
        setFormstate({ ...formstate, error_user: true, error_pass: true });
      } else if (
        formstate.password.length === 0 &&
        formstate.user_name.length > 0
      ) {
        setFormstate({ ...formstate, error_pass: true, error_user: false });
      } else if (
        formstate.password.length > 0 &&
        formstate.user_name.length === 0
      ) {
        setFormstate({ ...formstate, error_user: true, error_pass: false });
      }
    }
  };
  const LogOut = (e) => {
    e.preventDefault();

    axios
      .post("/api/LogOutUser", {
        userDetails: { token: props.user_details.Token },
      })
      .then(function(response) {
        // handle success
        console.log(response.data);
        message.success({
          content: "You Successfully Logged Out. We miss you",
          className: "custom-class",
          style: {
            marginTop: "10vh",
          },
          duration: 3,
        });

        setTimeout(() => {
          props.clearUserDetails();
        }, 2000);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  };

  const isLogin = props.user_details
    ? Object.entries(props.user_details).length === 0
      ? false
      : true
    : false;
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        {!isLogin ? (
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Login</h4>
                <p className={classes.cardCategoryWhite}>
                  Insert your username and password
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      error={formstate.error_user}
                      labelText="Username"
                      id="user_name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleChange(e);
                        },
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      error={formstate.error_pass}
                      labelText="Password"
                      id="password"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: (e) => {
                          handleChange(e);
                        },
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={(e) => {
                    Login(e);
                  }}
                  color="primary"
                >
                  Login
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        ) : (
          <GridItem xs={12} sm={12} md={8}>
            <Button
              onClick={(e) => {
                LogOut(e);
              }}
              color="primary"
            >
              LogOut
            </Button>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(UserLogin);
