import React from 'react';
// import Load from '../utilities/load.jsx';
import Fetcher from "./Fetcher";
import {reduxForm, SubmissionError, stopSubmit} from 'redux-form'
import {connect} from "react-redux"
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '../loader.css';
/*
To use ServiceBot Base Form:
Inputs->
*form - A redux-form
*initialValues - an object with the initial values of the form. will be overrode by values from initialRequests
*initialRequests - an Array of request object. All entries without a name value will be added to the redux-form initialValues highest level.
 All other requests should have a name formatted with a leading _ to avoid collisions. Ex:
    const initialRequests = [
        {'method': 'GET', 'url': `/api/v1/service-templates/1`},
        {'method': 'GET', 'url': `/api/v1/service-categories`, 'name': '_categories'},
    ];
*submissionPrep - A method that either returns values, or a promise that resolves values. Thrown errors will be created
   as submission error
*submissionRequest - A request object with just the method and url for the form to be submitted to. Ex:
    const submissionRequest = {
        'method': 'PUT',
        'url': `/api/v1/service-categories/1`
    };
*validations - an array of validations for the form
Ex:
    validations = {
      username: [required(), length({ max: 15 })],
      email:    [required(), email()],
      age:      [
        required(),
        numericality({ int: true }),
        numericality({ '>=': 18, msg: "You must be at least 18 years old" })
      ]
    }
*handleResponse - A method to be called after a form is submitted. Takes in the result of the submission Response
*successMessage - The message to be displayed after submission succeeds
* successRoute - The route to redirect the page to upon successful completion
*failureRoute - The route for the browser to redirect to if there’s a failure
*helpers - any properties needed to pass to the form for functionality
Note:
Form name is 'servicebotForm' if selector is needed
 */


function Loading(props){
    return(<div className="loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>);
}
class ServiceBotBaseForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            submissionResponse: {},
            loading: false,
            initializing: true,
            success: false,
            initialRequests: this.props.initialRequests,
            submissionRequest: this.props.submissionRequest,
            successMessage: this.props.successMessage,
            failureRoute: (this.props.failureRoute || "/"),
            successRoute: (this.props.successRoute || null),
            initialValues: this.props.initialValues || {},
            helpers: this.props.helpers || {},
        };
        this.submitForm = this.submitForm.bind(this);
        this.validate = this.validate.bind(this);

    }

    async submitForm(values) {
        let self = this;
        try {
            self.setState({loading: true});
            if (self.props.submissionPrep) {
                let prepResults = await self.props.submissionPrep(values);
                await self.makeCall(prepResults);
            }
            else {
                await self.makeCall(values);
            }
        }catch(e){
            console.error("Something happened submitting", e);
            self.setState({loading : false});
            throw new SubmissionError({_error: e});
        }
    }
    getRequest(method="GET", body){
        let headers = {
            "Content-Type": "application/json"
        };
        if(this.props.token){
            headers["Authorization"] = "JWT " + this.props.token;
        }



        let request = { method: method,
            headers: new Headers(headers),


        };
        if(!this.props.external){
            request.credentials = "include";
        }

        if(method === "POST" || method==="PUT"){
            request.body = JSON.stringify(body)
        }
        return request;
    }

    async makeCall(values) {
        let self = this;
        let result = null;
        let request = null;
        try {
            request = this.getRequest(self.state.submissionRequest.method, values);
            result = await Fetcher(self.state.submissionRequest.url, self.state.submissionRequest.method, values, request);
        } catch (e) {
            console.error("Fetch error", e);
            self.setState({loading: false});
            Alert.error(e);
            if(this.props.handleFailure) {
                self.props.handleFailure(e);
            }
            throw "Error submitting"
        }

        if (!result.error) {
            if (self.props.handleResponse) {
                self.props.handleResponse(result)
            }
            self.setState({loading: false, success: true, submissionResponse: result});
            this.state.successMessage && Alert.success(this.state.successMessage);
            if (this.props.successRoute) {
                this.props.history.push(this.props.successRoute);
            }
        }
        else {
            console.error("submission error", result.error);
            self.setState({loading: false});
            if(this.props.handleFailure) {
                await self.props.handleFailure(result);
            }
            Alert.error(result.error);

            // self.props.endSubmit({_error: result.error})
            throw result.error;
            if (this.props.failureRoute) {
                self.props.history.push(this.props.failureRoute);
            }
        }

    }

    validate(values){
        if(this.props.validations)
            return this.props.validations(values);
        else
            return
    };

    componentDidMount() {
        let self = this;
        let initialRequests = self.state.initialRequests;
        if (initialRequests && initialRequests.length > 0) {
            let allRequests = initialRequests.map(async requestInfo => {
                let response = await Fetcher(requestInfo.url, requestInfo.method);
                if (requestInfo.name) {
                    response._name = requestInfo.name;
                }
                return response;
            });
            Promise.all(allRequests).then(async values => {
                //Check for errors and unauthenticated!
                let error = values.find(value => value.error);
                if (!error) {
                    let requestValues = values.reduce((acc, value, currentIndex) =>
                        (value._name ? {...acc, [value._name]: value} : {...acc, ...value}),
                    self.state.initialValues)
                    if(self.props.initializer){
                        requestValues = await self.props.initializer(requestValues);
                    }
                    let initialForm = reduxForm({
                        form: self.props.formName || "servicebotForm",
                        initialValues: requestValues,
                        validate: self.validate,
                    })(self.props.form);
                    self.setState({initializing: false, reduxForm: initialForm});
                } else {
                    console.error("fetch error", error);
                    self.setState({initializing: false});
                    self.state.failureRoute && self.props.history.push(self.state.failureRoute);

                }
            })
        }
        else {
            //todo: clean this whole function to not duplicate this code.
            let initialForm = reduxForm({
                form: self.props.formName || "servicebotForm",
                initialValues: self.state.initialValues,
                validate: self.validate,
            })(this.props.form);

            self.setState({initializing: false, reduxForm: initialForm});
        }
    }

    render() {
        if (this.state.initializing) {
            return (<Loading/>);

        }
        if (this.state.success && !this.props.reShowForm) {
            return (
                <div className="p-20">
                <p><i className="fa fa-check" aria-hidden="true"/><strong>{this.state.successMessage}</strong></p>
            </div>
        );
        } else {
            let ReduxFormWrapper = this.state.reduxForm;

            return (
                <div>
                    <Alert stack={{limit: 3}} />
                    {this.state.loading && <Loading/>}
                <ReduxFormWrapper {...this.props.formProps} helpers={this.props.helpers} onSubmit={this.submitForm} />
            </div>
        );
        }
    }
}

ServiceBotBaseForm = connect(state => {
    return {
        history : state.history
    }
})(ServiceBotBaseForm)
export default ServiceBotBaseForm;
