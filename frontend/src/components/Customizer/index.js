import 'jquery-slimscroll/jquery.slimscroll.min';
import React from 'react';
import LayoutOptions from './LayoutOptions';
import ColorOptions from './ColorOptions';
import ThemeOptions from './ThemeOptions';

class Customizer extends React.Component {
    toggleCustomizer = () => {
        const $body = $('#body');
        $body.toggleClass('quickview-open-customizer');
    };
    closeCustomizer = () => {
        const $body = $('#body');
        $body.removeClass('quickview-open-customizer');
    };

    componentDidMount() {
        const quickviewInner = this.quickview;
        $(quickviewInner).slimscroll({
            height: '100%'
        });
    }

    render() {
        return (
            <section
                className="quickview-wrapper customizer d-none d-lg-block d-xl-block theme-light"
                id="quickview-customizer"
            >
                <a className="customizer-close" href="javascript:;" onClick={this.closeCustomizer}>
                    <span className="material-icons">close</span>
                </a>
                <a className="customizer-toggle" href="javascript:;" onClick={this.toggleCustomizer}>
                    <span className="material-icons">settings</span>
                </a>

                <div className="quickview-inner" ref={(c) => {
                    this.quickview = c;
                }}>
                    <p className="customizer-header">Customizer</p>
                    <p className="small no-margin">Customize and preview in real time.</p>

                    <div className="divider divider-lg divider-solid"/>
                    <LayoutOptions/>

                    <div className="divider divider-lg divider-solid"/>
                    <ColorOptions/>

                    <div className="divider divider-lg divider-solid"/>
                    <ThemeOptions/>
                </div>
            </section>
        );
    }
}

module.exports = Customizer;
