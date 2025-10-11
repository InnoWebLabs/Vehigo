# Issue: Footer Quick Links Not Redirecting in Help Center Page

## 🐛 Bug Description

The footer quick links in the help center page (`src/pages/help-center.html`) are not properly redirecting to their intended destinations. Users clicking on these links encounter broken navigation, leading to a poor user experience.

## 📍 Location
- **File**: `src/pages/help-center.html`
- **Section**: Footer quick links (Company, Support, Services sections)

## 🔍 Problem Details

### Affected Links:
1. **Company Section**:
   - About Us (`about.html` → should be `../../src/pages/about.html`)
   - Pricing Plans (`pricing.html` → should be `../../src/pages/pricing.html`)
   - Our Blog (correctly linked)
   - Contact Us (correctly linked)

2. **Support Section**:
   - Help Center (correctly linked)
   - Ask a Question (`Askaques.html` → should be `../../src/pages/Askaques.html`)
   - Privacy Policy (correctly linked)
   - Terms & Conditions (correctly linked)

3. **Services Section**:
   - Explore Cars (correctly linked)
   - Rent Your Car (correctly linked)
   - Offline Centers (correctly linked)
   - Login (`login.html` → should be `../../src/pages/login.html`)

4. **Header Navigation**:
   - Logo link (`index.html` → should be `../../index.html`)
   - All navigation menu items have incorrect relative paths

## 🎯 Expected Behavior
All footer quick links should properly redirect users to their respective pages without any broken links.

## 🚫 Current Behavior
Clicking on the affected links results in 404 errors or navigation to non-existent pages due to incorrect relative path references.

## 🔧 Root Cause
The issue is caused by incorrect relative path references. Since the help center page is located in `src/pages/`, the links need to use `../../` to navigate back to the root directory before accessing other pages.

## 📋 Acceptance Criteria
- [ ] All footer quick links redirect to correct pages
- [ ] Header navigation links work properly
- [ ] No broken links in the help center page
- [ ] Consistent navigation experience across the site

## 🏷️ Labels
- `bug`
- `help-wanted`
- `good-first-issue`
- `navigation`
- `footer`

## 📝 Additional Notes
This is a relatively simple fix that involves updating relative path references. Good for new contributors to work on.

---

**Priority**: Medium  
**Difficulty**: Easy  
**Estimated Time**: 15-30 minutes

