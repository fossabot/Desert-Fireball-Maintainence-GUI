import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const OuterDiv = styled.div`
    display: inline-block;
    font: 13px sans-serif;
    position: relative;
    width: 100%;
`;

const TextField = styled.input`
    width: 100%;
    padding: 9px 12px;
    font: inherit;
    box-sizing: border-box;
    outline: 0;
    background: #fff;
    border: 1px solid #e6ebec;
    border-radius: 2px;
`;

const List = styled.ul`
  position: relative;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  border: 1px solid #e6ebec;
  margin-top: -1px;
  border-radius: 0 0 3px 3px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const ListButton = styled.button`
    color: ${props => props.isSelected ? '#474747' : '#444444'};
    background: white;
    padding: 5px 12px;
    cursor: pointer;
    outline: none;
    display: block;
    border: 0;
    width: 100%;
    text-align: left;
    border-radius: 0;
    font: inherit;
`;

/* TODO: Implement on hover and on change functionality */

class TimezonePicker extends React.Component {
    constructor(props) {
        super(props);
        this.timezones = Object.keys(props.timezones);

        this.state = {
            open: false,
            focused: 0,
            filter: '',
            value: this.getTimezone(props.defaultValue || props.value),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            const newValue = this.getTimezone(nextProps.value);
            this.field.value = newValue || '';

            this.setState({value: newValue});
        }
    }

    getTimezone(query) {
        if (!query)
            return null;

        return this.timezones.find(zone => query === this.props.timezones[zone] || query === zone);
    }

    filteredTimezones() {
        return this.timezones.filter(this.filterItems(this.state.filter));
    }

    filterItems(filter) {
        if (!filter.trim() === '')
            return () => true;

        return zone => zone.toLowerCase().includes(filter.toLowerCase().replace(/\s/g, ''));
    }

    handleFocus(e) {
        this.field.value = '';
        this.setState({open: true});

        if (typeof this.props.inputProps.onFocus === 'function') {
            this.props.inputProps.onFocus(e);
        }
    }

    handleBlur(e) {
        this.field.value = this.state.value || '';
        this.setState({open: false});

        if (typeof this.props.inputProps.onBlur === 'function') {
            this.props.inputProps.onBlur(e);
        }
    }

    handleFilterChange(e) {
        const filter = this.field.value.trim();

        this.setState({
            filter,
            focused: 0,
        });

        if (typeof this.props.inputProps.onChange === 'function') {
            this.props.inputProps.onChange(e);
        }
    }

    handleKeyPress(e) {
        const filteredTimezones = this.filteredTimezones();

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            let {focused} = this.state;

            if (e.key === 'ArrowUp') {
                focused -= 1;

                if (focused < 1)
                    focused = filteredTimezones.length;
            } else {
                focused += 1;

                if (focused > filteredTimezones.length)
                    focused = 1;
            }

            this.setState({focused});

            this.options.children[focused % this.options.children.length].scrollIntoView();
        } else if (e.key === 'Enter') {
            const zone = filteredTimezones[this.state.focused % filteredTimezones.length];

            if (zone) {
                this.handleSelect(zone);
                e.target.blur();
            } else {
                this.setState({focused: 0});
            }
        }
    }

    handleSelect(zone) {
        this.setState({
            filter: '',
            focused: 0,
            open: false,
        });

        if (this.props.onChange) {
            this.props.onChange(this.props.timezones[zone]);
        } else {
            this.field.value = zone;

            this.setState({value: zone});
        }
    }

    handleItemFocus(index) {
        this.setState({focused: index});
    }

    value() {
        const currentValue = this.state.value;

        if (!currentValue)
            return null;

        return this.props.timezones[currentValue];
    }

    render() {
        const {inputProps} = this.props;
        const {value} = this.state;

        const isSelected = !this.state.open && value;
        const isOpen = this.state.open;

        return (
            <OuterDiv>
                <div>
                    <TextField
                        disabled={this.props.disabled}
                        type="text"
                        onFocus={e => this.handleFocus(e)}
                        onBlur={e => this.handleBlur(e)}
                        onChange={e => this.handleFilterChange(e)}
                        onKeyDown={e => this.handleKeyPress(e)}
                        defaultValue={value}
                        innerRef={(field) => {
                            this.field = field;
                        }}
                        autoComplete="off"
                        {...inputProps}
                    />
                </div>
                <List
                    innerRef={(options) => {
                        this.options = options;
                    }}
                    isOpen={isOpen}
                >
                    {this.filteredTimezones().map((zone, index, arr) => {
                        const focused = this.state.focused % arr.length === index;
                        return (
                            <ListButton
                                key={zone}
                                title={zone}
                                onMouseDown={() => this.handleSelect(zone)}
                                onMouseOver={() => this.handleItemFocus(index)}
                                onFocus={() => this.handleItemFocus(index)}
                                isSelected={isSelected}
                                isFocused={focused}
                            >
                                {zone}
                            </ListButton>
                        );
                    })}
                </List>
            </OuterDiv>
        );
    }
}

TimezonePicker.propTypes = {
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string,
    inputProps: PropTypes.shape({
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
    }),
    timezones: PropTypes.shape({}),
};

TimezonePicker.defaultProps = {
    defaultValue: '',
    value: '',
    onChange: () => {
    },
    className: '',
    style: {},
    disabled: false,
    inputProps: {},
    timezones: require('../../../../../../assets/timezones.json'), // eslint-disable-line global-require
};

module.exports = TimezonePicker;
