import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Control = ({ children, titleLeft, onLeft, leftDisabled=false, titleRight, onRight, rightDisabled=false }) => {

    return (
        <View style={style.container}>
            <Button title={titleLeft} onPress={onLeft} disabled={leftDisabled}/>
            {children}
            <Button title={titleRight} onPress={onRight} disabled={rightDisabled}/>
        </View>
    );
};

Control.propTypes = {
    children: PropTypes.any,
    titleLeft: PropTypes.string,
    onLeft: PropTypes.func,
    leftDisabled: PropTypes.bool,
    titleRight: PropTypes.string,
    onRight: PropTypes.func,
    rightDisabled: PropTypes.bool,
}

const style = StyleSheet.create({
    container: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default Control;
