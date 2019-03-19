import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

class Autocomplete extends Component {

    static propTypes = {
        options: PropTypes.instanceOf(Array).isRequired
    };

    state = {
        activeOption: 0,
        filteredOptions: [],
        showOptions: false,
        userInput: ''
    };


    optionList = () => {

        const {showOptions, userInput, filteredOptions} = this.state;

        if (showOptions && userInput) {

            if (!filteredOptions.length) {
                return (
                    <OptionUl className="no-options">
                        <li>No Option!</li>
                    </OptionUl>
                )
            }

            return (
                <OptionUl>
                    {
                        filteredOptions.map(option => (
                            <OptionLi
                                title={option.description}
                                key={option._id}
                                onClick={() => this.onClick(option)}
                            >
                                <OptionH4>
                                    {option.name}
                                </OptionH4>
                                <OptionP>
                                    {option.description}
                                </OptionP>
                                <OptionDate>
                                    { moment(option.createdAt).format('MM/DD/YYYY') }
                                </OptionDate>
                            </OptionLi>
                        ))
                    }

                </OptionUl>
            )
        }
    };

    onClick = option => {
        const {selectInAutocomplete} = this.props;
        this.setState({
            showOptions: false,
            userInput: ''
        });

        selectInAutocomplete(option.date);
    };

    onChange = e => {
        const { options } = this.props;
        const userInput = e.target.value;

        const filteredOptions = options.filter(option => option.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1);

        this.setState({
            activeOption: 0,
            filteredOptions,
            showOptions: true,
            userInput
        });
    };

    onKeyDown = (e) => {
        const { activeOption, filteredOptions } = this.state;

        if (e.keyCode === 13) {
            this.setState({
                activeOption: 0,
                showSuggestions: false,
                userInput: filteredOptions[activeOption]
            });
        } else if (e.keyCode === 38) {
            if (activeOption === 0) {
                return;
            }

            this.setState({ activeOption: activeOption - 1 });
        } else if (e.keyCode === 40) {
            if (activeOption - 1 === filteredOptions.length) {
                return;
            }

            this.setState({ activeOption: activeOption + 1 });
        }
    };


    render() {
        const {userInput} = this.state;
        return (
            <div className="input-group mb-0">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Шукати події..."
                    value={userInput}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                <div className="input-group-append">
                    <span className="input-group-text">
                        <i className="zmdi zmdi-search" />
                    </span>
                    { this.optionList() }
                </div>
            </div>
        );
    }
}


const OptionUl = styled.div`
  position: absolute;
  max-height: 300px;
  overflow-y: auto;
  background-color: #fff;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10; 
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: left;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
`;

const OptionH4 = styled.div`
  font-size: 16px;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  margin: 0;
  text-transform: capitalize;
  overflow: hidden;
`;

const OptionLi = styled.div`
  padding: 7px; 
  border-bottom: 1px solid #eee;
  cursor: pointer; 
  &:hover {
    background-color: #eee;
    transition: background-color 300ms ease;
  } 
`;

const OptionP = styled.div`
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #acacac; 
`;

const OptionDate = styled.div`
  color: #313740; 
  font-size: 11px;
`;



Autocomplete.propTypes = {
    options: PropTypes.instanceOf(Array).isRequired
};

export default Autocomplete;