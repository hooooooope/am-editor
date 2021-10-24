import { SchemaBlock, SchemaGlobal, SchemaRule } from '../types';
import {
	CARD_KEY,
	CARD_TYPE_KEY,
	CARD_VALUE_KEY,
	READY_CARD_KEY,
} from './card';
import { ANCHOR, CURSOR, FOCUS } from './selection';

const defualtSchema: Array<SchemaRule | SchemaBlock | SchemaGlobal> = [
	{
		type: 'block',
		attributes: {
			'data-id': '*',
		},
	},
	{
		name: 'p',
		type: 'block',
		allowIn: ['$root'],
	},
	{
		name: 'br',
		type: 'inline',
		isVoid: true,
	},
	{
		name: ANCHOR,
		type: 'inline',
		isVoid: true,
	},
	{
		name: FOCUS,
		type: 'inline',
		isVoid: true,
	},
	{
		name: CURSOR,
		type: 'inline',
		isVoid: true,
	},
	{
		name: 'span',
		type: 'mark',
		attributes: {
			'data-element': {
				required: true,
				value: ['anchor', 'cursor', 'focus'],
			},
		},
	},
	{
		name: 'card',
		type: 'inline',
		attributes: {
			name: {
				required: true,
				value: /\w+/,
			},
			type: {
				required: true,
				value: 'inline',
			},
			value: '*',
		},
	},
	{
		name: 'span',
		type: 'inline',
		attributes: {
			[CARD_KEY]: {
				required: true,
				value: /\w+/,
			},
			[CARD_TYPE_KEY]: {
				required: true,
				value: 'inline',
			},
			[CARD_VALUE_KEY]: '*',
			class: '*',
			contenteditable: '*',
		},
	},
	{
		name: 'span',
		type: 'inline',
		attributes: {
			[READY_CARD_KEY]: {
				required: true,
				value: /\w+/,
			},
			[CARD_TYPE_KEY]: {
				required: true,
				value: 'inline',
			},
			[CARD_VALUE_KEY]: '*',
			class: '*',
			contenteditable: '*',
		},
	},
	{
		name: 'card',
		type: 'block',
		attributes: {
			name: {
				required: true,
				value: /\w+/,
			},
			type: {
				required: true,
				value: 'block',
			},
			value: '*',
		},
	},
	{
		name: 'div',
		type: 'block',
		attributes: {
			[CARD_KEY]: {
				required: true,
				value: /\w+/,
			},
			[CARD_TYPE_KEY]: {
				required: true,
				value: 'block',
			},
			[CARD_VALUE_KEY]: '*',
			class: '*',
			contenteditable: '*',
		},
	},
	{
		name: 'div',
		type: 'block',
		attributes: {
			[READY_CARD_KEY]: {
				required: true,
				value: /\w+/,
			},
			[CARD_TYPE_KEY]: {
				required: true,
				value: 'block',
			},
			[CARD_VALUE_KEY]: '*',
			class: '*',
			contenteditable: '*',
		},
	},
];

export default defualtSchema;
