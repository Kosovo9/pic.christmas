import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

export default function PayPalBtn({ amount, orderId }: { amount: number; orderId: string }) {
    return (
        <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
            <PayPalButtons
                createOrder={(_, actions) =>
                    actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [{ amount: { currency_code: 'USD', value: amount.toString() } }]
                    })
                }
                onApprove={async (data) => {
                    await fetch('/api/paypal/capture', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ orderID: data.orderID, orderId })
                    })
                }}
            />
        </PayPalScriptProvider>
    )
}
