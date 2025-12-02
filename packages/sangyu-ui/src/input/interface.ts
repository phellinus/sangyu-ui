export interface InputProps {
    modelValue?: string;
    focusBorderColor?: string;
    borderColor?: string;
    disabled?: boolean;
    size?: 'small' | 'default' | 'large';
    placeholder: string;
}

export const originInputProps = ['autocomplete', 'placeholder'];
