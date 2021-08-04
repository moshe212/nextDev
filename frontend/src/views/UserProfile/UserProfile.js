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
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import avatar from "assets/img/faces/marc.jpg";

import { connect } from "react-redux";
import axios from "axios";
import { saveUserDetails } from "../../redux/actions";

const mapStateToProps = (state) => {
  return state.user_details || {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUserDetails: (userdetails) => dispatch(saveUserDetails(userdetails)),
});

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

function UserProfile(props) {
  const [formstate, setFormstate] = useState({
    user_name: props.user_details ? props.user_details.UserName : "",
    email_address: props.user_details ? props.user_details.Email_address : "",
    first_name: props.user_details ? props.user_details.First_Name : "",
    last_name: props.user_details ? props.user_details.Last_Name : "",
    city: props.user_details ? props.user_details.City : "",
    country: props.user_details ? props.user_details.Country : "",
    postal_code: props.user_details ? props.user_details.Postal_Code : "",
    about_me: props.user_details ? props.user_details.About_Me : "",
    token: props.user_details ? props.user_details.Token : "",
  });

  const handleChange = (e) => {
    // console.log(e.target);
    let nam = e.target.id;
    let val = e.target.value;
    setFormstate({ ...formstate, [nam]: val });
    // console.log(formstate);
  };

  console.log("props", props);
  console.log("state", formstate);
  const classes = useStyles();

  const UpdateProfile = (e) => {
    e.preventDefault();

    console.log(formstate);
    axios
      .post("/api/UpdateProfile", {
        userDetails: formstate,
      })
      .then(function(response) {
        // handle success
        console.log("pro", response.data);
        props.saveUserDetails(response.data.userdetails);

        // setResp(response.data.data[0].text);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="Company (disabled)"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
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
                    defaultValue={formstate.user_name}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Email address"
                    id="email_address"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.email_address}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="First Name"
                    id="first_name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.first_name}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Last Name"
                    id="last_name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.last_name}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.city}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Country"
                    id="country"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.country}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Postal Code"
                    id="postal_code"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.postal_code}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel>
                  <CustomInput
                    labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                    id="about_me"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 5,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        handleChange(e);
                      },
                    }}
                    defaultValue={formstate.about_me}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                onClick={(e) => {
                  UpdateProfile(e);
                }}
                color="primary"
              >
                Update Profile
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          {props.user_details ? (
            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  <img src={avatar} alt="..." />
                </a>
              </CardAvatar>
              <CardBody profile>
                <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
                <h4 className={classes.cardTitle}>
                  {props.user_details.First_Name} {props.user_details.Last_Name}
                </h4>
                <p className={classes.description}>
                  {props.user_details.About_Me}
                </p>
                <Button color="primary" round>
                  Follow
                </Button>
              </CardBody>
            </Card>
          ) : (
            ""
          )}
          ;
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null
)(UserProfile);
