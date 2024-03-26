import React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const ScrollArea = React.forwardRef(({ children, ...props }, forwardedRef) => (
    <ScrollAreaPrimitive.Root {...props} ref={forwardedRef} style={{ minHeight: '0', maxHeight: '65vh', width: '100%', overflow: 'hidden' }}>
        <ScrollAreaPrimitive.Viewport style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}>
            {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar orientation="vertical" />
    </ScrollAreaPrimitive.Root>
));

const ScrollBar = React.forwardRef(({ orientation = 'vertical', ...props }, forwardedRef) => (
    <ScrollAreaPrimitive.Scrollbar {...props} ref={forwardedRef} orientation={orientation} style={{ display: 'flex', userSelect: 'none', touchAction: 'none', padding: '2px', transition: 'background 160ms ease-in-out', background: 'rgba(0, 0, 0, 0.3)', '&[data-orientation="vertical"]': { width: '10px' }, '&[data-orientation="horizontal"]': { height: '10px' } }}>
        <ScrollAreaPrimitive.Thumb style={{ flex: 1, background: 'currentColor', borderRadius: '9999px' }} />
    </ScrollAreaPrimitive.Scrollbar>
));

export { ScrollArea, ScrollBar };