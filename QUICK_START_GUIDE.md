# 🚀 Which File to Run - Quick Start Guide

## 📁 **After Extracting the ZIP File**

When you extract `transport-geography-educational-game-complete.zip`, you'll get a `webapp/` folder. Here's exactly what to run:

---

## ⚡ **Method 1: Simple Node.js Setup (Recommended)**

### **📍 Navigate to Project Folder**
```bash
cd webapp/
```

### **🔧 Install Dependencies (One Time Only)**
```bash
npm install
```
*This downloads all required packages - only needs to be done once*

### **🏗️ Build the Project**
```bash
npm run build
```
*This compiles the TypeScript and creates the dist/ folder*

### **🚀 Start the Game**
```bash
npm run dev
```
*This starts a development server*

### **🌐 Open in Browser**
Go to: `http://localhost:3000`

**🎉 The Transport Geography Educational Game is now running!**

---

## ⚡ **Method 2: Cloudflare Development Server**

### **📍 Navigate to Project Folder**
```bash
cd webapp/
```

### **🔧 Install Dependencies (If Not Done)**
```bash
npm install
```

### **🏗️ Build the Project**
```bash
npm run build
```

### **🚀 Start with Wrangler**
```bash
npx wrangler pages dev dist --port 3000
```

### **🌐 Open in Browser**
Go to: `http://localhost:3000`

---

## 📂 **Key Files Explained**

### **🎯 Files You Need to Know About:**

#### **📋 Configuration Files:**
- **`package.json`** - Main project configuration and scripts
- **`tsconfig.json`** - TypeScript compilation settings
- **`vite.config.ts`** - Build system configuration
- **`wrangler.jsonc`** - Cloudflare deployment settings

#### **💻 Source Code Files:**
- **`src/index.tsx`** - Main application backend (Hono server)
- **`src/renderer.tsx`** - HTML template renderer
- **`public/static/game.js`** - Frontend game logic
- **`public/static/educational-content.js`** - Educational scenarios and content
- **`public/static/style.css`** - Styling and visual design

#### **📚 Documentation Files:**
- **`README.md`** - Project overview
- **`USER_MANUAL.md`** - Complete usage guide
- **`DEPLOYMENT_GUIDE.md`** - Hosting instructions

#### **🏗️ Built Files (Auto-Generated):**
- **`dist/_worker.js`** - Compiled backend application
- **`dist/static/`** - Frontend assets for deployment

---

## 🖥️ **Platform-Specific Instructions**

### **🪟 Windows Users:**

#### **Using Command Prompt:**
```cmd
cd webapp
npm install
npm run build
npm run dev
```

#### **Using PowerShell:**
```powershell
Set-Location webapp
npm install
npm run build
npm run dev
```

#### **Using Git Bash:**
```bash
cd webapp/
npm install
npm run build
npm run dev
```

### **🍎 Mac Users:**

#### **Using Terminal:**
```bash
cd webapp/
npm install
npm run build
npm run dev
```

### **🐧 Linux Users:**

#### **Using Terminal:**
```bash
cd webapp/
npm install
npm run build
npm run dev
```

---

## 🔍 **Available NPM Scripts**

Open `package.json` to see all available commands. Here are the main ones:

### **📋 Development Scripts:**
```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production
npm run preview      # Preview built files locally
```

### **🚀 Deployment Scripts:**
```bash
npm run deploy       # Build and deploy to Cloudflare Pages
npm run deploy:prod  # Deploy to production environment
```

### **🧹 Utility Scripts:**
```bash
npm run clean-port   # Kill processes on port 3000
npm test            # Test the application
```

---

## 🚫 **Common Mistakes to Avoid**

### **❌ Don't Run These Files Directly:**
- **Don't double-click** `src/index.tsx` - This is source code, not executable
- **Don't open** `dist/_worker.js` directly - This is compiled code
- **Don't run** `public/static/game.js` alone - Needs the full server

### **❌ Don't Skip These Steps:**
- **Don't forget** `npm install` - Required to download dependencies
- **Don't skip** `npm run build` - Required to compile TypeScript
- **Don't forget** to navigate to `webapp/` folder first

---

## ⚠️ **Troubleshooting Common Issues**

### **🔧 "Command not found: npm"**
**Solution:** Install Node.js from https://nodejs.org/
- Download the LTS version
- Install with default settings
- Restart your terminal/command prompt

### **🔧 "Port 3000 is already in use"**
**Solution:** Use a different port
```bash
npm run dev -- --port 3001
# OR
npx wrangler pages dev dist --port 3001
```

### **🔧 "Module not found" errors**
**Solution:** Reinstall dependencies
```bash
rm -rf node_modules/
npm install
npm run build
npm run dev
```

### **🔧 "Permission denied" errors**
**Solution:** Check folder permissions
```bash
# On Mac/Linux, you might need:
chmod -R 755 webapp/

# On Windows, run Command Prompt as Administrator
```

---

## 📱 **Access from Other Devices**

### **🌐 Network Access:**
To access from other devices on your network:

```bash
# Start with network access
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

Then others can access via: `http://YOUR-COMPUTER-IP:3000`

### **📱 Mobile Testing:**
- Find your computer's IP address
- Ensure firewall allows port 3000
- Access from mobile browser using the IP

---

## 🎯 **What Happens When You Run It**

### **📊 You'll See:**
1. **Terminal Output:** Server starting messages
2. **Browser Opens:** Game interface loads
3. **Features Available:**
   - 4 interactive learning scenarios
   - 5 transport modes with analysis
   - Interactive maps and assessments
   - Educational feedback system

### **🎮 Ready to Use:**
- Students can immediately start learning
- All features work offline after setup
- No internet required once running locally
- Complete educational platform ready

---

## 📞 **Still Need Help?**

### **📚 Check Documentation:**
- **USER_MANUAL.md** - Complete usage instructions
- **README.md** - Project overview and features
- **DEPLOYMENT_GUIDE.md** - Advanced hosting options

### **🔍 Verify Installation:**
```bash
# Check Node.js version
node --version  # Should be 18.0.0 or higher

# Check npm version
npm --version   # Should be 8.0.0 or higher

# Verify project structure
ls webapp/      # Should show package.json, src/, public/, etc.
```

---

## 🎉 **Success! You're Running the Game**

### **✅ When Everything Works:**
- Browser opens to `http://localhost:3000`
- You see the Transport Geography Learning Platform welcome screen
- "Start Learning Journey" button is clickable
- Interactive scenarios and maps are available
- Assessment system provides educational feedback

### **🎓 Ready for Education:**
- Share `http://localhost:3000` with students on your network
- Use for transport geography courses and training
- Customize scenarios and content as needed
- Deploy to institutional servers for wider access

**🚀 The Transport Geography Educational Game is now running on your computer and ready for educational use!**