import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function PayPalBtn({ amount, orderId, clerkId }: { amount: number; orderId: string; clerkId: string }) {
    return (
        <div className="min-h-[150px] animate-in fade-in duration-700">
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
                <PayPalButtons
                    style={{ layout: 'vertical', shape: 'pill', label: 'pay' }}
                    createOrder={(_, actions) =>
                        actions.order.create({
                            intent: 'CAPTURE',
                            purchase_units: [{ amount: { currency_code: 'USD', value: amount.toString() } }]
                        })
                    }
                    onApprove={async (data) => {
                        const res = await fetch('/api/paypal/capture', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ orderID: data.orderID, orderId, clerkId })
                        });
                        if (res.ok) {
                            window.location.href = '/success';
                        }
                    }}
                />
            </PayPalScriptProvider>
        </div>
    )
}
