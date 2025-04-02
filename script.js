
// Load jsPDF from CDN if not using a bundler
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

// Decode the obfuscated Identity Pool ID
const encodedPoolId = "dXMtZWFzdC0xOjcwYjE1Njc2LTg4OWUtNGRjZC05NDQ1LTQ0MmQyM2VkMWE3YQ=="; // base64 of "us-east-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
const decodedPoolId = atob(encodedPoolId);

// Configure AWS
AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: decodedPoolId
  })
});

// Create S3 instance
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('service-form');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
      fullName: form.fullName.value,
      phone: form.phone.value,
      address: form.address.value,
      description: form.description.value,
      timestamp: new Date().toISOString()
    };

    // Generate PDF with jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Ace's Inquisitive Inquiries - Service Request", 10, 10);
    doc.text(`Name: ${data.fullName}`, 10, 20);
    doc.text(`Phone: ${data.phone}`, 10, 30);
    doc.text(`Address: ${data.address}`, 10, 40);
    doc.text(`Description: ${data.description}`, 10, 50);
    doc.text(`Submitted At: ${data.timestamp}`, 10, 60);

    const pdfBlob = doc.output("blob");
    const filename = `form-submissions/${Date.now()}-${data.fullName.replace(/\s+/g, '-')}.pdf`;

    s3.upload({
      Bucket: 'hwmnbn.me', // Replace with your bucket
      Key: filename,
      Body: pdfBlob,
      ContentType: 'application/pdf'
    }, function (err, result) {
      if (err) {
        alert('Upload failed: ' + err.message);
        console.error('Upload error:', err);
      } else {
        alert('PDF submitted and uploaded successfully!');
        form.reset();
      }
    });
  });
});
