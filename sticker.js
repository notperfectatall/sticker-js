const canvas = new fabric.Canvas('stickerCanvas');
const imageUpload = document.getElementById('imageUpload');
const addTextBtn = document.getElementById('addText');
const downloadBtn = document.getElementById('download');

// Load image on upload
imageUpload.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(f) {
        fabric.Image.fromURL(f.target.result, function(img) {
            canvas.add(img);
            canvas.renderAll();
        });
    };
    reader.readAsDataURL(file);
});

// Add text
addTextBtn.addEventListener('click', function() {
    const text = new fabric.IText('Funny Text Here!', {
        left: 100,
        top: 100,
        fontSize: 24,
        fill: '#ff6b6b',
        fontFamily: 'Comic Sans MS'
    });
    canvas.add(text);
});

// Download as PNG
downloadBtn.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'funny-sticker.png';
    link.href = canvas.toDataURL();
    link.click();
});
