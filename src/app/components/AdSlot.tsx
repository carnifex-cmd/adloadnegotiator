import { ReactNode } from 'react';

type AdSlotStatus = 'PLACEHOLDER' | 'LOADED' | 'SUPPRESSED';

interface AdSlotProps {
    slotId: string;
    status: AdSlotStatus;
    children?: ReactNode;
}

const SLOT_WIDTH = 300;
const SLOT_HEIGHT = 250;

export function AdSlot({ slotId, status, children }: AdSlotProps) {
    const containerStyle: React.CSSProperties = {
        width: SLOT_WIDTH,
        height: SLOT_HEIGHT,
        minWidth: SLOT_WIDTH,
        minHeight: SLOT_HEIGHT,
        maxWidth: SLOT_WIDTH,
        maxHeight: SLOT_HEIGHT,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem auto',
        boxSizing: 'border-box',
    };

    if (status === 'PLACEHOLDER') {
        return (
            <div
                id={slotId}
                style={{
                    ...containerStyle,
                    backgroundColor: '#e0e0e0',
                    border: '1px solid #ccc',
                }}
            >
                <span style={{ color: '#888', fontSize: '0.875rem' }}>
                    Loading ad...
                </span>
            </div>
        );
    }

    if (status === 'SUPPRESSED') {
        return (
            <div
                id={slotId}
                style={{
                    ...containerStyle,
                    backgroundColor: '#f5f5f5',
                    border: '1px dashed #ddd',
                }}
            >
                <span style={{ color: '#aaa', fontSize: '0.875rem', fontStyle: 'italic' }}>
                    Ad suppressed (UX)
                </span>
            </div>
        );
    }

    // status === 'LOADED'
    return (
        <div
            id={slotId}
            style={{
                ...containerStyle,
                backgroundColor: '#fff',
                border: '1px solid #ddd',
            }}
        >
            {children}
        </div>
    );
}
