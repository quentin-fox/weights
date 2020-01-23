import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import Circle from './circle';

const ResistanceExercise = ({
    onToggleSet,
    onToggleShowing,
    data: { key, showing, complete, name, reps, baseWeight, sets },
}) => {



    return (
        <TouchableWithoutFeedback onPress={() => onToggleShowing(key)}>
            <View style={style.container}>
                <Text style={style.exerciseTitle}>{name}</Text>
                {showing && (
                    <React.Fragment>
                        <View style={style.detailContainer}>
                            <View style={style.detailSubContainer}>
                                <Text>Reps</Text>
                                <Text style={style.detail}>{reps}</Text>
                            </View>

                            <View style={style.weightSubContainer}>
                                <Text>Weight</Text>
                                <Text style={style.detail}>{baseWeight} lbs</Text>
                            </View>

                            <View style={style.detailSubContainer}>
                                <Text>Sets</Text>
                                <Text style={style.detail}>{sets.length}</Text>
                            </View>
                        </View>
                        <View style={style.circleContainer}>
                            {sets.map((v, i) => {
                                return (
                                    <Circle
                                        key={i}
                                        exKey={key}
                                        setKey={i}
                                        completed={v}
                                        radius={25}
                                        onToggleSet={onToggleSet}
                                    />
                                );
                            })}
                        </View>
                    </React.Fragment>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

ResistanceExercise.propTypes = {
    data: PropTypes.shape({
        key: PropTypes.number,
        showing: PropTypes.bool,
        name: PropTypes.string,
        reps: PropTypes.number,
        baseWeight: PropTypes.number,
        sets: PropTypes.arrayOf(PropTypes.bool),
    }),
};

const style = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 1,
    },
    detailSubContainer: {
        flex: 1,
        marginBottom: 15,
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    weightSubContainer: {
        flex: 2,
        marginBottom: 15,
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    detailContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    circleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    exerciseTitle: {
        flex: 1,
        marginLeft: 10,
        minHeight: 15,
        fontSize: 20,
    },
    detail: {
        fontSize: 35,
        fontWeight: 'bold',
    },
});

export default ResistanceExercise;
