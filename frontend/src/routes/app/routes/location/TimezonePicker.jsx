import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import styled from 'styled-components';
import NotificationSystem from 'react-notification-system';

import { getTimezone, changeTimezone } from "../../../../actions/api";
import { getTimezoneSelector, changeTimezoneSelector } from '../../../../selectors/api';

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
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

const ListButton = styled.button`
    color: ${(props) => (props.isSelected ? '#474747' : '#444444')};
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

function mapStateToProps(state) {
    return {
        timezone: getTimezoneSelector(state).data.timezone,
        getTimezoneError: getTimezoneSelector(state).error,
        changeTimezoneError: changeTimezoneSelector(state).error,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTimezone,
        changeTimezone
    }, dispatch);
}

// TODO: Bug in setting the received timezone from the server. Does not currently set.

@connect(mapStateToProps, mapDispatchToProps)
class TimezonePicker extends React.Component {
    constructor(props) {
        super(props);

        this.timezones = require('../../../../assets/timezones.json');
        this.notificationSystem = null;

        this.notifications = [
            {
                uid: 'timezone picker get timezone error',
                level: 'error',
                title: 'Get Timezone Error',
                message: 'It appears there was an error on the server...',
                position: 'tr',
                autoDismiss: 0
            },
            {
                uid: 'timezone picker change timezone error',
                level: 'error',
                title: 'Change Timezone Error',
                message: 'It appears that I cannot change the servers timezone...',
                position: 'tr',
                autoDismiss: 0
            }
        ];

        this.onChange = this.onChange.bind(this);
        this.createNotifications = this.createNotifications.bind(this);

        this.state = {
            open: false,
            focused: 0,
            filter: '',
            value: this.getTimezone('Australia/Perth')
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.props.getTimezone();

        // Grab a reference to the notification system object in render().
        this.notificationSystem = this.refs.notificationSystem;
    }

    componentWillReceiveProps(newProps) {
        console.log("componentWillReceiveProps: " + newProps.timezone);

        if (newProps.timezone !== this.state.value) {
            this.setState({value: this.getTimezone(newProps.timezone)})
        }
    }

    getTimezone(query) {
        if (!query) {
            return null;
        }

        for (let timezone in this.timezones) {
            if (query === this.timezones[timezone] || query === timezone) {
                return this.timezones[timezone];
            }
        }

        return null;
    }

    filteredTimezones() {
        return Object.keys(this.timezones).filter(this.filterItems(this.state.filter));
    }

    filterItems(filter) {
        if (!filter.trim() === '') {
            return () => true;
        }

        return (zone) => zone.toLowerCase().includes(filter.toLowerCase().replace(/\s/g, ''));
    }

    handleFocus(e) {
        this.field.value = '';

        this.setState({ open: true });
    }

    handleBlur(e) {
        this.field.value = this.state.value || '';

        this.setState({ open: false });
    }

    handleFilterChange(e) {
        const filter = this.field.value.trim();

        this.setState({
            filter,
            focused: 0
        });

        this.onChange(e);
    }

    handleKeyPress(e) {
        const filteredTimezones = this.filteredTimezones();

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            let { focused } = this.state;

            if (e.key === 'ArrowUp') {
                focused -= 1;

                if (focused < 1) {
                    focused = filteredTimezones.length;
                }
            } else {
                focused += 1;

                if (focused > filteredTimezones.length) {
                    focused = 1;
                }
            }

            this.setState({ focused });

            this.options.children[focused % this.options.children.length].scrollIntoView();
        } else if (e.key === 'Enter') {
            const zone = filteredTimezones[this.state.focused % filteredTimezones.length];

            if (zone) {
                this.handleSelect(zone);
                e.target.blur();
            } else {
                this.setState({ focused: 0 });
            }
        }
    }

    handleSelect(zone) {
        this.setState({
            filter: '',
            focused: 0,
            open: false
        });

        this.onChange(this.timezones[zone]);
    }

    handleItemFocus(index) {
        this.setState({ focused: index });
    }

    onChange(timezone) {
        if (timezone !== this.state.value) {
            this.props.changeTimezone(timezone);
        }
    }

    createNotifications() {
        if (this.notificationSystem != null) {
             if (this.props.getTimezoneError) {
                this.notificationSystem.addNotification(this.notifications[0]);
            }

            if (this.props.changeTimezoneError) {
                this.notificationSystem.addNotification(this.notifications[1]);
            }
        }
    }

    render() {
        console.log("render" + this.state.value);
        const isSelected = !this.state.open && this.state.value;
        const isOpen = this.state.open;

        this.createNotifications();

        return (
            <article className = 'article'>
                <div className = 'row'>
                    <div className = 'col-xl-12'>
                        <div className = 'box box-default'>
                            <div className = 'box-header'>Timezone Picker</div>
                            <div className = 'box-body'>
                                <OuterDiv>
                                    <div>
                                        <TextField
                                            disabled = {this.props.disabled}
                                            type = 'text'
                                            onFocus = {(e) => this.handleFocus(e)}
                                            onBlur = {(e) => this.handleBlur(e)}
                                            onChange = {(e) => this.handleFilterChange(e)}
                                            onKeyDown = {(e) => this.handleKeyPress(e)}
                                            defaultValue = {this.state.value}
                                            innerRef = {(field) => {
                                                this.field = field;
                                            }}
                                            autoComplete = 'on'
                                            name = 'timezone'
                                        />
                                    </div>
                                    <List
                                        innerRef = {(options) => {
                                            this.options = options;
                                        }}
                                        isOpen = {isOpen}
                                    >
                                        {this.filteredTimezones()
                                            .map((zone, index, arr) => {
                                                const focused = this.state.focused % arr.length === index;

                                                return (
                                                    <ListButton
                                                        key = {zone}
                                                        title = {zone}
                                                        onMouseDown = {() => this.handleSelect(zone)}
                                                        onMouseOver = {() => this.handleItemFocus(index)}
                                                        onFocus = {() => this.handleItemFocus(index)}
                                                        isSelected = {isSelected}
                                                        isFocused = {focused}
                                                    >
                                                        {zone}
                                                    </ListButton>
                                                );
                                            })}
                                    </List>
                                </OuterDiv>
                            </div>
                        </div>
                    </div>
                </div>
                <NotificationSystem ref = "notificationSystem"/>
            </article>
        );
    }
}

export default TimezonePicker;
