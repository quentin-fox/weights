import produce from 'immer';

export const addWorkout = (id, name) => {
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

const exerciseReducer = (data, type) => {
    const shapeData = (exerciseData, exerciseType) => {
        switch (exerciseType) {
            case 'resistance':
                return {
                    baseWeight: exerciseData.weight,
                    name: exerciseData.name,
                    reps: exerciseData.reps,
                    sets: Array(exerciseData.sets).fill(false),
                };
            case 'timer':
                return {
                    initial: exerciseData.duration,
                    elapsed: 0,
                    paused: true,
                };
        }
    };

    let newExercise = shapeData(data, type);
    newExercise['showing'] = false;
    newExercise['complete'] = false;
    newExercise['type'] = type;

    return newExercise;
};

const rootReducer = (state = initialWorkouts, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT':
            return [...state, { title: action.payload, data: [] }];
        case 'ADD_EXERCISE':
            return produce(state, draft => {
                const { key, type, data } = action.payload;
                const newExercise = exerciseReducer(data, type);
                draft[key].data.push(newExercise);
            });
        default:
            return state;
    }
};

const initialWorkouts = [
    {
        title: 'Chest and Shoulders',
        data: [
            {
                type: 'resistance',
                showing: true,
                complete: false,
                name: 'Bench Press',
                reps: 5,
                baseWeight: 155,
                sets: Array(5).fill(false),
            },
            {
                type: 'timer',
                showing: false,
                complete: false,
                initial: 10,
                elapsed: 0,
                paused: true,
            },
            {
                type: 'resistance',
                showing: false,
                complete: false,
                name: 'Overhead Press',
                reps: 8,
                baseWeight: 100,
                sets: Array(4).fill(false),
            },
        ],
    },
    {
        title: 'Legs',
        data: [
            {
                type: 'resistance',
                showing: true,
                complete: false,
                name: 'Squats',
                reps: 5,
                baseWeight: 175,
                sets: Array(5).fill(false),
            },
            {
                type: 'resistance',
                showing: false,
                complete: false,
                name: 'Lunges',
                reps: 5,
                baseWeight: 80,
                sets: Array(5).fill(false),
            },
            {
                type: 'timer',
                showing: false,
                complete: false,
                initial: 60,
                elapsed: 0,
                paused: true,
            },
            {
                type: 'resistance',
                showing: false,
                complete: false,
                name: 'Hip Thrusts',
                reps: 8,
                baseWeight: 225,
                sets: Array(5).fill(false),
            },
        ],
    },
];

export default rootReducer;
