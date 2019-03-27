import React from 'react';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip'
import {toCents} from "./toCents"
import {connect} from 'react-redux';
import getSymbolFromCurrency from 'currency-symbol-map'



let widgetField = props => {
    let {widget, label, type, meta: {touched, error, warning}} = props;
    let WidgetComponent = widget;

    return (
        <div className={`sb-form-group`}>
            {(label && type !== 'hidden' && (type ==='text' || type === 'secure-string')) && <label className="_label-">{label}</label>}
            <div className="_input-container-">
                <WidgetComponent
                    {...props}
                />
                {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}</span>)) }
            </div>
        </div>
    )
};

let inputField = props => {
    let {className, inputRef, input, placeholder, label, type, meta: {touched, error, warning}} = props;
    let autofocus = props && props.willAutoFocus;
    if(!className){
        className = 'default'
    }
    let formControlClass = `${className}-input _input- _input-${className} ${touched && error ? 'has-error' : ''} ${touched && warning ? 'has-warning' : ''}`;

    let getInputField = (type)=>{
        switch(type){
            case 'textarea':
                return (
                    <textarea className={formControlClass} {...input} placeholder={label} autoFocus={autofocus} ref={inputRef}/>
                );
                break;
            case 'checkbox':
                return (
                    <input className={`${formControlClass} checkbox`} {...input} placeholder={label} type={type} autoFocus={autofocus} ref={inputRef}/>
                );
            default:
                return (
                    <input className={formControlClass} {...input} placeholder={placeholder || label} type={type} autoFocus={autofocus} ref={inputRef}/>
                )
        }
    };



    return(
        <div className={`sb-form-group _group-${className} ${type === 'hidden' && 'hidden'}`}>
            {(label && type !== 'hidden') && <label className={`${className}-label _label- _label-${className}`}>{label}</label>}
            <div className={`_input-container- _input-container-${className}`}>
                {getInputField(type)}
                {touched &&
                ((error &&
                    <span className={`form-error _form-error- _form-error-${className}`}>{error}</span>) ||
                    (warning &&
                        <span className={`form-warning _form-error- _form-warning-${className}`}>{warning}</span>
                    ))
                }
            </div>
        </div>
    );
};


class selectField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        let {options, valueKey, input} = this.props;
        if(!input.value && options.length > 0){
            let value = valueKey ? options[0][valueKey] : options[0].id;
            input.onChange(value);

        }

    }
    componentDidUpdate(prevProps, prevState){
        let {options, valueKey, labelKey, defaultValue, input} = this.props;
        let self = this;
        //if there is a default value, set it, other wise, use the first option
        if((!input.value || !options.find(option =>option.id == input.value)) && options.length > 0 ){
            input.onChange(options[0].id);
        }
        else if(options.length == 0 && prevProps.options.length > 0){
            input.onChange(undefined);
        }
    }

    render() {
        let {className, input, label, type, options, valueKey, labelKey, meta: {touched, error, warning}} = this.props;
        if(!className){
            className = 'default'
        }
        let formControlClass = `${className}-input _input- _input-${className}`;
        return (
            <div className={`sb-form-group _group-${className}`}>
                {label && <label className={`${className}-label _label- _label-${className}`}>{label}</label>}
                <div className={`_input-container- _input-container-${className}`}>
                    <select className={formControlClass} {...input} placeholder={label}>
                        {options && options.map((option, index) =>
                            <option key={index} value={valueKey ? option[valueKey] : option.id}>
                                {labelKey ? option[labelKey] : option.name}
                            </option>
                        )
                        }
                    </select>
                    {touched && ((error && <span className="form-error">{error}</span>) || (warning && <span className="form-warning">{warning}</span>))}
                </div>
            </div>
        );
    }
}

class OnOffToggleField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        };

        this.toggle = this.toggle.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    componentDidMount() {
        if(!this.props.disableOnMount) {
            let initialValue = this.props.input.value || false;
            if (this.props.input.onChange) {
                this.props.input.onChange(initialValue);
            }
        }
    }

    toggle(){
        if(this.props.input.onChange) {
            let newVal = !this.props.input.value;
            // this.props.setValue(newVal);
            this.props.input.onChange(newVal);
        }
    }

    hoverOn(){
        this.setState({hover:true});
    }
    hoverOff(){
        this.setState({hover:false});
    }

    render(){

        let {children, className, faIcon, icon, color, input, label, type} = this.props;
        if(!className){
            className = 'default'
        }
        let style = {};
        if( input.value === true){
            style = { ...style, color: "#ffffff", backgroundColor: color};
        }else if( this.state.hover ){
            style = { ...style, color: color, borderColor: color};
        }else{
            style = { ...style, color: "#dedede" };
        }
        let formControlClass = `${className}-input _input- _input-${className}`;

        return(
            <div className={`sb-form-group _group-${className}`}>
                {label && <label className={`${className}-label _label- _label-${className}`}>{label}</label>}
                <div style={input.disabled && ({"cursor" : "not-allowed"})}
                    className={`iconToggleField slideToggle ${input.value ? 'active' : 'inactive'} ${!input.disabled && this.state.hover && 'hover'}`}
                    data-tip={label} onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff} onClick={this.toggle}>
                    <span className="itf-icon"/>
                    {/*<ReactTooltip place="bottom" type="dark" effect="solid"/>*/}
                    <input className="hidden checkbox"
                           name={input.name}
                           value={input.value || false}
                           placeholder={label}
                           type={type || "checkbox"}/>
                </div>
                {children}
            </div>
        )
    }
}

class iconToggleField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value || this.props.defaultValue,
            hover: false,
        };

        this.toggle = this.toggle.bind(this);
        this.hoverOn = this.hoverOn.bind(this);
        this.hoverOff = this.hoverOff.bind(this);
    }

    toggle(){
        let newVal = !this.state.value;
        this.setState({value: newVal});
        this.props.setValue(newVal);
    }

    hoverOn(){
        this.setState({hover:true});
    }
    hoverOff(){
        this.setState({hover:false});
    }

    render(){

        let { faIcon, icon, color, input, input:{name, value, onChange}, label, type, meta: {touched, error, warning} } = this.props;
        let style = {};

        if( value == true || this.state.value == true ){
            style = { ...style, color: "#ffffff", backgroundColor: color};
        }else if( this.state.hover ){
            style = { ...style, color: color, borderColor: color};
        }else{
            style = { ...style, color: "#dedede" };
        }

        return(
            <div className={`iconToggleField ${value || this.state.value && 'active'} ${this.state.hover && 'hover'}`}
                 style={style} data-tip={label}
                 onMouseEnter={this.hoverOn} onMouseLeave={this.hoverOff}>
                <span className="itf-icon" onClick={this.toggle}>
                    <i className={`fa fa-${faIcon || "check"}`}/>
                </span>
                <ReactTooltip place="bottom" type="dark" effect="solid"/>
                <input className="hidden checkbox"
                       name={name}
                       value={value || this.state.value}
                       onChange={onChange}
                       placeholder={label}
                       type={type}/>
            </div>
        )
    }
}

class priceField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: "0"
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange({value}, e) {
        let price = this.props.isCents ? toCents(value) : value;
        this.props.input.onChange(price);
    }

    render() {
        let {className, options, currency, isCents, input:{name, value, onChange}, label, type, meta: {touched, error, warning}} = this.props;
        if(!className){
            className = 'default'
        }
        let formControlClass = `${className}-input _input- _input-${className}`;
        let price = isCents ?  (value/100) : value;
        let prefix = "$";
        if(!Intl.NumberFormat('en-US', { style: 'currency', currency: currency || (options.currency && options.currency.value) || "USD" }).formatToParts){
            prefix = getSymbolFromCurrency(currency || (options.currency && options.currency.value) || "USD");
        }else {
            let formatParts = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency || (options.currency && options.currency.value) || "USD"
            }).formatToParts(Number(price));
            prefix = formatParts[1].type === "literal" ? formatParts[0].value + formatParts[1].value : formatParts[0].value;
        }
        // console.log("PREFIX" prefix);
        return (
            <div className={`sb-form-group _group-${className}`}>
                {label && <label className={`${className}-label _label- _label-${className}`}>{label}</label>}
                <div className={`_input-container- _input-container-${className}`}>
                    <NumberFormat className={formControlClass} name={name}
                                  prefix={prefix} decimalSeparator="." thousandSeparator="," decimalScale="2"
                                  allowNegative={false}
                                  fixedDecimalScale={false}
                                  onValueChange={this.handleChange} value={price}
                    />
                    {touched && ((error && <span className="form-error">{error}</span>) || (warning &&
                        <span className="form-warning">{warning}</span>))}
                </div>
            </div>
        );
    };
}
priceField = connect(state => {
    return {
        options: state.options,
    }
})(priceField);

export {inputField, widgetField, selectField, OnOffToggleField, iconToggleField, priceField};
