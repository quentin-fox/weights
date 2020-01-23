import React, { useState } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableWithoutFeedback,
    StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Control from '../src/components/titlecontrol';
import NewWorkoutModal from '../src/components/new-workout-modal';
import { connect } from 'react-redux';
import { addWorkout } from '../actions/actions';

const mapStateToProps = state => {
    return {
        workouts: state.map((workout, index) => {
            return {
                key: index,
                title: workout.title,
            };
        }),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddWorkout: name => dispatch(addWorkout(name)),
    };
};

const WorkoutListScreen = ({ navigation, workouts, onAddWorkout }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const onReturn = () => {
        navigation.goBack();
    };

    const startAddNew = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <React.Fragment>
            <SafeAreaView>
                <Text style={style.title}>Workouts</Text>
                <Control
                    titleLeft="Back"
                    onLeft={onReturn}
                    titleRight="New"
                    onRight={startAddNew}
                />
                <FlatList
                    style={{ height: '100%' }}
                    data={workouts}
                    keyExtractor={data => data.title}
                    renderItem={({ item, index }) => (
                        <WorkoutCard navigation={navigation} item={item} id={index} />
                    )}
                />
                <NewWorkoutModal
                    visible={modalVisible}
                    onClose={handleModalClose}
                    onAddWorkout={onAddWorkout}
                />
            </SafeAreaView>
        </React.Fragment>
    );
};

WorkoutListScreen.propTypes = {
    navigation: PropTypes.any,
    onAddWorkout: PropTypes.func,
    workouts: PropTypes.arrayOf(PropTypes.object),
};

const WorkoutCard = ({ navigation, item, id }) => {
    const onDoWorkout = () => {
        navigation.navigate('workout', { id });
    };

    return (
        <TouchableWithoutFeedback onPress={onDoWorkout}>
            <View style={style.workoutContainer}>
                <Text style={style.workoutTitle}>{item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

WorkoutCard.propTypes = {
    navigation: PropTypes.any,
    item: PropTypes.object,
    id: PropTypes.number,
};

const style = StyleSheet.create({
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    controlContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
    },
    workoutTitle: {
        flex: 1,
        marginLeft: 10,
        minHeight: 15,
        fontSize: 20,
    },
    workoutContainer: {
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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutListScreen);
