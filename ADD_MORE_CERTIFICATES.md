# How to Add More Certificates to Gallery

This guide shows you how to easily add more certifications to your certificates gallery page.

---

## **Quick Steps**

### Step 1: Add Certificate Image to Assets
1. Save your certificate image to `/assets/` folder
2. Name it clearly: `certificate-name.png` or `.jpg`
3. For PDFs, use `.pdf` extension

### Step 2: Copy Template to certificates.html
1. Open `certificates.html` in a text editor
2. Find the section `<!-- 7. ADDITIONAL CERTIFICATES (Template - Add more here) -->`
3. Copy the template block below

### Step 3: Customize with Your Details
Replace the placeholder text with your certificate info

### Step 4: Save and Push to GitHub
Commit and push the changes

---

## **Certificate Template**

Copy and paste this template into `certificates.html`:

```html
<div class="cert-item">
  <img src="assets/certificate-name.png" alt="Certificate Name" class="cert-image">
  <div class="cert-info">
    <h3>Certificate Name</h3>
    <p class="issuer">Issuing Organization</p>
    <p class="date">Month Year</p>
    <p>Brief description of the certification</p>
    <div class="cert-links">
      <a href="https://verification-link.com" target="_blank" class="cert-btn">View Certificate</a>
    </div>
  </div>
</div>
```

---

## **Examples**

### Example 1: Certification with External Link
```html
<div class="cert-item">
  <img src="assets/kubernetes-cert.png" alt="Kubernetes Certificate" class="cert-image">
  <div class="cert-info">
    <h3>Kubernetes Administrator (CKA)</h3>
    <p class="issuer">Linux Foundation</p>
    <p class="date">January 2025</p>
    <p>Certified Kubernetes Administrator certification</p>
    <div class="cert-links">
      <a href="https://www.credly.com/badges/your-cka-badge" target="_blank" class="cert-btn">View on Credly</a>
    </div>
  </div>
</div>
```

### Example 2: Multiple Links
```html
<div class="cert-item">
  <img src="assets/terraform-cert.png" alt="Terraform Certificate" class="cert-image">
  <div class="cert-info">
    <h3>HashiCorp Certified: Terraform Associate</h3>
    <p class="issuer">HashiCorp</p>
    <p class="date">December 2024</p>
    <p>Infrastructure as Code certification for Terraform</p>
    <div class="cert-links">
      <a href="https://www.credly.com/badges/terraform" target="_blank" class="cert-btn">View on Credly</a>
      <a href="assets/terraform-cert.pdf" target="_blank" class="cert-btn secondary">Download PDF</a>
    </div>
  </div>
</div>
```

### Example 3: Without External Link
```html
<div class="cert-item">
  <img src="assets/internal-training.jpg" alt="Internal Training" class="cert-image">
  <div class="cert-info">
    <h3>Internal Training Program</h3>
    <p class="issuer">Company Name</p>
    <p class="date">November 2024</p>
    <p>Completed internal training in DevOps practices</p>
    <div class="cert-links">
      <a href="index.html#certifications" class="cert-btn secondary">View Details</a>
    </div>
  </div>
</div>
```

---

## **Field Explanations**

| Field | Example | Notes |
|-------|---------|-------|
| `src="assets/..."` | `assets/kubernetes.png` | Path to certificate image |
| `alt="..."` | `Kubernetes Certificate` | Description for accessibility |
| `<h3>` | `Kubernetes Administrator` | Certificate name (bold, large) |
| `.issuer` | `Linux Foundation` | Organization that issued it |
| `.date` | `January 2025` | Completion date |
| `<p>` | `Certified Kubernetes...` | Short description |
| `href="..."` | Link URL | Verification or external link |
| `class="cert-btn"` | Primary button | Use for main action |
| `class="cert-btn secondary"` | Secondary button | Use for secondary links |

---

## **Image Specifications**

- **Format:** PNG, JPG, or PDF
- **Recommended Size:** 1600x1200px or similar
- **File Size:** Keep under 500KB
- **Location:** `/assets/` folder
- **Naming:** Use lowercase, hyphens: `certificate-name.png`

---

## **Button Styles**

### Primary Button (Main verification link)
```html
<a href="URL" target="_blank" class="cert-btn">View Certificate</a>
```

### Secondary Button (Additional info)
```html
<a href="URL" class="cert-btn secondary">View Details</a>
```

### Download Button
```html
<a href="assets/file.pdf" target="_blank" class="cert-btn">Download PDF</a>
```

---

## **Where to Add New Certificates**

### Location in File
1. Open `certificates.html`
2. Find: `<!-- 7. ADDITIONAL CERTIFICATES (Template - Add more here) -->`
3. Add new certificate blocks in the section below it
4. Keep the template comment for reference

### Organizing Certificates
Group by category if adding many:
```html
<h3 style="text-align: center; margin: 40px 0 20px; color: var(--accent);">
  Kubernetes & Container Orchestration
</h3>
<div class="cert-items">
  <!-- CKA certificate -->
  <!-- Docker certificate -->
</div>
```

---

## **Step-by-Step: Add Your First Certificate**

### 1. Save Image
- Save certificate image as `my-certificate.png` to `assets/` folder

### 2. Copy Template
Open `certificates.html` and find this section:
```html
<!-- 7. ADDITIONAL CERTIFICATES (Template - Add more here) -->
```

### 3. Add Certificate Block
Right after the template comment, add:
```html
<div class="cert-item">
  <img src="assets/my-certificate.png" alt="My Certificate" class="cert-image">
  <div class="cert-info">
    <h3>My New Certification</h3>
    <p class="issuer">Issuing Organization</p>
    <p class="date">Month Year</p>
    <p>Description of what I learned</p>
    <div class="cert-links">
      <a href="https://verification-url.com" target="_blank" class="cert-btn">View Certificate</a>
    </div>
  </div>
</div>
```

### 4. Commit and Push
```bash
git add assets/my-certificate.png certificates.html
git commit -m "Add new certification to gallery"
git push origin main
```

---

## **Troubleshooting**

### Image not showing?
- Check file path: `assets/filename.png`
- Ensure filename is correct (case-sensitive on Linux)
- Try JPG instead of PNG
- Check file size (under 500KB)

### Link not working?
- Verify URL is complete: `https://...`
- Use `target="_blank"` to open in new tab
- Test URL in browser first

### Styling looks wrong?
- Use exact class names: `cert-btn`, `cert-btn secondary`
- Keep HTML structure intact
- Don't modify CSS unless needed

---

## **Common Additions**

### Future Certifications to Add
```markdown
- AWS Solutions Architect Associate
- Kubernetes Administrator (CKA)
- HashiCorp Certified: Terraform Associate
- Linux Foundation Certified System Administrator (LFCSA)
- AWS DevOps Engineer Professional
- Red Hat Certified Engineer (RHCE)
```

---

## **Tips**

✅ **Do:**
- Use clear, descriptive filenames
- Add certificate right after obtaining it
- Include verification links
- Keep images consistent size
- Use proper date format (Month Year)

❌ **Don't:**
- Use spaces in filenames (use hyphens instead)
- Add very large images (resize to ~1600px width)
- Remove existing certificates
- Modify CSS without backup

---

## **Example: Adding 3 New Certificates**

```html
<div class="cert-item">
  <img src="assets/kubernetes-cka.png" alt="CKA Certificate" class="cert-image">
  <div class="cert-info">
    <h3>Kubernetes Administrator (CKA)</h3>
    <p class="issuer">Linux Foundation</p>
    <p class="date">January 2025</p>
    <p>Certified Kubernetes Administrator for production clusters</p>
    <div class="cert-links">
      <a href="https://www.credly.com/badges/cka" target="_blank" class="cert-btn">Verify on Credly</a>
    </div>
  </div>
</div>

<div class="cert-item">
  <img src="assets/terraform-associate.png" alt="Terraform Certificate" class="cert-image">
  <div class="cert-info">
    <h3>HashiCorp Certified: Terraform Associate</h3>
    <p class="issuer">HashiCorp</p>
    <p class="date">December 2024</p>
    <p>Infrastructure as Code with Terraform</p>
    <div class="cert-links">
      <a href="https://www.credly.com/badges/terraform" target="_blank" class="cert-btn">Verify on Credly</a>
    </div>
  </div>
</div>

<div class="cert-item">
  <img src="assets/aws-solutions-architect.png" alt="AWS Solutions Architect" class="cert-image">
  <div class="cert-info">
    <h3>AWS Solutions Architect Associate</h3>
    <p class="issuer">Amazon Web Services</p>
    <p class="date">November 2024</p>
    <p>Design scalable and secure AWS architectures</p>
    <div class="cert-links">
      <a href="https://www.credly.com/badges/architect" target="_blank" class="cert-btn">Verify on Credly</a>
    </div>
  </div>
</div>
```

---

**Questions?** Check the template in `certificates.html` or refer to existing certificates for reference.
