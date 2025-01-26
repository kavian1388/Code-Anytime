document.getElementById('uploadForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('file');
    const progressBar = document.getElementById('progressBar');
    const progress = document.getElementById('progress');
    const message = document.getElementById('message');
    
    if (!fileInput.files.length) {
      alert('Please select a file!');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    
    progressBar.style.display = 'block';
    progress.style.width = '0%';
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/convert', true);
    
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        progress.style.width = percentComplete + '%';
      }
    };
    
    xhr.onload = function () {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        message.innerHTML = `<strong>${response.message}</strong> <a href="${response.output_file}" download>Download Word File</a>`;
        progress.style.width = '100%';
      } else {
        message.innerHTML = '<strong>Error converting file. Please try again.</strong>';
      }
    };
    
    xhr.send(formData);
  });