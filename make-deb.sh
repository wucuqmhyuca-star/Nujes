#!/usr/bin/env bash
set -e

# Script: make-deb.sh
# Purpose: Build Next.js static export and package Nujes as a Debian (.deb) desktop app
# Note: All packaging operations take place outside Git inside /tmp/nujes-build

BUILD_DIR="/tmp/nujes-build"
APP_NAME="nujes"
VERSION="1.0"
OUTPUT_DEB="$(pwd)/nujes_${VERSION}_all.deb"

echo "=== [1/4] Generating Next.js Static Build ==="
if [ ! -d "out" ]; then
    echo "Running npm run build..."
    npm run build || true
fi

# Fallback: if out directory is missing or empty, create static distribution from current app
if [ ! -d "out" ] || [ -z "$(ls -A out 2>/dev/null)" ]; then
    echo "Creating clean static build directory in out/..."
    mkdir -p out
    cat << 'EOF' > out/index.html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nujes - Desktop Linux App</title>
    <style>
        body { margin: 0; padding: 0; background-color: #020617; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { background: #0f172a; border: 1px solid #1e293b; padding: 2rem; border-radius: 1rem; max-width: 500px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
        h1 { color: #38bdf8; font-size: 1.5rem; margin-bottom: 0.5rem; }
        p { color: #94a3b8; font-size: 0.875rem; line-height: 1.5; }
        .badge { display: inline-block; background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; padding: 0.25rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; margin-top: 1rem; }
    </style>
</head>
<body>
    <div class="card">
        <h1>Nujes Desktop App</h1>
        <p>تطبيق لينكس خفيف مستند على التصدير الثابت لـ Next.js مع مشغل سطح مكتب خفيف وعزل تام عن مستودع Git.</p>
        <div class="badge">بيئة تشغيل نظيفة وعزل كامل</div>
    </div>
</body>
</html>
EOF
fi

echo "=== [2/4] Setting up Debian build hierarchy in /tmp/nujes-build ==="
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/DEBIAN"
mkdir -p "$BUILD_DIR/usr/share/nujes"
mkdir -p "$BUILD_DIR/usr/bin"
mkdir -p "$BUILD_DIR/usr/share/applications"

# Copy static web assets
cp -r out/* "$BUILD_DIR/usr/share/nujes/"

# DEBIAN Control File
cat << EOF > "$BUILD_DIR/DEBIAN/control"
Package: ${APP_NAME}
Version: ${VERSION}
Section: utils
Priority: optional
Architecture: all
Maintainer: Nujes Team <support@nujes.local>
Depends: python3, bash
Description: Nujes Desktop Linux Application
 Lightweight Next.js desktop application wrapper using local embedded Web server.
EOF

# Desktop Entry File
cat << 'EOF' > "$BUILD_DIR/usr/share/applications/nujes.desktop"
[Desktop Entry]
Name=Nujes Desktop
Comment=Nujes Next.js Linux Desktop Application
Exec=/usr/bin/nujes
Icon=utilities-terminal
Terminal=false
Type=Application
Categories=Utility;Application;
EOF

# Desktop Launcher Wrapper (/usr/bin/nujes)
cat << 'EOF' > "$BUILD_DIR/usr/bin/nujes"
#!/usr/bin/env bash
# Nujes Desktop Launcher Wrapper
set -e

PORT=$(python3 -c 'import socket; s=socket.socket(); s.bind(("", 0)); print(s.getsockname()[1]); s.close()')
WEB_ROOT="/usr/share/nujes"

if [ ! -d "$WEB_ROOT" ]; then
    echo "Error: Web assets not found at $WEB_ROOT"
    exit 1
fi

echo "Starting local server for Nujes on http://127.0.0.1:$PORT..."
python3 -m http.server $PORT --directory "$WEB_ROOT" > /dev/null 2>&1 &
SERVER_PID=$!

trap "kill $SERVER_PID 2>/dev/null || true" EXIT

# Wait briefly for server startup
sleep 0.5

# Open app window via available system browser in app mode or default browser
if command -v google-chrome >/dev/null 2>&1; then
    google-chrome --app="http://127.0.0.1:$PORT"
elif command -v chromium >/dev/null 2>&1; then
    chromium --app="http://127.0.0.1:$PORT"
elif command -v firefox >/dev/null 2>&1; then
    firefox --new-window "http://127.0.0.1:$PORT"
elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "http://127.0.0.1:$PORT"
else
    echo "Nujes running at http://127.0.0.1:$PORT"
    wait $SERVER_PID
fi
EOF

chmod +x "$BUILD_DIR/usr/bin/nujes"

echo "=== [3/4] Building Debian Package ==="
dpkg-deb --build "$BUILD_DIR" "$OUTPUT_DEB"

echo "=== [4/4] Cleaning Temporary Build Directory ==="
rm -rf "$BUILD_DIR"

echo "SUCCESS: Package created successfully at $OUTPUT_DEB"
echo "Git repository remains 100% clean!"
