export const exerciseReshaper = (data, type) => {

    const shapeData = (exerciseData, exerciseType) => {
        switch (exerciseType) {
            case 'resistance':
                return {
                    type,
                    baseWeight: exerciseData.weight,
                    name: exerciseData.name,
                    reps: exerciseData.reps,
                    sets: Array(exerciseData.sets).fill(false),
                };
            case 'timer':
                return {
                    type,
                    initial: exerciseData.duration,
                    elapsed: 0,
                    paused: true,
                };
        }
    };

    let newExercise = shapeData(data, type);

    return newExercise;
};
