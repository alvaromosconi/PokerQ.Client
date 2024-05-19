import { useState} from "react"

type FormState<T> = {
    [P in keyof T]: T[P];
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function useForm<T extends {}>(initialForm: FormState<T>) {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [target.name]: target.value
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm
    };
}