interface MockAdProps {
    headline?: string;
    cta?: string;
    variant?: 'blue' | 'green' | 'purple';
}

export function MockAd({
    headline = 'Discover Something Amazing',
    cta = 'Learn More',
    variant = 'blue',
}: MockAdProps) {
    const colors = {
        blue: { bg: '#e3f2fd', accent: '#1976d2', button: '#1976d2' },
        green: { bg: '#e8f5e9', accent: '#388e3c', button: '#388e3c' },
        purple: { bg: '#f3e5f5', accent: '#7b1fa2', button: '#7b1fa2' },
    };

    const theme = colors[variant];

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: theme.bg,
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                boxSizing: 'border-box',
                fontFamily: 'system-ui, sans-serif',
            }}
        >
            {/* Sponsored Label */}
            <span
                style={{
                    fontSize: '0.625rem',
                    color: '#888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '0.5rem',
                }}
            >
                Sponsored
            </span>

            {/* Fake Image Placeholder */}
            <div
                style={{
                    flex: 1,
                    backgroundColor: theme.accent,
                    opacity: 0.2,
                    borderRadius: '4px',
                    marginBottom: '0.75rem',
                    minHeight: '80px',
                }}
            />

            {/* Headline */}
            <h3
                style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#333',
                    margin: '0 0 0.5rem 0',
                    lineHeight: 1.3,
                }}
            >
                {headline}
            </h3>

            {/* CTA Button */}
            <button
                style={{
                    backgroundColor: theme.button,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    alignSelf: 'flex-start',
                }}
            >
                {cta}
            </button>
        </div>
    );
}
