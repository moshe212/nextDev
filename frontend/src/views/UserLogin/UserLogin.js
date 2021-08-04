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

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUserDetails: (userdetails) => dispatch(saveUserDetails(userdetails)),
});

function UserLogin(props) {
  const [formstate, setFormstate] = useState({
    user_name: "",
    password: "",
  });

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

    console.log(formstate);
    axios
      .post("/api/LogInUser", {
        userDetails: formstate,
      })
      .then(function(response) {
        // handle success
        console.log(response.data);
        props.saveUserDetails(response.data.userdetails);
        history.push("/admin/user");
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  };

  const classes = useStyles();
  return (
    <div>
      <GridContainer>
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
      </GridContainer>
    </div>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(UserLogin);
