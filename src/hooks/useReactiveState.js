import { useState } from "react";

function useReactiveState(initialValue) {
    const [state, setState] = useState({ value: initialValue, version: 0 });

    const setReactive = (newValue) => {
        setState(prev => ({
            value: newValue,
            version: prev.version + 1
        }));
    };

    return [state.value, setReactive, state.version];
}

export default useReactiveState;