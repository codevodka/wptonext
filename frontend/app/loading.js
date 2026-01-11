export default function Loading() {
    return (
        <div style={styles.container}>
            <div style={styles.spinnerWrapper}>
                <div style={styles.spinner}></div>
                <p style={styles.text}>Loading...</p>
            </div>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
    },
    spinnerWrapper: {
        textAlign: 'center',
        animation: 'fadeIn 0.3s ease-in',
    },
    spinner: {
        width: '50px',
        height: '50px',
        margin: '0 auto 20px',
        border: '4px solid rgba(255, 255, 255, 0.1)',
        borderTop: '4px solid #FEC475',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    text: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: '500',
        letterSpacing: '1px',
        textTransform: 'uppercase',
    }
}
