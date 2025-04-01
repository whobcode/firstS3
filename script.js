// AWS SDK Config
AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' // Replace with your actual IdentityPoolId
    })
  });
  
  // Create S3 instance
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
  
  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('service-form');
    if (!form) return;
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const data = {
        fullName: form.fullName.value,
        phone: form.phone.value,
        address: form.address.value,
        description: form.description.value,
        timestamp: new Date().toISOString()
      };
  
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const fileName = `form-submissions/${Date.now()}-${data.fullName.replace(/\s+/g, '-')}.json`;
  
      s3.upload({
        Bucket: 'your-bucket-name', // Replace with your S3 bucket
        Key: fileName,
        Body: blob,
        ContentType: 'application/json'
      }, function (err, result) {
        if (err) {
          alert('Upload failed: ' + err.message);
          console.error('Upload error:', err);
        } else {
          alert('Submitted successfully!');
          form.reset();
        }
      });
    });
  });
  