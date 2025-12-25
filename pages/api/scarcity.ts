export default function handler(req: any, res: any) {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    res.json({ unix: end.getTime() });
}
