/**
 * 滑块验证或序列验证的挑战数据类型
 */
export interface SliderChallengeData {
	id: string;
	mode: 'slider';
	image: string;
	pieceY: number;
	targetX: number;
}

/**
 * 序列验证的挑战数据类型
 */
export interface SequenceItem {
	id: string;
	text: string;
	x: number;
	y: number;
}

/**
 * 序列验证的挑战数据类型
 */
export interface SequenceChallengeData {
	id: string;
	mode: 'sequence';
	image: string;
	items: SequenceItem[];
	prompt: string[];
}

export type VerifyChallenge = SliderChallengeData | SequenceChallengeData;

/**
 * 滑块验证或序列验证的答案类型
 */
export type VerifyAnswer =
	| { mode: 'slider'; challengeId: string; offsetX: number }
	| { mode: 'sequence'; challengeId: string; itemIds: string[] };

/**
 * 验证结果类型
 */
export interface VerifyResult {
	success: boolean;
	token?: string;
}

/**
 * 滑块验证或序列验证组件的属性类型
 */
export interface VerifyProps {
	challenge: VerifyChallenge;
	verify: (answer: VerifyAnswer) => Promise<VerifyResult>;
	loading?: boolean;
}
