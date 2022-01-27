import {
	CardInterface,
	EditorInterface,
	NodeInterface,
	ResizeCreateOptions,
	ResizeInterface,
} from '../../types';
import { $ } from '../../node';
import { isMobile } from '../../utils';
import { DATA_ELEMENT, UI } from '../../constants';
import './index.css';

class Resize implements ResizeInterface {
	private editor: EditorInterface;
	private card: CardInterface;
	private point?: { x: number; y: number };
	private options: ResizeCreateOptions = {};
	private component?: NodeInterface;
	private start: boolean = false;

	constructor(editor: EditorInterface, card: CardInterface) {
		this.editor = editor;
		this.card = card;
	}

	create(options: ResizeCreateOptions) {
		this.options = options;
		this.component = $(
			`<div class="data-card-resize" ${DATA_ELEMENT}="${UI}" draggable="true"><span class="data-card-resize-btn"><svg viewBox="0 0 3413 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="8px" height="6px"><path d="M341.333333 341.333333h2730.666667a170.666667 170.666667 0 0 0 0-341.333333H341.333333a170.666667 170.666667 0 1 0 0 341.333333zM341.333333 1024h2730.666667a170.666667 170.666667 0 0 0 0-341.333333H341.333333a170.666667 170.666667 0 0 0 0 341.333333z"></path></svg></span></div>`,
		);

		if (isMobile) {
			this.component.on('touchstart', this.touchStart);
			this.component.on('touchmove', this.touchMove);
			this.component.on('touchend', this.dragEnd);
			this.component.on('touchcancel', this.dragEnd);
		} else {
			this.component.on('dragstart', this.dragStart);
			document.addEventListener('mousemove', this.dragMove);
			document.addEventListener('mouseup', this.dragEnd);
		}
		this.component.on('click', (event: MouseEvent) => {
			event.stopPropagation();
		});
	}

	render(container: NodeInterface = this.card.root, minHeight: number = 80) {
		this.start = false;
		let height: number = 0,
			moveHeight: number = 0;
		this.create({
			dragStart: () => {
				height = container.height();
				this.start = true;
				this.card.onActivate(false);
			},
			dragMove: (y) => {
				if (this.start) {
					moveHeight = height + y;
					moveHeight =
						moveHeight < minHeight ? minHeight : moveHeight;
					container.css('height', `${moveHeight}px`);
				}
			},
			dragEnd: () => {
				if (this.start) {
					this.card.setValue({
						height: container.height(),
					} as any);
					this.start = false;
					this.card.onActivate(true);
				}
			},
		});
		if (!this.component) return;
		if (!this.card.activated) this.component.hide();
		container.append(this.component);
		const value: any = this.card.getValue() || {};
		if (value.height) {
			container.css('height', `${value.height}px`);
		}
	}

	touchStart = (event: TouchEvent) => {
		event.preventDefault();
		event.cancelBubble = true;
		this.point = {
			x: event.targetTouches[0].clientX,
			y: event.targetTouches[0].clientY,
		};
		const { dragStart } = this.options;
		if (dragStart) dragStart(this.point);
	};

	dragStart = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		event.cancelBubble = true;
		this.point = {
			x: event.clientX,
			y: event.clientY,
		};
		const { dragStart } = this.options;
		if (dragStart) dragStart(this.point);
	};

	dragMove = (event: MouseEvent) => {
		if (this.point) {
			const { dragMove } = this.options;
			if (dragMove) dragMove(event.clientY - this.point.y);
		}
	};

	touchMove = (event: TouchEvent) => {
		event.preventDefault();
		if (this.point) {
			const { dragMove } = this.options;
			if (dragMove)
				dragMove(event.targetTouches[0].clientY - this.point.y);
		}
	};

	dragEnd = (event: MouseEvent) => {
		this.point = undefined;
		const { dragEnd } = this.options;
		if (dragEnd) dragEnd();
	};

	show() {
		this.component?.show();
	}

	hide() {
		if (!this.start) this.component?.hide();
	}

	destroy() {
		if (isMobile) {
			if (!this.component) return;
			this.component.off('touchstart', this.touchStart);
			this.component.off('touchmove', this.touchMove);
			this.component.off('touchend', this.dragEnd);
			this.component.off('touchcancel', this.dragEnd);
		} else {
			this.component?.off('dragstart', this.dragStart);
			document.removeEventListener('mousemove', this.dragMove);
			document.removeEventListener('mouseup', this.dragEnd);
		}
		this.component?.remove();
	}
}

export default Resize;
