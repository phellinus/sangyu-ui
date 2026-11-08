import type { ButtonProps, SyButton } from 'sangyu-ui';
import type { SyAimIcon } from '@sangyu-ui/icons';

type AssertFalse<T extends false> = T;
export type ButtonPropsAreTyped = AssertFalse<0 extends 1 & ButtonProps ? true : false>;
export type ButtonComponentIsTyped = AssertFalse<0 extends 1 & typeof SyButton ? true : false>;
export type IconComponentIsTyped = AssertFalse<0 extends 1 & typeof SyAimIcon ? true : false>;
export type InvalidSizeIsRejected = AssertFalse<'giant' extends NonNullable<ButtonProps['size']> ? true : false>;
