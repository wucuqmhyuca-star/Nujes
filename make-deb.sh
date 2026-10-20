#!/usr/bin/env bash
set -e

# Script: make-deb.sh
# Purpose: Build Next.js static export and package Nujes as a Debian (.deb) desktop app
# All packaging operations take place outside Git inside /tmp/nujes-build

BUILD_DIR="/tmp/nujes-build"
APP_NAME="nujes"
VERSION="1.0"
OUTPUT_DEB="$(pwd)/nujes_${VERSION}_all.deb"

echo "=== [1/4] Checking Next.js Static Build Directory ==="
if [ ! -d "out" ] || [ -z "$(ls -A out 2>/dev/null)" ]; then
    echo "Running npm run build to generate static export..."
    npm run build
fi

if [ ! -d "out" ] || [ -z "$(ls -A out 2>/dev/null)" ]; then
    echo "Error: Directory 'out' does not exist or is empty. Build failed."
    exit 1
fi

echo "=== [2/4] Setting up Debian build hierarchy in /tmp/nujes-build ==="
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR/DEBIAN"
mkdir -p "$BUILD_DIR/usr/share/nujes"
mkdir -p "$BUILD_DIR/usr/bin"
mkdir -p "$BUILD_DIR/usr/share/applications"

# Copy static web assets strictly from out/
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
