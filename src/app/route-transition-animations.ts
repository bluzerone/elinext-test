import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
	transition('One => Two, One => Three, One => Four, One => Five, One => Six, Two => Three, Two => Four, Two => Five, Two => Six, Three => Four, Three => Five, Four => Five, Six => One, Six => Two, Six => Three, Six => Four, Six => Five', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				right: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ bottom: '-50px', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.4s ease-out', style({ top: '50px', opacity: 0 }))]),
			query(':enter', [animate('0.4s ease-out', style({ right: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	]),
	transition('One => Two, One => Three, One => Four, One => Five, One => Six, Two => Three, Two => Four, Two => Five, Two => Six, Three => Four, Three => Five, Four => Five, Six => One, Six => Two, Six => Three, Six => Four, Six => Five', [
		style({ position: 'relative' }),
		query(':enter, :leave', [
			style({
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%'
			})
		]),
		query(':enter', [style({ right: '-50px', opacity: 0 })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('0.4s ease-out', style({ top: '50px', opacity: 0 }))]),
			query(':enter', [animate('0.4s ease-out', style({ right: '0%', opacity: 1 }))])
		]),
		query(':enter', animateChild())
	])
]);
