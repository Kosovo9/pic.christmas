import { useState, useEffect } from 'react';

export function useReferral() {
    const [referralCode, setReferralCode] = useState<string | null>(null);

    useEffect(() => {
        // Check URL params for referral code
        const params = new URLSearchParams(window.location.search);
        const refFromUrl = params.get('ref');

        if (refFromUrl) {
            setReferralCode(refFromUrl.toUpperCase());
            localStorage.setItem('appliedReferralCode', refFromUrl.toUpperCase());
        } else {
            // Check localStorage
            const savedRef = localStorage.getItem('appliedReferralCode');
            if (savedRef) {
                setReferralCode(savedRef);
            }
        }
    }, []);

    const clearReferral = () => {
        setReferralCode(null);
        localStorage.removeItem('appliedReferralCode');
    };

    const applyReferral = (code: string) => {
        const upperCode = code.toUpperCase();
        setReferralCode(upperCode);
        localStorage.setItem('appliedReferralCode', upperCode);
    };

    return {
        referralCode,
        clearReferral,
        applyReferral,
        hasReferral: !!referralCode
    };
}
