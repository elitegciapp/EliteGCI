# Mobile App Setup Guide

This guide explains how to make your EliteGCI app work as a mobile app using Capacitor.

## ✅ What's Already Done

Your app is now configured to work with absolute API URLs, which is required for mobile apps.

### Changes Made:
1. **API Configuration** (`client/src/config.ts`):
   - Created centralized API URL configuration
   - Uses environment variable `VITE_API_URL`

2. **Query Client Updated** (`client/src/lib/queryClient.ts`):
   - All API calls now use absolute URLs
   - Works with both development and production/mobile environments

3. **Build Script**: Already exists in `package.json`
   - `npm run build` works correctly

## 🔧 Setup Instructions

### For Development (Current Replit Setup)
No changes needed! Leave `VITE_API_URL` empty:

1. Create `.env` file in project root (if it doesn't exist)
2. Add this line:
   ```
   VITE_API_URL=
   ```
3. Continue developing normally

### For Mobile/Production Deployment

#### Step 1: Deploy Your Backend
Your Express backend needs to be hosted separately. Options:
- **Replit Deploy** (easiest)
- Vercel
- Render
- Fly.io
- Railway

#### Step 2: Configure API URL
1. Copy `.env.example` to `.env`
2. Set your deployed API URL:
   ```
   VITE_API_URL=https://your-api.replit.app
   ```

#### Step 3: Build for Mobile
```bash
npm run build
```

This creates a `/dist` folder that Capacitor will use.

#### Step 4: Add Capacitor (When Ready)
When you're ready to create the mobile app:

1. Install Capacitor:
   ```bash
   npm install @capacitor/core @capacitor/cli
   npm install @capacitor/android @capacitor/ios
   ```

2. Initialize Capacitor:
   ```bash
   npx cap init
   ```

3. Add platforms:
   ```bash
   npx cap add android
   npx cap add ios
   ```

4. Build and sync:
   ```bash
   npm run build
   npx cap sync
   ```

5. Open in native IDE:
   ```bash
   npx cap open android
   # or
   npx cap open ios
   ```

## 📱 Mobile-Specific Considerations

### Already Handled
- ✅ Absolute API URLs configured
- ✅ Build process works
- ✅ No browser-only features used (print, etc.)

### Optional Improvements
Add mobile-optimized CSS in `client/src/index.css`:

```css
@media (max-width: 480px) {
  body {
    font-size: 16px;
  }
  
  .container {
    padding: 1rem;
  }
}
```

## 🚀 Deployment Checklist

- [ ] Deploy backend to hosting service
- [ ] Create `.env` file with `VITE_API_URL` pointing to deployed backend
- [ ] Run `npm run build` to create production build
- [ ] Test that app works with deployed API
- [ ] Install and configure Capacitor (when ready)
- [ ] Build mobile app with Capacitor
- [ ] Test on mobile device/emulator

## 📝 Environment Variables

| Variable | Development | Mobile/Production |
|----------|-------------|-------------------|
| `VITE_API_URL` | `` (empty) | `https://your-api.com` |

Empty value uses relative URLs (same server).
Production/mobile requires full URL to deployed API.

## 🔍 Testing

### Test Development Setup
```bash
npm run dev
# App should work normally with relative URLs
```

### Test Production Build
```bash
# Set VITE_API_URL to deployed API
npm run build
npm run preview
# App should work with absolute API URLs
```

## ⚠️ Important Notes

1. **Backend Must Be Hosted**: Mobile apps cannot run your Express server
2. **CORS**: Your backend must allow requests from mobile app origin
3. **HTTPS**: Production API should use HTTPS for security
4. **Credentials**: API calls include credentials for authentication

## 📞 Support

If you encounter issues:
1. Check that `VITE_API_URL` is set correctly
2. Verify backend is deployed and accessible
3. Check browser console for API errors
4. Ensure backend CORS is configured properly
