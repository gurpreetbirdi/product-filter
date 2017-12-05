import React from 'react'
import $$ from 'jquery'
import { hashHistory } from "react-router"
import ApiCallManager from '../../../services/callmanager.jsx'
import AccountOffersLeftPanel from './../account_offers_leftpanel/account_offers_common'
import AccountOffersTabs from './../account_offers_leftpanel/account_offers_tabs'
import CMSContainer from './../../../containers/cmsContainer'
import AccountSaveDetails from './account_save_details'
import util from './../../../common/common'
import renderHTML from 'react-render-html'
import gState from './../globalstate/globalstate'
import InputText from './../../formcomponents/inputtext'
import validateRule from './../../formcomponents/validationrules'
import DisclosureComp from './../common_components/notice_nyc'
import PaymentDetailsDisclosure from './payment_details_disclosure'
import bootbox from './../../../common/bootbox'

require('./account_payment_details.scss')
var config = require('../../../../public/config.json')

class accountPaymentMethods extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isCreditCardEnable: true,
            isDebitCardEnabled: true,
            isBankAccountEnabled: true,
            isSavedMethodEnabled: true,
            email: '',
            password: '',
            pageLabels: null,
            confirmPassword: '',
            savedPaymentMethodList: [],
            paymentDetaildata: [],
            isCardValidated: false,
            intervalId: null,
            usStates: [],
            editCards: { status: false, DC: false, CC: false, checking: false }
        }
        this.pageLabels = {}
        this.enableUserRegister = this.enableUserRegister.bind(this)
        this.getPaymentDetaildata = this.getPaymentDetaildata.bind(this)
        this.getPaymentDetailSuccessCallback = this.getPaymentDetailSuccessCallback.bind(this)
        this.enableOrdisableToggle = this.enableOrdisableToggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClickPay = this.onClickPay.bind(this);
        this.getRegistrationSuccessCallback = this.getRegistrationSuccessCallback.bind(this);
        this.getCMSElements = this.getCMSElements.bind(this);
        this.onEnterCardNumber = this.onEnterCardNumber.bind(this);
        this.getValidateCardSuccessCallback = this.getValidateCardSuccessCallback.bind(this)
        this.onEnterRoutingNumber = this.onEnterRoutingNumber.bind(this)
        this.getValidateRoutingNumSuccessCallback = this.getValidateRoutingNumSuccessCallback.bind(this)
        this.getSavedPaymentMethod = this.getSavedPaymentMethod.bind(this)
        this.getPaymentMethodSuccessCallback = this.getPaymentMethodSuccessCallback.bind(this)
        this.cardMethod = this.cardMethod.bind(this)
        this.setType = this.setType.bind(this)
        this.checkingAccount = this.checkingAccount.bind(this)
        this.saveUserDetails = this.saveUserDetails.bind(this)
        this.validateCard = this.validateCard.bind(this)
        this.validateCheckingAccount = this.validateCheckingAccount.bind(this)
        this.getStates = this.getStates.bind(this)
        this.saveEditedMethod = this.saveEditedMethod.bind(this)
        this.getSelectedPaymentType = this.getSelectedPaymentType.bind(this)
        this.resetGlobalState = this.resetGlobalState.bind(this)
        this.getEditcardType = this.getEditcardType.bind(this)
    }
    getEditcardType(currentCard, editCardType) {
        if (currentCard == 'LD' && editCardType == 'LD') {
            return true
        } else if ((currentCard == 'CC' || currentCard == 'DC') && (editCardType == 'DC' || editCardType == 'CC')) {
            return true
        }
    }
    getStates() {
        let _this = this
        let obj = {
            url: config.baseUrl + "api/v0/consumer-states"
        }
        ApiCallManager.getCall(obj, function (res) {
            _this.setState({ 'usStates': res.data.data })
        }, function (res) {

        })
    }
    getCMSElements(val) {
        if (val.props.message.data.data) {
            let messageLbls = util.gethashmap('attributeName', val.props.message.data.data)
            this.setState({ pageLabels: messageLbls })
        }
    }
    cardMethod(cat, input) {
        clearInterval(window.intervalId)
        this.setState({ [cat]: input })
        var obj = gState.getNewState('cardMethod') || {}
        obj[cat] = obj[cat] ? obj[cat] : {}
        obj[cat] = input
        gState.setNewState('cardMethod', obj)
    }
    setType(cat, input) {
        this.setState({ [cat]: input })
        gState.setNewState(cat, input)
    }

    saveUserDetails(cat, input) {
        clearInterval(window.intervalId)
        this.setState({ [cat]: input })
        var obj = gState.getNewState('saveUserDetails') || {}
        obj[cat] = obj[cat] ? obj[cat] : {}
        obj[cat] = input
        gState.setNewState('saveUserDetails', obj)
    }

    checkingAccount(cat, input) {
        clearInterval(window.intervalId)
        this.setState({ [cat]: input })
        var obj = gState.getNewState('checkingAccount') || {}
        obj[cat] = obj[cat] ? obj[cat] : {}
        obj[cat] = input
        gState.setNewState('checkingAccount', obj)
    }
    componentWillMount() {
        // if(!gState.getNewState('tabnumber')) {
        //   hashHistory.push("/accountsummary");
        // }

    }
    enableOrdisableToggle() {
        var collapseAll = function (collpaseIndex) {
            $$('.card-selection').removeClass('bg-color');
            [1, 2, 3, 4].forEach(function (index) {
                let domEle = $$('#collapse' + index);
                if (collpaseIndex == index) {
                    domEle.collapse('show');
                } else {
                    domEle.collapse('hide');
                }
            });
            setTimeout(function () {
                util.popover()
            }, 2000)

        }
        $$('.toggle-user-reg-section').on('click', function (ev) {
            //  domEle.collapse('show');
        })
        $$('#one').on('click', function (ev) {
            collapseAll(1);
            $$(this).closest('.card-selection').addClass('bg-color')
        })

        $$('#two').on('click', function () {
            collapseAll(2);
            $$(this).closest('.card-selection').addClass('bg-color')
        })
        $$('#three').on('click', function () {
            collapseAll(3);
            $$(this).closest('.card-selection').addClass('bg-color')
        })
        $$('#four').on('click', function () {
            collapseAll(4);
            $$(this).closest('.card-selection').addClass('bg-color')
        })
    }
    resetGlobalState() {
        gState.setNewState('cardMethod', {})
        gState.setNewState('saveUserDetails', {})
        gState.setNewState('checkingAccount', {})
        gState.setNewState('cardDetails', {})
        gState.setNewState('routingDetails', {})
    }
    componentDidMount() {
        this.resetGlobalState()
        this.getPaymentDetaildata();
        this.getSavedPaymentMethod();
        util.popover()
        this.getStates()
        let editPlanObj = gState.getNewState()
        if (this.props.showCancleSave && editPlanObj.editedPaymentMethod && editPlanObj.editedPaymentMethod.accountPreference) {
            this.setState({ editCards: { status: true, CC: false, DC: false, checking: false } })
            if (editPlanObj.editedPaymentMethod.accountPreference && (editPlanObj.editedPaymentMethod.accountPreference.cardType == "DC" || editPlanObj.editedPaymentMethod.accountPreference.cardType == "CC")) {
                this.setState({ editCards: { status: true, CC: true, DC: true, checking: false } })
            } else {
                this.setState({ editCards: { status: true, CC: false, DC: false, checking: true } })
            }
        }
    }

    getSavedPaymentMethod() {
        let currentSelection = gState.getNewState('currentSelection') || {};
        if (Object.keys(currentSelection).length) {
            let accountNumber = currentSelection.MCMAcccountNumber;
            let type = currentSelection.type;

            const Obj = {
                url: config.baseUrl + config.savedPaymentMethodUrl + '?AccountNumber=' + accountNumber + '&IsExistingPaymentPlan=true&Platform=' + type
            }
            ApiCallManager.getCall(Obj, this.getPaymentMethodSuccessCallback)
        }
    }

    getPaymentMethodSuccessCallback(response) {
        this.setState({ savedPaymentMethodList: response.data && response.data.data && response.data.data.paymentMethodsList ? response.data.data.paymentMethodsList : [] })
    }
    enableUserRegister(e) {

    }

    onChange(e) {
        if (e.target.name === 'email') {
            this.setState({ email: e.target.value });
        }
        if (e.target.name === 'password') {
            this.setState({ password: e.target.value });
        }

        if (e.target.name === 'confirmPassword') {
            this.setState({ confirmPassword: e.target.value });
        }
    }
    validateCard(obj) {
        var returnObj = { status: true, msg: '' }
        let visted = 0;
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }

        for (let i in obj) {
            switch (i) {
                case "cardNumber":
                    visted++
                    returnObj = !(validateRule.card(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_69', pageLabels) } : ''
                    if (!returnObj.status) {
                        this.onEnterCardNumber(obj[i])
                    }
                    break;
                case "cardFirstName":
                    visted++
                    returnObj = !(validateRule.cardLastName(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_70', pageLabels) } : ''
                    break;
                case "cardLastName":
                    visted++
                    returnObj = !(validateRule.cardLastName(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_70', pageLabels) } : ''
                    break;
                case "expiryDate":
                    visted++
                    returnObj = !(validateRule.expiryDate(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_71', pageLabels) } : ''
                    break;
                    // case "cvv":
                    // visted++
                    // returnObj = !(validateRule.cvv(obj[i])) ? {status: false, msg: 'Please enter valid CVV!'} : ''
                    break;
            }
        }
        if (visted != 4) {
            returnObj = { status: false, msg: util.getLabelString('lbl_validation_msg_72', pageLabels) }
        }
        return returnObj
    }
    validateCheckingAccount(obj) {
        var returnObj = { status: true, msg: '' }
        let visted = 0;
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }

        for (let i in obj) {
            switch (i) {
                case "routingNumber":
                    visted++
                    returnObj = !(validateRule.rNumber(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_73', pageLabels) } : ''
                    if (!returnObj.status) {
                        this.onEnterRoutingNumber(obj[i])
                    }
                    break;
                case "accountNumber":
                    visted++
                    returnObj = !(validateRule.mcmAccountNumber(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_74', pageLabels) } : ''
                    break;
                case "billingAddress":
                    visted++
                    returnObj = !(validateRule.billAddress(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_75', pageLabels) } : ''
                    break;
                case "billingCity":
                    visted++
                    returnObj = !(validateRule.billCity(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_76', pageLabels) } : ''
                    break;
                case "zipCode":
                    visted++
                    returnObj = !(validateRule.billZip(obj[i])) ? { status: false, msg: util.getLabelString('lbl_validation_msg_77', pageLabels) } : ''
                    break;
                case "billState":
                    visted++
                    returnObj = !obj[i] ? { status: false, msg: util.getLabelString('lbl_validation_msg_78', pageLabels) } : ''
                    break;
            }
        }
        if (visted != 6) {
            returnObj = { status: false, msg: util.getLabelString('lbl_validation_msg_79', pageLabels) }
        }
        return returnObj
    }
    getSelectedPaymentType(obj) {
        var finalObj = {}
        if (obj.selectedType == 'checkingaccount') {
            finalObj = { checkDetails: {} }
            finalObj.checkDetails['routingNumber'] = obj.checkingAccount.routingNumber
            finalObj.checkDetails['bankAccountNumber'] = obj.checkingAccount.accountNumber
            finalObj.checkDetails['bankName'] = obj.routingDetails.bankName
            finalObj.checkDetails['address1'] = obj.checkingAccount.billingAddress
            finalObj.checkDetails['state'] = obj.checkingAccount.billState
            finalObj.checkDetails['city'] = obj.checkingAccount.billingCity
            finalObj.checkDetails['zipCode'] = obj.checkingAccount.zipCode
            finalObj["paymentMethodType"] = obj.routingDetails.paymentMethodType
            finalObj["saveThisMethod"] = obj.checkingAccount.checksavedetail
            finalObj["id"] = null
        } else if (obj.selectedType == 'card') {
            finalObj = { cardDetails: {} }
            finalObj.cardDetails['cardNumber'] = obj.cardMethod.cardNumber
            finalObj.cardDetails['cardFirstName'] = obj.cardMethod.cardFirstName.trim()
            finalObj.cardDetails['cardName'] = obj.cardMethod.cardFirstName
            finalObj.cardDetails['cardLastName'] = obj.cardMethod.cardLastName.trim()
            finalObj.cardDetails['expiryMonth'] = obj.cardMethod.expiryDate
            finalObj.cardDetails['cardGroupType'] = obj.cardDetails.cardGroupType
            finalObj["paymentMethodType"] = obj.cardDetails.paymentMethodType
            finalObj["saveThisMethod"] = obj.cardMethod.checksavedetail
            finalObj["id"] = null
        } else {
            if (obj.savedMethod && obj.savedMethod.cardDetails) {
                finalObj = obj.savedMethod
            } else if (obj.savedMethod && obj.savedMethod.checkDetails) {
                finalObj = obj.savedMethod
            }
        }
        finalObj["consumerName"] = JSON.parse(localStorage.mcmcgobj).user
        return finalObj
    }
    saveEditedMethod() {
        let gobj = gState.getNewState()
        let editPlan = {
            existingPlanPaymentMethod: gobj.editedPaymentMethod,
            mcmAccountNumber: gobj.currentSelection.MCMAcccountNumber,
            paymentMethod: this.getSelectedPaymentType(gobj),
            transactions: [gobj.editedPlan],
            consumerName: localStorage.mcmcgobj ? JSON.parse(localStorage.mcmcgobj).user : ''
        }
        const Obj = {
            url: config.baseUrl + config.updatePaymentMethod + '?Platform=' + gobj.currentSelection.type
        }
        Obj.body = editPlan
        ApiCallManager.putCall(Obj, function (res) {
            hashHistory.push("/viewpaymentplan");
            gState.setNewState('saveSuccessObj', true);
        })

    }
    onClickPay(e, isEditMode) {
        // if ($$('p.invalid').length) {
        //   // If any error validation in page we will not allow to submit page
        //    return false
        // }
        console.log(this.state);
        let pageLabels = {}
        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }

        var gobj = gState.getNewState()
        if (gobj.selectedType == 'card') {
            let vCard = gobj.cardMethod && this.validateCard(gobj.cardMethod)
            if (vCard == 'undefined' || (Object.keys(vCard).length && !vCard.status)) {
                bootbox.alert({
                    message: vCard ? vCard.msg : util.getLabelString('lbl_validation_msg_80', pageLabels),
                    size: 'small',
                    type: "error",
                    callback: function (result) {
                        //_this.setState('routingNumber', "");
                    }
                })
            } else {
                let _this = this
                if (_this.state.isCardValidated) {
                    if (isEditMode) {
                        this.saveEditedMethod()
                    } else {
                        hashHistory.push("/acctreviewdetails");
                    }
                }
            }
        } else if (gobj.selectedType == 'checkingaccount') {
            let vCard = gobj.checkingAccount && this.validateCheckingAccount(gobj.checkingAccount)
            if (vCard == 'undefined' || (Object.keys(vCard).length && !vCard.status)) {
                bootbox.alert({
                    message: vCard ? vCard.msg : util.getLabelString('lbl_validation_msg_81', pageLabels),
                    size: 'small',
                    type: "error",
                    callback: function (result) {
                        //_this.setState('routingNumber', "");
                    }
                })
            } else {
                let _this = this
                if (_this.state.isCardValidated) {
                    if (isEditMode) {
                        this.saveEditedMethod()
                    } else {
                        hashHistory.push("/acctreviewdetails");
                    }
                }
            }
        } else if (gobj.selectedType == 'savedmethod') {
            if (!gobj.savedMethod) {
                bootbox.alert({
                    message: util.getLabelString('lbl_validation_msg_82', pageLabels),
                    size: 'small',
                    type: "error",
                    callback: function (result) {
                        //_this.setState('routingNumber', "");
                    }
                })
            } else {
                if (isEditMode) {
                    this.saveEditedMethod()
                } else {
                    hashHistory.push("/acctreviewdetails");
                }
            }
        } else {
            bootbox.alert({
                message: util.getLabelString('lbl_validation_msg_82', pageLabels),
                size: 'small',
                type: "error",
                callback: function (result) {
                    //_this.setState('routingNumber', "");
                }
            })
        }
    }

    getRegistrationSuccessCallback(response) {
        //  alert("succesfully registered");
    }

    getPaymentDetaildata() {
        this.getPaymentDetailSuccessCallback()
    }

    getPaymentDetailSuccessCallback(response) {
        this.enableOrdisableToggle()
        let paymentData = localStorage.getItem('featureToggleList') ? JSON.parse(localStorage.getItem('featureToggleList')) : {};
        this.setState({ isBankAccountEnabled: paymentData['CHECKING_ACCOUNT'] ? paymentData['CHECKING_ACCOUNT'].enabled : true, isDebitCardEnabled: paymentData.DEBIT_CARD ? paymentData.DEBIT_CARD.enabled : true, isCreditCardEnable: paymentData['CREDIT_CARD'] ? paymentData['CREDIT_CARD'].enabled : true });
        this.enableOrdisableToggle();
    }
    gotoSummaryPage(e) {
        hashHistory.push("/accountsummary")
    }

    onEnterCardNumber(input) {
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }
        if (!validateRule.card(input)) {
            return false;
        }
        let platform = gState.getNewState('currentSelection') || {}
        let cardNumber = input.substring(0, 6)
        let data = {
            "cardNumber": cardNumber
        }
        const Obj = {
            url: config.baseUrl + config.validateCardUrl + '?Platform=' + platform.type,
            body: data
        }
        let _this = this;
        ApiCallManager.postCall(Obj, this.getValidateCardSuccessCallback, function (response) {
            if (!response.response || !response.response.data.data || !Object.keys(response.response.data.data).length) {
                _this.setState({ isCardValidated: false })
                bootbox.alert({
                    message: response.response.data.status.message ? response.response.data.status.message : util.getLabelString('lbl_validation_msg_83', pageLabels),
                    size: 'small',
                    type: "error",
                    callback: function (result) {
                        //_this.setState('routingNumber', "");
                    }
                })
            }
        })

    }

    getValidateCardSuccessCallback(response) {
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }
        let _this = this;
        if (!response.data.data) {
            _this.setState({ isCardValidated: false })
            bootbox.alert({
                message: response.data.status.message ? response.data.status.message : util.getLabelString('lbl_validation_msg_83', pageLabels),
                size: 'small',
                type: "error",
                callback: function (result) {
                    //_this.setState('routingNumber', "");
                }
            })
        } else {
            _this.setState({ isCardValidated: true })
            gState.setNewState('cardDetails', response.data.data)
        }
    }

    onEnterRoutingNumber(input) {
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }
        if (!validateRule.rNumber(input)) {
            return false;
        }
        let platform = gState.getNewState('currentSelection') || {}
        let data = {
            "routingNumber": input
        }
        const Obj = {
            url: config.baseUrl + config.validateRoutingNumber + '?Platform=' + platform.type,
            body: data
        }
        ApiCallManager.postCall(Obj, this.getValidateRoutingNumSuccessCallback, function (error) {
            bootbox.alert({
                message: util.getLabelString('lbl_validation_msg_84', pageLabels),
                size: 'small',
                type: "error",
                callback: function (result) {
                    //_this.setState('routingNumber', "");
                }
            })
        })
    }

    getValidateRoutingNumSuccessCallback(response) {
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }
        let _this = this;
        if (!response.data.data || !response.data.data.valid) {
            _this.setState({ isCardValidated: false })
            bootbox.alert({
                message: response.data.status ? response.data.status.message : util.getLabelString('lbl_validation_msg_84', pageLabels),
                size: 'small',
                type: "error",
                callback: function (result) {
                    //_this.setState('routingNumber', "");
                }
            })
        } else {
            _this.setState({ isCardValidated: true })
            gState.setNewState('routingDetails', response.data.data)
        }
    }

    render() {
        let pageLabels = {}

        if (this.state.pageLabels) {
            pageLabels = this.state.pageLabels
        }
        let showDebitCredit = false
        let showDebitCard = false
        let showCreditCard = false
        let creditCardStatus = this.state.isCreditCardEnable;
        let showSavePaymentCheckbox = true
        let showSavedPaymentMethods = true
        let checking = false
        let usStates = this.state.usStates
        let currentSelection = gState.getNewState('currentSelection') || {};
        let type = currentSelection.type && currentSelection.type;

        let selectedData = gState.getNewState('selectedData') || {};
        let savedPaymentMethod = this.state.savedPaymentMethodList;

        if (this.state.isDebitCardEnabled && this.state.isCreditCardEnable && type != 'COGENT') {
            showDebitCredit = true
        } else {
            showDebitCredit = false
        }

        if (this.state.isDebitCardEnabled) {
            showDebitCard = true;
        }
        if (this.state.isCreditCardEnable) {
            showCreditCard = true;
        }
        if (this.state.isBankAccountEnabled) {
            checking = true
        }

        if (this.state.editCards.status) {
            showDebitCard = false
            creditCardStatus = false
            checking = false
            if (this.state.editCards.DC) {
                showDebitCard = true
                creditCardStatus = false
            }
            if (this.state.editCards.CC) {
                showDebitCard = true
                creditCardStatus = true
            }
            if (this.state.editCards.checking) {
                checking = true
            }
        }
        if (type == 'COGENT') {
            creditCardStatus = false;
            if (this.state.isDebitCardEnabled) {
                showDebitCard = true
            } else {
                showDebitCard = false
            }
            showSavePaymentCheckbox = false
            showSavedPaymentMethods = false
        }

        let editPlanObj = gState.getNewState()
        let isEditCardEnabled = { card: false, checking: false }
        if (this.props.showCancleSave && editPlanObj.editedPaymentMethod && editPlanObj.editedPaymentMethod.accountPreference) {
            let editCardsObj = editPlanObj.editedPaymentMethod.accountPreference
            isEditCardEnabled.card = showDebitCard = editCardsObj.cardType
            if (!isEditCardEnabled.card) {
                isEditCardEnabled.card = editCardsObj.paymentMethodType
            }
            //isEditCardEnabled.checking = checking = editCardsObj.paymentMethodType
        }
        return (
            <div className='accounts-payment-details-main'>
                <CMSContainer callParent={this.getCMSElements} />
                <div className="">
                    <div className="panel-heading detail-box">
                        <p className="title-heading">{util.getLabelString('lbl_select_pay_method', pageLabels)}</p>
                        <p className="detail-box-info">{util.getLabelString('lbl_pls_sel_pay_methopd', pageLabels)}</p>
                    </div>
                    <div className="card-section credit-card accordion-option" id="accordion">
                        {(creditCardStatus || showDebitCard) &&
                            <div className="panel panel-default card-selection">
                                <div className="panel-body">
                                    <div className='panel'>
                                        <div className="panel-heading">
                                            <div className="radio">
                                                <div className="row">
                                                    <div className="col-md-6 col-xs-12 text-left">
                                                        <label htmlFor='one'>
                                                            <input type='radio' id='one' onClick={(input) => { this.setType("selectedType", 'card') }} name='optradio' defaultValue='Working' required />
                                                            {showDebitCredit ? <p className="card-title">{util.getLabelString('lbl_pay_credit_card', pageLabels)}
                                                                &nbsp;&nbsp;/&nbsp;&nbsp;{util.getLabelString('lbl_pay_debit_card', pageLabels)}
                                                            </p> : showDebitCard ? <p className="card-title">{util.getLabelString('lbl_pay_debit_card', pageLabels)}
                                                            </p> : showCreditCard && <p className="card-title">{util.getLabelString('lbl_pay_credit_card', pageLabels)}
                                                            </p>
                                                            }
                                                            <p className="card-sub-title">
                                                                {util.getLabelString('lbl_credit_msg', pageLabels)}
                                                            </p>
                                                        </label>
                                                    </div>
                                                    <div className="col-md-6 hidden-xs text-right">
                                                        <i className="fa fa-cc-visa fa-icons-relative" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;
                                     <i className="fa fa-cc-mastercard fa-icons-relative" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="panelbox panel-body" >
                                            <div id="collapse1" className="panel-collapse collapse">
                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="card-number" className="payment-method-labels control-label">{util.getLabelString('lbl_credit_card_num', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="card" name='card' id='card' className="form-control" placeholder={util.getLabelString('lbl_credit_card_placeholder', pageLabels)} callback={(input) => { this.cardMethod("cardNumber", input); this.onEnterCardNumber(input) }} />
                                                                <i className="fa fa-credit-card card-icons fa-icons-relative" aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="card-name" className="payment-method-labels control-label">{util.getLabelString('lbl_pay_card_firstname', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="cardName" name='cardLastName' id='cardName' className="form-control" placeholder={util.getLabelString('lbl_credit_name_placeholder', pageLabels)} callback={(input) => { this.cardMethod("cardFirstName", input) }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label htmlFor="card-name" className="payment-method-labels control-label">{util.getLabelString('lbl_pay_card_lastname', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="cardName" name='cardLastName' id='cardName' className="form-control" placeholder={util.getLabelString('lbl_credit_name_placeholder', pageLabels)} callback={(input) => { this.cardMethod("cardLastName", input) }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-xs-6">
                                                            <div className="form-group">
                                                                <label htmlFor="card-expiry-date" className="payment-method-labels control-label">{util.getLabelString('lbl_credit_exp_date', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="expiryDate" name='expiryDate' id='expiryDate' className="form-control" placeholder={util.getLabelString('lbl_credit_date_placeholder', pageLabels)} callback={(input) => { this.cardMethod("expiryDate", input) }} />
                                                                <i className="fa fa-question-circle-o card-icons" data-container="body" data-toggle="popover" data-placement="top" data-content={"<b>" + util.getLabelString('lbl_expiry_date_msg', pageLabels) + "</b><br/>" + util.getLabelString('lbl_expiry_date_msg2', pageLabels)} aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                        {/*<div className="col-md-6 col-xs-6">
                                        <div className="form-group">
                                          <label htmlFor="card-cvv" className="payment-method-labels control-label">{util.getLabelString('lbl_credit_cvv', pageLabels)}</label>
                                            <InputText  errorplacement=".form-group" type="cvv" name='cvv' id='cvv' className="form-control" placeholder={util.getLabelString('lbl_credit_cvv_placeholder', pageLabels)} callback={(input) => {this.cardMethod("cvv", input)}}/>
                                          <i className="fa fa-question-circle-o card-icons fa-icons-relative" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." aria-hidden="true"></i>
                                        </div>
                                      </div>*/}
                                                    </div>
                                                    {
                                                        showSavePaymentCheckbox && <div className='row checkbox-row'>
                                                            <div className="col-md-12">
                                                                <input type="checkbox" onClick={(input) => { this.cardMethod("checksavedetail", input.target.checked) }} />&nbsp;&nbsp;&nbsp;{util.getLabelString('lbl_save_detail_pay_method', pageLabels)}
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                                {!this.state.editCards.status ?
                                                    <AccountSaveDetails isexpand="true" category="creditcard" />
                                                    : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {checking && <div className="panel panel-default  card-selection">
                            <div className="panel-body">
                                <div>
                                    <div className="panel-heading">
                                        <div className="radio">
                                            <div className="row">
                                                <div className="col-md-6 col-xs-12 text-left">
                                                    <label htmlFor='three'>
                                                        <input type='radio' id='three' onClick={(input) => { this.setType("selectedType", 'checkingaccount') }} name='optradio' defaultValue='Working' required />
                                                        <p className="card-title">
                                                            {util.getLabelString('lbl_pay_check_acc', pageLabels)}
                                                        </p>
                                                        <p className="card-sub-title">
                                                            {util.getLabelString('lbl_checking_acc_msg', pageLabels)}
                                                        </p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6 hidden-xs text-right">
                                                    <i className="fa fa-credit-card-alt" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panelbox panel-body">
                                        <div id="collapse3" className="panel-collapse collapse">
                                            <div>
                                                <div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="card-number" className="payment-method-labels control-label">{util.getLabelString('lbl_check_acc_routing_num', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="rNumber" name='rNumber' id='rNumber' className="form-control" placeholder={util.getLabelString('lbl_check_acc_routing_placeholder', pageLabels)} callback={(input) => { this.checkingAccount("routingNumber", input); this.onEnterRoutingNumber(input) }} />
                                                                <i className="fa fa-question-circle-o card-icons fa-icons-relative" data-container="body" data-toggle="popover" data-placement="top" data-content={"<b>" + util.getLabelString('lbl_routing_num_msg', pageLabels) + "</b><br>" + util.getLabelString('lbl_routing_num_msg2', pageLabels)} aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="card-number" className="payment-method-labels control-label">{util.getLabelString('lbl_check_acc_num', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="accNumber" name='accNumber' id='accNumber' className="form-control" placeholder={util.getLabelString('lbl_check_acc_num_placeholder', pageLabels)} callback={(input) => { this.checkingAccount("accountNumber", input) }} />
                                                                <i className="fa fa-question-circle-o card-icons fa-icons-relative" data-container="body" data-toggle="popover" data-placement="top" data-content={"<b>" + util.getLabelString('lbl_checking_acc_info_msg', pageLabels) + "</b><br>" + util.getLabelString('lbl_checking_acc_info_msg2', pageLabels)} aria-hidden="true"></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="card-number" className="payment-method-labels control-label">{util.getLabelString('lbl_check_billing_addre', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="billAddress" name='billAddress' id='billAddress' className="form-control" placeholder={util.getLabelString('lbl_check_billing_placeholder', pageLabels)} callback={(input) => { this.checkingAccount("billingAddress", input) }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-xs-6 ">
                                                            <div className="form-group">
                                                                <label htmlFor="card-expiry-date" className="payment-method-labels">{util.getLabelString('lbl_check_acc_city', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="billCity" name='billCity' id='billCity' className="form-control" placeholder={util.getLabelString('lbl_check_acc__city_placeholder', pageLabels)} callback={(input) => { this.checkingAccount("billingCity", input) }} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-xs-6">
                                                            <div className="form-group">
                                                                <label htmlFor="card-cvv" className="payment-method-labels">{util.getLabelString('lbl_check_acc_state', pageLabels)}</label>
                                                                <select className="form-control" defaultValue="1" onChange={(input) => { this.checkingAccount("billState", input.target.value) }}>
                                                                    <option disabled value="1">Select</option>
                                                                    {usStates.map((item, index) => {
                                                                        return <option key={index} value={item.code} defaultValue={item.code}>{item.name}</option>
                                                                    })}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 col-xs-8">
                                                            <div className="form-group">
                                                                <label htmlFor="card-number" className="payment-method-labels control-label">{util.getLabelString('lbl_check_acc_zipcode', pageLabels)}</label>
                                                                <InputText errorplacement=".form-group" type="billZip" name='billZip' id='billZip' className="form-control" placeholder={util.getLabelString('lbl_check_acc_zipcode_placeholder', pageLabels)} callback={(input) => { this.checkingAccount("zipCode", input) }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        showSavePaymentCheckbox && <div className="row checkbox-row">
                                                            <div className="col-md-6 ">
                                                                <input type="checkbox" onClick={(input) => { this.checkingAccount("checksavedetail", input.target.checked) }} />&nbsp;&nbsp;&nbsp;{util.getLabelString('lbl_save_detail_pay_method', pageLabels)}
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            {!this.state.editCards.status ?
                                                <AccountSaveDetails isexpand category="checkingaccount" />
                                                : ''
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                        {this.state.isSavedMethodEnabled && showSavedPaymentMethods && <div className="panel panel-default  card-selection">
                            <div className="panel-body">
                                <div>
                                    <div className="panel-heading">
                                        <div className="radio">
                                            <div className="row">
                                                <div className="col-md-6 col-xs-12 text-left">
                                                    <label htmlFor='four'>
                                                        <input type='radio' id='four' onClick={(input) => { this.setType("selectedType", 'savedmethod') }} name='optradio' defaultValue='Working' required />
                                                        <p className='card-title'>
                                                            {util.getLabelString('lbl_save_payment', pageLabels)}
                                                        </p>
                                                        <p className="card-sub-title">
                                                            {util.getLabelString('lbl_save_method_before', pageLabels)}
                                                        </p>
                                                    </label>
                                                </div>
                                                <div className="col-md-6 hidden-xs text-right">
                                                    <i className="fa fa-history" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panelbox1 panel-body">
                                        <div id="collapse4" className="panel-collapse collapse">
                                            <div>
                                                <table className="table table-striped act-summary-striped-table">
                                                    <tbody>
                                                        {
                                                            savedPaymentMethod.length > 0 &&
                                                            savedPaymentMethod.map((v, i) => {
                                                                if (!this.props.showCancleSave || (this.getEditcardType(v.paymentMethodType, isEditCardEnabled.card))) {
                                                                    return <tr key={i}>
                                                                        <td width="50%" className="text-left">
                                                                            <label htmlFor="three">
                                                                                <input type="radio" onClick={(input) => { this.setType("savedMethod", v) }} name="optradio1" defaultValue="Working" required="" />{v.paymentType}
                                                                                &nbsp;&nbsp; {v.paymentMethodName}
                                                                            </label>
                                                                        </td>
                                                                        <td width="50%" className="text-right bld-cards">
                                                                            {v.cardDetails ? v.cardDetails.cardMaskedNumber : v.checkDetails ? v.checkDetails.maskedBankAccountNum : ''}
                                                                        </td>
                                                                    </tr>
                                                                } else {
                                                                    return <div key={i}>No saved method available.</div>
                                                                }
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div className="panel panel-default ">
                            <div className="panel-body pay-btn-panel">
                                {this.props.showCancleSave ? <div className="row">
                                    <div className="col-md-12 payment-button-row">
                                        <input type="button" value={util.getLabelString('lbl_acc_pay_plan_cancel', pageLabels)} onClick={() => hashHistory.push("/viewpaymentplan")} className="btn btn-round pay-btn" />&nbsp;&nbsp;&nbsp;
                              <input type="button" value={util.getLabelString('lbl_acc_pay_plan_save', pageLabels)} onClick={() => this.onClickPay(this, "editMode")} className="btn btn-round pay-btn" />
                                    </div>
                                </div> : <div className="row">
                                        <div>{util.getLabelString('lbl_pay_details_pay_msg', pageLabels)}</div>
                                        <div className="col-md-12 payment-button-row">
                                            <input type="button" value={util.getLabelString('lbl_save_detail_pay_btn', pageLabels)} onClick={() => this.onClickPay()} className="btn btn-round pay-btn btn-block" />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-body">
                    <div className="row">
                        <div className="col-md-12 payment-details-message">
                            {
                                type == "COGENT" ? <p>
                                    {util.getLabelString('lbl_disclosure10', pageLabels)}
                                </p> : selectedData.offerType == "MULTIPLE" ? <p>
                                    {util.getLabelString('lbl_disclosure9', pageLabels)}
                                </p> : <p>
                                            {util.getLabelString('lbl_disclosure4', pageLabels)}
                                        </p>
                            }
                        </div>
                    </div>
                    <DisclosureComp />
                    <PaymentDetailsDisclosure type={type} />
                </div>
            </div>
        )
    }
}

export default accountPaymentMethods
