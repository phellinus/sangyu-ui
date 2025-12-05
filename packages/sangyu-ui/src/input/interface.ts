export interface InputProps {
    width?: string;
    height?: string;
    modelValue?: string;
    bgColor?: string;
    textColor?: string;
    focusBorderColor?: string;
    borderColor?: string;
    disabled?: boolean;
    label?: string;
    size?: 'small' | 'default' | 'large';
    placeholder?: string;
    type?: 'filled' | 'border' | 'label' | 'password' | 'label-border' | 'underline';
    clearable?: boolean;
    showPassword?: boolean;
}

export const originInputProps = ['autocomplete'];
