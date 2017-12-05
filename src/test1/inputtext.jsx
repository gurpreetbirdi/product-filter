import React from 'react'
import $$ from 'jquery'
import './commonvalidation.scss'
import validForm from './validationrules'
import util from './../../common/common'

class InputText extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            pageLabel: "",
            message: ""
        }
    }
    handleChange(e) {
        var setErroNode = function (event, _this, message) {
            let errorMsg = message
            if (!$$(event.target).parents(_this.props.errorplacement).next('p.invalid').length) {
                $$(event.target).parents(_this.props.errorplacement).after('<p class="invalid">' + errorMsg + '</p>')
                if (_this.props.errorBorderPlacement) {
                    $$(event.target).parents(_this.props.errorBorderPlacement).addClass('invalid-bdr')
                } else {
                    $$(event.target).parents(_this.props.errorplacement).addClass('invalid-bdr')
                }
            } else {
                $$(event.target).parents(_this.props.errorplacement).next('p.invalid').remove()
                if (_this.props.errorBorderPlacement) {
                    $$(event.target).parents(_this.props.errorBorderPlacement).removeClass('invalid-bdr')
                } else {
                    $$(event.target).parents(_this.props.errorplacement).removeClass('invalid-bdr')
                }
                $$(event.target).parents(_this.props.errorplacement).after('<p class="invalid">' + errorMsg + '</p>')
                if (_this.props.errorBorderPlacement) {
                    $$(event.target).parents(_this.props.errorBorderPlacement).addClass('invalid-bdr')
                } else {
                    $$(event.target).parents(_this.props.errorplacement).addClass('invalid-bdr')
                }
            }
            _this.props.callback(e.target.value)
        }
        var removeErrorNode = function (event, _this) {
            $$(e.target).parents(_this.props.errorplacement).next('p.invalid').remove()
            if (_this.props.errorBorderPlacement) {
                $$(event.target).parents(_this.props.errorBorderPlacement).removeClass('invalid-bdr')
            } else {
                $$(event.target).parents(_this.props.errorplacement).removeClass('invalid-bdr')
            }
            _this.props.callback(e.target.value)
        }

        let st = {}
        switch (this.props.name) {
            case 'ssn':
                st = validForm.ssn(e.target.value)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'multiplepayment':
                if (!validForm.multiplepayment(e.target.value, this.props.months, this.props.offertype)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_50'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'card':
                if (!validForm.card(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_51'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'bespoke':
                st = validForm.bespoke(e.target.value, this.props.gfamount, this.props.minimum)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'phone':
                st = validForm.phone(e.target.value, e.target.id)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'homephone':
                st = validForm.homephone(e.target.value, e.target.id)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'cellphone':
                st = validForm.cellphone(e.target.value, e.target.id)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'workphone':
                st = validForm.workphone(e.target.value, e.target.id)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'address1':
            case 'address2':
                st = validForm.billAddress(e.target.value, e.target.id)
                if (!st) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_85'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'city':
                st = validForm.billCity(e.target.value, e.target.id)
                if (!st) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_86'))

                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'postalCode':
                st = validForm.billZip(e.target.value, e.target.id)
                if (!st) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_87'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'username':
            case 'email':
                if (this.props.name === 'username' || this.props.name.indexOf('email') === 0) {
                    if (!validForm.email(e.target.value)) {
                        setErroNode(e, this, util.getErrorString('lbl_validation_msg_53'))
                    } else {
                        removeErrorNode(e, this)
                    }
                }
                break;
            case 'mcmno':
                st = validForm.mcmAccountNumber(e.target.value)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'cardName':
                if (!validForm.cardName(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_55'))
                } else {
                    removeErrorNode(e, this)
                }
            case 'cardLastName':
                if (!validForm.cardLastName(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_55'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'cvv':
                if (!validForm.cvv(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_56'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'expiryDate':
                if (!validForm.expiryDate(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_57'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'rNumber':
                if (!validForm.rNumber(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_58'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'accNumber':
                st = validForm.mcmAccountNumber(e.target.value)
                if (!st.status) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_59'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'billAddress':
                if (!validForm.billAddress(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_60'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'billCity':
                if (!validForm.billCity(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_61'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'billZip':
                if (!validForm.billZip(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_62'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'lastname':
                if (!validForm.lastName(e.target.value)) {
                    setErroNode(e, this, util.getErrorString('lbl_validation_msg_63'))
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'dobmonth':
                st = validForm.month(e.target.value)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;
            case 'dobyear':
                st = validForm.year(e.target.value)
                if (!st.status) {
                    setErroNode(e, this, st.msg)
                } else {
                    removeErrorNode(e, this)
                }
                break;

        }
    }
    render() {
        return (
            <input type="text" name={this.props.name} id={this.props.id} className={this.props.className} value={this.props.value} placeholder={this.props.placeholder} onChange={this.handleChange} />
        )
    }
}

export default InputText
