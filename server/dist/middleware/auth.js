"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAuth(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header?.startsWith('Bearer '))
            return res.status(401).json({ message: 'Unauthorized' });
        const token = header.slice(7);
        const secret = process.env.JWT_SECRET || 'dev_secret_change_me';
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.user = decoded.role ? { id: decoded.id, role: decoded.role } : { id: decoded.id };
        next();
    }
    catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
//# sourceMappingURL=auth.js.map