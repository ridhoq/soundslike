const soundslikeState = "SOUNDSLIKE-STATE";

export const loadState = (localForage) => {
    localForage.getItem(soundslikeState).then((serializedState) => {
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }).catch((err) => {
        console.log(err);
    });
};

export const saveState = (localForage, state) => {
    const serializedState = JSON.stringify(state);
    localForage.setItem(soundslikeState, serializedState).then(() => {
        return;
    }).catch((err) => {
        console.log(err);
    });
};