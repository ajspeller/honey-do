import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';

export const ANIMATION_ARRAY = [
  trigger('itemAnim', [
    // entry animation
    transition('void => *', [
      // initial state
      style({
        height: 0,
        opacity: 0,
        transform: 'scale(0.85)',
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
      }),
      // first animate the spacing which includes height and margin
      animate(
        '50ms',
        style({
          height: '*',
          marginBottom: '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*',
        })
      ),
      animate(100),
    ]),
    transition('* => void', [
      // first scale up
      animate(
        50,
        style({
          transform: 'scale(1.05)',
        })
      ),
      // then scale down while beginning to fade out
      animate(
        50,
        style({
          transform: 'scale(1)',
          opacity: 0.75,
        })
      ),
      // fade out completely
      animate(
        '120ms ease-out',
        style({
          opacity: 0,
          transform: 'scale(0.68)',
        })
      ),
      // then animate the spacing (includes height, margin and padding)
      animate(
        '150ms ease-out',
        style({
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
        })
      ),
    ]),
  ]),
  trigger('listAnim', [
    transition('* => *', [
      query(
        ':enter',
        [
          style({
            opacity: 0,
            height: 0,
          }),
          stagger(100, [animate('0.2s ease')]),
        ],
        { optional: true }
      ),
    ]),
  ]),
];
