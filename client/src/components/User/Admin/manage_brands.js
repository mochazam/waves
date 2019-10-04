import React, { Component } from 'react';

import FormField from '../../utils/Form/formfield';
import { update, generateData, isFormValid, resetFields } from '../../utils/Form/formActions';

import {connect} from 'react-redux';
import { getBrands, addBrand } from '../../../actions/products_actions';
import { isNullOrUndefined } from 'util';


class ManageBrands extends Component {

    state = {
        formError:false,
        formSuccess:false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config:{
                    label: 'Brand name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the brand'
                },
                validation:{
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage:'',
                showlabel: true
            },
        }
    }

    showCategoryItems = () => (
        this.props.products.brands ?
            this.props.products.brands.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :null

    )

    componentDidMount() {
        this.props.dispatch(getBrands());
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'brands');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFieldsHandler = () => {
        const newFormData = resetFields(this.state.formdata, 'brands');

        this.setState({
            formdata: newFormData,
            formSuccess: true
        });
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'brands');
        let formIsValid = isFormValid(this.state.formdata, 'brands');
        let existingBrands = this.props.products.brands;

        if(formIsValid) {
           // console.log(dataToSubmit);
            this.props.dispatch(addBrand(dataToSubmit, existingBrands)).then(response => {
                if(response.payload.success){
                    this.resetFieldsHandler();
                } else {
                    this.setState({
                        formError: true
                    })
                }
            })
        } else {
            this.setState({
                formError: true
            });
        }
        
    }

    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        
                        <form onSubmit={(event) => this.submitForm(event)}>

                            <FormField 
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />

                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>
                            :null
                            }

                            { this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                </div>
                            : null }
                            <button onClick={(event) => this.submitForm(event)}>
                                Add Brand
                            </button>

                        </form>

                    </div>
                </div>
            </div>
        )
    }
}

// for inject state to through component
const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrands);