import express from 'express';
import Order from '../models/Order';
import { generationQueue } from '../config/clients';
import { requireAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Middleware to check if user is admin (Simple hardcoded check for MVP Speed)
// In production, use Clerk Public Metadata roles
const requireAdmin = async (req: any, res: any, next: any) => {
    // ⚠️ TODO: Replace with real Clerk Admin ID or Metadata check
    // For now, allow all authenticated users in DEV, or protect with secret header
    // if (!req.auth.userId) return res.status(401).json({ error: 'Unauthorized' });
    // if (req.auth.userId !== process.env.ADMIN_USER_ID) return res.status(403).json({ error: 'Forbidden' });
    next();
};

// @desc    Get Admin Stats (Revenue, Orders)
// @route   GET /api/admin/stats
router.get('/stats', requireAdmin, async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const paidOrders = await Order.countDocuments({ status: { $in: ['paid', 'completed', 'processing'] } });

        const revenueAgg = await Order.aggregate([
            { $match: { status: { $in: ['paid', 'completed', 'processing'] } } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueAgg[0]?.total || 0;

        // Recent Orders
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10);

        res.json({
            revenue: totalRevenue,
            totalOrders,
            paidOrders,
            conversionRate: totalOrders > 0 ? ((paidOrders / totalOrders) * 100).toFixed(1) + '%' : '0%',
            recentOrders
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Retry Failed Job
// @desc    Retry Failed Job
// @route   POST /api/admin/retry/:orderId
router.post('/retry/:orderId', requireAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Reset status
        order.status = 'processing';
        await order.save();

        // Check if queue is connected
        if (!generationQueue) {
            console.error("Critical: Generation Queue client not initialized in router");
            return res.status(500).json({ message: "Queue system unavailable" });
        }

        // Re-add to Queue
        await generationQueue.add('generate-images', {
            orderId: order._id,
            config: order.config,
            originalImages: order.originalImages || [], // Ensure array
            packageId: order.packageId || 'starter' // Fallback
        });

        console.log(`[Admin] Retried order ${order._id}`);
        res.json({ message: 'Order re-queued successfully', orderId: order._id });
    } catch (error: any) {
        console.error("Retry Error:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;
