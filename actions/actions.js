export const addWorkout = name => {
    return {
        type: 'ADD_WORKOUT',
        payload: name,
    };
};

export const addExercise = (key, type, data) => {
    return {
        type: 'ADD_EXERCISE',
        payload: {
            key,
            type,
            data,
        },
    };
};

export const cyclePause = (workoutKey, exKey) => {
    return {
        type: 'CYCLE_PAUSE',
        payload: {
            workoutKey,
            exKey,
        },
    };
};

export const countDown = (workoutKey, exKey, by) => {
    return {
        type: 'COUNT_DOWN',
        payload: {
            workoutKey,
            exKey,
            by,
        },
    };
};

export const resetTimer = (workoutKey, exKey) => {
    return {
        type: 'RESET_TIMER',
        payload: {
            workoutKey,
            exKey,
        },
    };
};

export const toggleShowing = (workoutKey, exKey) => {
    return {
        type: 'TOGGLE_SHOWING',
        payload: {
            workoutKey,
            exKey,
        },
    };
};

export const toggleSet = (workoutKey, exKey, setKey) => {
    return {
        type: 'TOGGLE_SET',
        payload: {
            workoutKey,
            exKey,
            setKey,
        },
    };
};
