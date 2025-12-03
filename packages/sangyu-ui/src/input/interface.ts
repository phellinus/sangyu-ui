export interface InputProps {
    width?: string;
    height?: string;
    modelValue?: string;
    bgColor?: string;
    textColor?: string;
    focusBorderColor?: string;
    borderColor?: string;
    disabled?: boolean;
    size?: 'small' | 'default' | 'large';
    placeholder?: string;
    type?: 'filled' | 'border' | 'label' | 'password' | 'label-border';
    clearable?: boolean;
    showPassword?: boolean;
}

export const originInputProps = ['autocomplete'];
