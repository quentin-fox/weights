import produce from 'immer';
import { exerciseReshaper } from '../helpers';

const rootReducer = (state = initialWorkouts, action) => {
    switch (action.type) {
        case 'ADD_WORKOUT':
            return [...state, { title: action.payload, data: [] }];
        case 'ADD_EXERCISE':
            return produce(state, draft => {
                const { workoutKey, type, data } = action.payload;
                const newExercise = exerciseReshaper(data, type);
                draft[workoutKey].data.push(newExercise);
            });
        case 'CYCLE_PAUSE':
            return produce(state, draft => {
                const { workoutKey, exKey } = action.payload;
                let timer = draft[workoutKey].data[exKey];
                timer.paused = !timer.paused;
            });
        case 'COUNT_DOWN':
            return produce(state, draft => {
                const { workoutKey, exKey, by } = action.payload;
                let timer = draft[workoutKey].data[exKey];

                draft[workoutKey].data[exKey].elapsed += by;

                const timerComplete = timer.elapsed === timer.initial;
                const isLastExercise = exKey === draft[workoutKey].data.length - 1;

                if (timerComplete) {
                    draft[workoutKey].data[exKey].complete = true;
                    draft[workoutKey].data[exKey].showing = false;

                    if (!isLastExercise) {
                        draft[workoutKey].data[exKey + 1].showing = true;
                    }
                }
            });
        case 'RESET_TIMER':
            return produce(state, draft => {
                const { workoutKey, exKey } = action.payload;
                draft[workoutKey].data[exKey].elapsed = 0;
                draft[workoutKey].data[exKey].complete = true;
            });
        case 'TOGGLE_SHOWING':
            return produce(state, draft => {
                const { workoutKey, exKey } = action.payload;
                const showing = draft[workoutKey].data[exKey].showing;
                if (showing === false) {
                    // if toggling to showing, hide all other exercises
                    draft[workoutKey].data = draft[workoutKey].data.map((exercise, key) => {
                        if (key !== exKey) {
                            exercise.showing = false;
                        }
                        return exercise;
                    });
                }
                draft[workoutKey].data[exKey].showing = !showing;
            });
        case 'TOGGLE_SET':
            return produce(state, draft => {
                const { workoutKey, exKey, setKey } = action.payload;
                draft[workoutKey].data[exKey].sets[setKey] = !draft[workoutKey].data[exKey].sets[
                    setKey
                ];

                const allSetsComplete = draft[workoutKey].data[exKey].sets.every(Boolean);
                const isLastExercise = exKey === draft[workoutKey].data.length - 1;

                if (allSetsComplete) {
                    draft[workoutKey].data[exKey].complete = true;
                    draft[workoutKey].data[exKey].showing = false;

                    if (!isLastExercise) {
                        draft[workoutKey].data[exKey + 1].showing = true;
                    }
                }
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
