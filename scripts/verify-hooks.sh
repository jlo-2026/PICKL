#!/bin/sh

# Git Hooks Verification Script
# Verifies that Husky git hooks are properly installed and configured

echo "🔍 Verifying Git Hooks Installation..."
echo ""

# Initialize error counter
errors=0

# Check if .husky directory exists
if [ ! -d ".husky" ]; then
  echo "❌ Error: .husky directory not found"
  echo "   Run 'npm install' to install git hooks"
  errors=$((errors + 1))
else
  echo "✅ .husky directory exists"
fi

# Check if pre-commit hook exists
if [ ! -f ".husky/pre-commit" ]; then
  echo "❌ Error: pre-commit hook not found"
  echo "   Expected file: .husky/pre-commit"
  errors=$((errors + 1))
else
  echo "✅ pre-commit hook exists"
  
  # Verify pre-commit hook has LF line endings
  if grep -q $'\r' .husky/pre-commit 2>/dev/null; then
    echo "❌ Error: pre-commit hook has CRLF line endings (should be LF)"
    echo "   Run 'npm run format' to fix line endings"
    errors=$((errors + 1))
  fi
  
  # Verify pre-commit hook content
  if ! grep -q "Direct commits to.*branch are not allowed" .husky/pre-commit; then
    echo "⚠️  Warning: pre-commit hook may be missing branch protection"
  fi
  
  if ! grep -q "lint-staged" .husky/pre-commit; then
    echo "⚠️  Warning: pre-commit hook may be missing lint-staged execution"
  fi
fi

# Check if commit-msg hook exists
if [ ! -f ".husky/commit-msg" ]; then
  echo "❌ Error: commit-msg hook not found"
  echo "   Expected file: .husky/commit-msg"
  errors=$((errors + 1))
else
  echo "✅ commit-msg hook exists"
  
  # Verify commit-msg hook has LF line endings
  if grep -q $'\r' .husky/commit-msg 2>/dev/null; then
    echo "❌ Error: commit-msg hook has CRLF line endings (should be LF)"
    echo "   Run 'npm run format' to fix line endings"
    errors=$((errors + 1))
  fi
  
  # Verify commit-msg hook content
  if ! grep -q "conventional" .husky/commit-msg; then
    echo "⚠️  Warning: commit-msg hook may be missing conventional commits validation"
  fi
fi

# Check if lint-staged is configured
if ! grep -q "lint-staged" package.json; then
  echo "❌ Error: lint-staged configuration not found in package.json"
  errors=$((errors + 1))
else
  echo "✅ lint-staged configuration found in package.json"
fi

# Check if Husky is installed
if ! command -v husky >/dev/null 2>&1 || ! npx husky --version >/dev/null 2>&1; then
  echo "⚠️  Warning: Husky may not be installed properly"
  echo "   Run 'npm install' to ensure Husky is installed"
fi

echo ""
if [ $errors -eq 0 ]; then
  echo "🎉 All git hooks are properly installed and configured!"
  echo ""
  echo "📚 Hook Summary:"
  echo "   • pre-commit: Prevents commits to main/master, runs lint-staged"
  echo "   • commit-msg: Enforces Conventional Commits format"
  echo ""
  exit 0
else
  echo "❌ Found $errors error(s) in git hooks configuration"
  echo ""
  echo "🔧 To fix, run:"
  echo "   npm install"
  echo ""
  exit 1
fi
