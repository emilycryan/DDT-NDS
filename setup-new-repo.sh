#!/bin/bash

# Setup script for new DDT copy repository
# This script initializes a new git repo and prepares it for GitHub

echo "🚀 Setting up new repository for DDT copy..."

# Initialize git repository
echo "📦 Initializing git repository..."
git init

# Add all files
echo "📝 Adding all files..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Copy of DDT project for alternative UI design"

# Set default branch to main
git branch -M main

echo ""
echo "✅ Repository initialized successfully!"
echo ""
echo "📋 Next steps to create GitHub repository:"
echo ""
echo "1. Go to https://github.com/new and create a new repository"
echo "   (e.g., name it 'DDT-alt-ui' or 'DDT-v2')"
echo ""
echo "2. After creating the repo, run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git push -u origin main"
echo ""
echo "3. Or if you prefer SSH:"
echo ""
echo "   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git push -u origin main"
echo ""
